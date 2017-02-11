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
    return {
      token: req.token,
      user: req.user,
    };
  }

  Provider = Provider
  createProvider(rootState, req) {
    return new this.Provider(rootState, req, this.config);
    // return new this.Provider(rootState, req)
  }

  getReqCtx(req) {
    const rootState = this.getReqRootState(req);
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
    };
  }

  async getHtmlProps(req) {
    const reqProps = await this.getReqProps(req);
    const route = await UniversalRouter.resolve(this.getUniversalRoutes(), reqProps);
    return {
      ...reqProps,
      ...route,
      route,
      children: route.component,
    };
  }
}
