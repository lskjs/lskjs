import Promise from 'bluebird';
import ReactDOM from 'react-dom';
import autobind from '@lskjs/utils/autobind';
import assignProps from '@lskjs/utils/assignProps';
import collectWindowReq from '@lskjs/utils/collectWindowReq';
import { createBrowserHistory } from 'history';
import Module from '@lskjs/module';
// import BaseUapp from '@lskjs/uapp';
// import { Redbox } from './core/devUtils';
// import { AppContainer } from 'react-hot-loader';

Promise.config({ cancellation: true });

const DEBUG = __DEV__ && false;

export default class ReactAppClient extends Module {
  // BaseUapp = BaseUapp;
  ReactDOM = ReactDOM;
  name = 'ReactAppClient';

  constructor(props) {
    // СМИРИТЕСЬ: Эта копипаста нужна, чтобы менять параметры сверху.
    super(props);
    assignProps(this, props);
  }

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  async init() {
    if (!this.container) this.container = document.getElementById('root');
    this.history = createBrowserHistory({
      getUserConfirmation: (message, callback) => {
        if (!(this.uapp && this.uapp.historyConfirm)) {
          callback(true);
          return;
        }
        this.uapp.historyConfirm(message, callback);
      },
    });
  }

  run() {
    this.history.listen(location => {
      if (location.method === 'replaceState') return;
      this.render();
    });
    this.render();
  }

  /**
   * Редирект без сохранения в history
   * @param {String} path Новый url для редиректа
   */
  redirect(path, saveInHistory = false) {
    if (DEBUG) console.log('ReactApp.redirect', path); // eslint-disable-line no-console
    setTimeout(
      () => {
        if (saveInHistory) {
          this.history.push(path);
        } else {
          this.history.replace(path);
        }
      },
      DEBUG ? 1000 : 0,
    );
  }

  // @autobind
  async render() {
    if (this.uapp && this.uapp.page && this.uapp.page.exit) {
      await this.uapp.page.exit();
    }
    const req = collectWindowReq();
    let page;
    try {
      page = await this.resolve(req);
    } catch (err) {
      if (__STAGE__ === 'isuvorov') console.log('err @!#!@#!@# ', err);
      if ((err && err.type === 'cancel') || (err && err.code === 'page.cancel') || err === 'page.cancel') {
        if (__DEV__) console.warn('!!!!!!!!!!!!!!! CSR.canceled !!!!!!!!!!!!!'); // eslint-disable-line no-console
        return;
      }
      this.log.error('ReactAppClient.resolve err (ROUTER ERROR)', err);
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error('ReactAppClient.resolve err (ROUTER ERROR)');
      } catch (x) {
        //
      }
      throw err;
    }

    if (page.state.redirect) {
      this.redirect(...page.state.redirect);
      return;
    }

    if (!this.container) {
      this.log.error('!ReactAppClient.container');
    }
    const component = page.render();
    // Check if the root node has any children to detect if the app has been prerendered
    if (this.container.hasChildNodes()) {
      this.ReactDOM.hydrate(component, this.container);
    } else {
      this.ReactDOM.render(component, this.container);
    }
  }

  async getUapp(params = {}) {
    if (this.uapp) return this.uapp;
    const { Uapp } = this;
    this.uapp = new Uapp({
      app: this,
      rootState: this.getRootState(),
      config: this.config,
      history: this.history,
      req: collectWindowReq(),
      ...params,
    });
    await this.uapp.start();
    return this.uapp;
  }

  async resolve(req) {
    const uapp = await this.getUapp({ req });
    if (this.reqPromise) {
      if (this.reqPromise.cancel) {
        this.reqPromise.cancel();
      } else {
        // eslint-disable-next-line no-lonely-if
        if (__STAGE__ === 'isuvorov') console.log('!!!!this.reqPromise.cancel');
      }
    }
    const reqPromise = uapp.resolve({
      path: req.path || req.pathname,
      query: req.query,
    });
    this.reqPromise = reqPromise;
    await reqPromise;
    if (!reqPromise.isCancelled) {
      if (__STAGE__ === 'isuvorov') console.log('!isCancelled !isCancelled !isCancelled', reqPromise);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (reqPromise.isCancelled()) {
        if (__STAGE__ === 'isuvorov') console.log('CANCEL CANCEL CANCEL');
        throw 'cancel';
      }
    }

    this.reqPromise = null;
    return uapp.page;
  }
}
