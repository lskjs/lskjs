import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import qs from 'qs';
import { createPath } from 'history/PathUtils';
import history from './core/history';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import { autobind } from 'core-decorators';
import Uapp from '../Uapp';
import _ from 'lodash';
import Core from '../Core';

const DEBUG = false;


export default class ReactApp extends Core {

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  init() {
    this.rootState = this.getRootState();
    this.config = _.merge({}, this.config || {}, this.rootState && this.rootState.config || {});
    this.rootState.config = null;
    FastClick.attach(document.body);
    this.container = document.getElementById('root');
    this.hmrInit();
  }

  run() {
    history.listen(this.onLocationChange);
    this.onLocationChange(this.currentLocation);
  }


  @autobind
  async onLocationChange(location) {
    const req = this.getReq();

    let page;
    try {
      page = await this.getPage(req);
    } catch (err) {
      this.log.error('CSR getPage err', err);
      throw err;
    }

    if (page.state.redirect) {
      history.replace(page.state.redirect);
    }

    try {
      this.appInstance = ReactDOM.render(page.renderRoot(), this.container, this.postRender);
    } catch (err) {
      this.log.error('CSR renderRoot err', err);
      // Display the error in full-screen for development mode
      // if (__DEV__) {
      //   this.appInstance = null;
      //   document.title = `Error: ${error.message}`;
      //   ReactDOM.render(<ErrorReporter error={error} />, this.container);
      //   return;
      // }
      throw err;
      // Avoid broken navigation in production mode by a full page reload on error
      // window.location.reload();
    }
  }

  getReq() {
    return {
      hostname: window.location.hostname,
      path: window.location.pathname,
      query: qs.parse(window.location.search),
    };
  }

  BaseUapp = Uapp;
  async getUapp(req) {
    if (this.uapp) return this.uapp;
    this.uapp = new (this.Uapp || this.BaseUapp)({
      history,
      styles: [],
      insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
      },
      req,
      rootState: this.rootState,
      config: this.config,
      app: this,
    });
    await this.uapp.start();
    return this.uapp;
  }


  async getPage(req) {
    const uapp = await this.getUapp(req);
    return uapp.resolve({
      path: req.path,
      query: req.query,
    });
  }


  @autobind
  postRender() {
    if (!this.rootState.renderCount) {
      const elem = document.getElementById('css');
      if (elem) elem.parentNode.removeChild(elem);
      return;
    }
    if (!__DEV__ && window.ga) {
      window.ga('send', 'pageview', createPath(window.location));
    }
    this.rootState.renderCount = (this.rootState.renderCount || 0) + 1;
  }

  hmrInit() {
  }

  hmrUpdate() {
    if (this.appInstance) {
      try {
        deepForceUpdate(this.appInstance);
      } catch (err) {
        this.log.error('hmrUpdate deepForceUpdate err', err);
        // this.appInstance = null;
        // document.title = `Hot Update Error: ${error.message}`;
        // ReactDOM.render(<ErrorReporter error={error} />, this.container);
      }
    }
    // this.onLocationChange(this.currentLocation); // @TODO: REMOVE??
  }

}
