import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import qs from 'qs';
import { createPath } from 'history/PathUtils';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import { autobind } from 'core-decorators';
import Uapp from '../Uapp';
import merge from 'lodash/merge';
import get from 'lodash/get';
import Core from '../Core';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

const DEBUG = __DEV__ && false;


export default class ReactApp extends Core {

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  historyConfirm(message, callback) { // eslint-disable-line
    DEBUG && console.log('historyConfirm 1', message);
    return callback(window.confirm(message));
  }

  async init() {
    this.rootState = this.getRootState();
    this.config = merge({}, this.config || {}, this.rootState && this.rootState.config || {});
    this.rootState.config = null; // не понмю для чего
    FastClick.attach(document.body);
    this.container = document.getElementById('root');
    this.hmrInit();
    this.history = createBrowserHistory({
      getUserConfirmation: (...args) => this.historyConfirm(...args),
    });
  }

  run() {
    this.history.listen(this.onLocationChange);
    this.onLocationChange(this.currentLocation);
  }


  @autobind
  async onLocationChange(location, action) {
    const req = this.getReq();
    DEBUG && console.log('onLocationChange 1', location, req);
    // if (location && location.hash) {
    //   DEBUG && console.log('!@#!@#!@#');
    //   return;
    // }
    // console.log({
    //   location,
    //   req,
    //   'this.history.location': this.history.location,
    // });
    // if (
    //   location &&
    //   (location.pathname || '') === (req.pathname || '') &&
    //   (location.search || '') === (req.search || '')
    // ) {
    //   DEBUG && console.log('DONT NEED RELOCATION');
    //   return ;
    // }
    // const replace = get(this.history, 'state.state.replace');
    // const replace = get(this.history, 'location.method');
    const method = get(this.history, 'location.method');
    // console.log({method}, this.history[method], history[method]);
    // console.log({
    //   location,
    //   history: this.history,
    //   // method
    // });
    // action && action !== 'POP' &&
    if (method && typeof history !== undefined && history[method]) {
      // console.log('replaceState');
      // console.log('method', method);
      // history.pushState(null, '', location.search);
      // history.replaceState(null, '', location.search);
      history[method](null, '', location.search);
      return;
    }
    // if (
    //   location &&
    //   (location.pathname || '') === (req.pathname || '') &&
    //   (location.search || '') === (req.search || '')
    // ) {
    //   DEBUG && console.log('DONT NEED RELOCATION');
    //   return ;
    // }
    let page;
    try {
      page = await this.getPage(req);
    } catch (err) {
      this.log.error('CSR getPage err (ROUTER ERROR)', err);
      throw err;
    }

    if (page.state.redirect) {
      this.history.replace(page.state.redirect);
      return ;
    }

    try {
      const root = page.renderRoot();
      if (module.hot) {
        this.appInstance = ReactDOM.render(React.createElement(AppContainer, {key: Math.random(), warnings: false, children: root}), this.container, this.postRender);
      } else {
        this.appInstance = ReactDOM.render(root, this.container, this.postRender);
      }
    } catch (err) {
      this.log.error('CSR renderRoot err (REACT RENDER ERROR)', err);
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
      search: window.location.search,
      query: qs.parse(window.location.search.substr(1)),
    };
  }

  BaseUapp = Uapp;
  async getUapp(req) {
    if (this.uapp) return this.uapp;
    this.uapp = new (this.Uapp || this.BaseUapp)({
      history: this.history,
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
    await uapp.resolve({
      path: req.path,
      query: req.query,
    });
    return uapp.page;
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
