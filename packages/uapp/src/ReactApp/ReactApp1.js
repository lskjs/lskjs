import React from 'react';
import ReactDOM from 'react-dom';
import initReactFastClick from 'react-fastclick';
import qs from 'qs';
import { createPath } from 'history/PathUtils';
import autobind from '@lskjs/autobind';
import merge from 'lodash/merge';
import createBrowserHistory from 'history/createBrowserHistory';
import { Redbox, deepForceUpdate } from './core/devUtils';

const DEBUG = __DEV__ && false;


export default class ReactApp extends Core {
  name = 'App';

  @autobind
  historyListen(location, action) {
    DEBUG && console.log('App.historyListen', location, action);
    if (location.method === 'replaceState') return;
    this.render();
  }

  async init() {
    this.container = document.getElementById('root');
    this.history = createBrowserHistory({
      getUserConfirmation: (...args) => this.historyConfirm(...args),
    });
  }

  run() {
    this.history.listen(this.historyListen);
    this.render();
  }


  redirect(path) {
    DEBUG && console.log('ReactApp.redirect', path);
    setTimeout(() => {
      this.history.replace(path);
    }, DEBUG ? 1000 : 0);
  }

  @autobind
  async render() {
    const req = this.getReq();
    if (this.uapp && this.uapp.page && this.uapp.page.exit) {
      await this.uapp.page.exit();
    }
    let page;
    try {
      page = await this.getPage(req);
    } catch (err) {
      this.log.error('CSR getPage err (ROUTER ERROR)', err);
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error('CSR getPage err (ROUTER ERROR)');
      } catch (x) {}
      this.renderError(err);
      throw err;
    }

    if (page.state.redirect) {
      this.redirect(page.state.redirect);
      return;
    }

    try {
      const root = page.renderRoot();
      this.appInstance = ReactDOM.render(root, this.container, this.postRender);
    } catch (err) {
      this.log.error('CSR renderRoot err (REACT RENDER ERROR)', err);
      this.renderError(err);
    }
  }

  renderError(error = {}) {
    document.title = `Error: ${error.message}`;
    const root = React.createElement(Redbox, { error, editorScheme: 'vscode' });
    this.appInstance = ReactDOM.render(root, this.container, this.postRender);
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
    if (!DEBUG && window.ga) {
      window.ga('send', 'pageview', createPath(window.location));
    }
    this.rootState.renderCount = (this.rootState.renderCount || 0) + 1;
  }

}
