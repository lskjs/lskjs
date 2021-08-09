/* global window */
import Module from '@lskjs/module';
import collectWindowReq from '@lskjs/utils/collectWindowReq';
import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';

const DEBUG = __DEV__; // __STAGE__ === 'isuvorov'

export default class ReactAppClient extends Module {
  ReactDOM = ReactDOM;

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  async init() {
    await super.init();
    if (!this.container) this.container = window.document.getElementById('root');
    this.history = createBrowserHistory({
      // getUserConfirmation: (message, callback) => {
      //   if (!(this.uapp && this.uapp.historyConfirm)) {
      //     callback(true);
      //     return;
      //   }
      //   this.uapp.historyConfirm(message, callback);
      // },
    });
  }

  async run() {
    await super.run();
    this.uapp = await this.module('uapp');
    this.history.listen((location) => {
      if (location.method === 'replaceState') return;
      this.render();
    });
    this.render();
  }

  async getModuleConfig(name) {
    const config = await super.getModuleConfig(name);
    if (name === 'uapp')
      return {
        ...this.config,
        ...config,
      };
    return config;
  }

  async getModuleProps(name) {
    if (name === 'uapp') {
      return {
        ...(await super.getModuleProps(name)),
        rootState: this.getRootState(),
        history: this.history,
        req: collectWindowReq(),
      };
    }
    return super.getModuleProps(name);
  }

  getModules() {
    return {
      ...super.getModules(),
      uapp: () => import('@lskjs/uapp'),
    };
  }

  /**
   * Редирект без сохранения в history
   * @param {String} path Новый url для редиректа
   */
  async redirect(path, saveInHistory = false) {
    this.log.debug('redirect', path);
    if (DEBUG) {
      this.log.debug('[delay]', 1000);
      await Bluebird.delay(1000);
    }
    if (saveInHistory) {
      this.history.push(path);
    } else {
      this.history.replace(path);
    }
  }

  // @autobind
  async render() {
    const req = collectWindowReq();
    let page;
    try {
      const a = await this.resolve(req);
      ({ page } = a);
    } catch (err) {
      this.log.trace('err @!#!@#!@# ', err);
      if (Err.getCode(err) === 'page.cancel') {
        this.log.warn('!!!!!!!!!!!!!!! CSR.canceled !!!!!!!!!!!!!');
        return;
      }
      this.log.error('resolve err (ROUTER ERROR)', err);
      // try {
      //   // --- Welcome to debugging React ---
      //   // This error was thrown as a convenience so that you can use this stack
      //   // to find the callsite that caused this warning to fire.
      //   throw new Error('resolve err (ROUTER ERROR)');
      // } catch (x) {
      //   //
      // }
      throw err;
    }

    if (!page) {
      this.log.error('!page');
      throw new Err('!page');
    }

    if (page && page.state && page.state.redirect) {
      this.redirect(...page.state.redirect);
      return;
    }

    if (!this.container) {
      this.log.error('!container');
      throw new Err('!container');
    }
    const component = page.render();
    if (!component) {
      this.log.error('!component');
      throw new Err('!component');
    }
    // Check if the root node has any children to detect if the app has been prerendered
    if (this.container.hasChildNodes()) {
      this.ReactDOM.hydrate(component, this.container);
    } else {
      this.ReactDOM.render(component, this.container);
    }
  }

  async resolve(req) {
    if (this.reqPromise) {
      if (this.reqPromise.cancel) {
        this.reqPromise.cancel();
      } else {
        this.log.warn('!this.reqPromise.cancel');
      }
    }
    const reqPromise = this.uapp.resolve({
      path: req.path || req.pathname,
      query: req.query,
    });
    this.reqPromise = reqPromise;
    const res = await reqPromise;
    if (reqPromise.isCancelled && reqPromise.isCancelled()) {
      this.log.warn('CANCEL CANCEL CANCEL');
      throw new Err('page.cancel');
    }

    this.reqPromise = null;
    return res;
  }
}
