import { createMemoryHistory } from 'history';
import CoreApp from 'lego-starter-kit/CoreApp';
import routes from './routes';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Uapp from '../Uapp';

import assets from './assets'; // eslint-disable-line


export default class ReactApp extends CoreApp {

  getRootState(req) {
    const config = this.config.remoteConfig && this.config.client || {};
    return {
      reqId: req.reqId,
      token: req.token,
      user: req.user,
      config,
    };
  }

  BaseUapp = Uapp
  async getUapp(req) {
    const Uapp2 = this.Uapp || this.BaseUapp;
    const uapp = new Uapp2({
      assets: assets.main,
      history: createMemoryHistory({
        initialEntries: [req.url],
      }),
      styles: [],
      insertCss: (...styles) => {
        styles.forEach(style => uapp.styles.push(style._getCss()));
      },
      req,
      rootState: this.getRootState(req),
      config: this.config.client,
      app: this,
    });
    try {
      await uapp.start();
    } catch(err)  {
      this.log.error('uapp.start()', err)
      throw err;
    }
    return uapp;
  }

  async getPage(req) {
    const uapp = await this.getUapp(req);
    return uapp.resolve({
      path: req.path,
      query: req.query,
    });
  }

  useDefaultRoute() {
    this.app.get('*', async (req, res, next) => {
      let page;
      try {
        page = await this.getPage(req);
      } catch (err) {
        this.log.error('SSR app.getPage(req) err', err)
        return next(err);
      }
      if (page.state.redirect) {
        return res.redirect(page.state.redirect);
      }

      let content;
      try {
        content = page.renderHtml();
      } catch (err) {
        this.log.error('SSR page.renderHtml() err', err)
        return next(err);
      }

      res
        .status(page.state.status || 200)
        .send(content || '');
    });
  }

}
