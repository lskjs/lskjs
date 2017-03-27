// import ssr from './ssr'
import UniversalRouter from 'universal-router';
import { createMemoryHistory } from 'history';
import CoreApp from 'lego-starter-kit/CoreApp';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import routes from './routes';
import React, { Component, PropTypes } from 'react';
import Html from './Html';
import _ from 'lodash';
import Provider from './Provider';

export default class ReactApp extends CoreApp {

  getAssets() {
    return assets.main;
  }

  static Html = Html
  useDefaultRoute() {
    this.app.get('*', async (req, res, next) => {
      try {
        const htmlProps = await this.getHtmlProps(req);
        // console.log(htmlProps);
        if (htmlProps.redirect) {
          return res.redirect(htmlProps.redirect);
        }
        res
          .status(htmlProps.status)
          .send(new this.constructor.Html(htmlProps).render());
      } catch (err) {
        console.log('err', err);
        next(err);
      }
    });
  }

  getUniversalRoutes() {
    return routes;
  }

  // Synonims

  getReqRootState(req) {
    // console.log('req.user, req.token', req.user, req.token, req.cookies);
    // console.log('___');
    const config = this.config.client;
    return {
      token: req.token,
      user: req.user,
      config,
    };
  }

  Provider = Provider
  createProvider(rootState, req) {
    const params = {
      rootState,
      req,
      config: this.config,
      app: this,
    }
    if (this.Provider.v === 2) {
      return new this.Provider(params);
    }
    return new this.Provider(params.rootState, params.req, params.config);
    // return new this.Provider(rootState, req)
  }

  getReqCtx(req) {
    const rootState = this.getReqRootState(req);
    // console.log('getReqRootState', rootState );
    if (req.provider == null) {
      req.provider = this.createProvider(rootState, req);
    }
    const ctx = {
      req,
      config: this.config.client,
      rootState,
      provider: req.provider,
      history: createMemoryHistory({
        initialEntries: [req.url],
      }),
      style: [],
      insertCss: (...styles) => {
        // console.log(ctx.style);
        // console.log('styles', styles);
        styles.forEach(style => ctx.style.push(style._getCss()));
      },
    };
    return ctx;
  }

  // ureq, ures
  getReqProps(req) {
    const reqCtx = this.getReqCtx(req);
    return {
      path: req.path,
      query: req.query,
      app: this,
      ctx: reqCtx,
      appStore: reqCtx && reqCtx.provider,
      assets: this.getAssets(),
      status: 200,
      ...require('./getReqPropsMigrationV2').default(this, { reqCtx, req, app: this }),
    };
  }

  async getHtmlProps(req) {
    const reqProps = await this.getReqProps(req);
    let route = await UniversalRouter.resolve(this.getUniversalRoutes(), reqProps);
    if (route._page) {
      route = route.getState();
    }
    return {
      ...reqProps,
      ...route,
      route,
      children: route.component,
    };
  }
}
