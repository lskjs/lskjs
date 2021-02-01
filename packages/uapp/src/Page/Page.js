import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import merge from 'lodash/merge';
import { observable } from 'mobx';
import React from 'react';
// import Loading from '@lskjs/general/Loading';

// const DEBUG = __DEV__ && false;
// const deprecated = createLogger({ name: 'uapp/Page', type: 'deprecated' });

// DEBUG ? () => null : console.log; // eslint-disable-line no-console
// const DEBUG = true;

export class PageModule extends Module {
  _page = 1;
  @observable state = {};
  rootState = null;

  beforeResolve() {
    this.exit();
    this.state = {};
    this._page += 1;
  }
  afterResolve() {
    //
  }

  async wait(promise) {
    const beforePageId = this._page;
    let res;
    let err;
    try {
      res = await promise;
    } catch (error) {
      err = error;
    }
    const afterPageId = this._page;
    if (beforePageId !== afterPageId) throw new Err('page.cancel');
    if (err) throw err;
    return res;
  }

  getRootState() {
    return {
      ...(this.rootState || {}),
    };
  }

  getMeta() {
    const meta = (this.state && this.state.meta) || {};
    const title = (this.state.metas || [])
      .map((t) => t.title)
      .reverse()
      .join(' - ');
    return {
      ...meta,
      title,
    };
  }

  onExit(fn) {
    this.log.trace('onExit()');
    const { onExit = [] } = this.state;
    this.setState({
      onExit: [...onExit, fn],
    });
    return this;
  }

  async exit() {
    this.log.trace('exit()');
    const { onExit } = this.state;
    if (onExit && onExit.length) {
      await Bluebird.map(onExit, (fn) => fn());
      this.state.onExit = [];
    }
  }

  setState(state = {}) {
    this.log.trace('setState()');
    this.state = {
      ...this.state,
      ...state,
    };
    return this;
  }

  catchError(err) {
    this.log.trace('error()', err);
    if (__DEV__) {
      this.uapp.onError(err);
    }
    // if (__DEV__) {
    //   if (err.message) {
    //     console.error('Page.error:', err.message); // eslint-disable-line no-console
    //     if (err.stack) console.error(err.stack); // eslint-disable-line no-console
    //   } else {
    //     console.error(err); // eslint-disable-line no-console
    //   }
    // }
    if (__CLIENT__ && this.uapp.checkVersion) {
      // / !!!!!!!!!!!!!
      this.uapp.checkVersion();
    }
    throw err;
  }

  loading(...args) {
    this.log.trace('loading()');
    if (!args.length) return this.component('Loading...');
    return this.component(...args);
  }

  async next(next) {
    this.log.trace('next()');
    if (this.disabled) return this;
    try {
      const res = await next();
      return res;
    } catch (err) {
      return this.catchError(err);
    }
  }

  meta(meta) {
    this.log.trace('meta()', JSON.stringify(this.state.metas), meta);
    if (!this.state.metas) this.state.metas = [];
    this.state.metas.push(meta);
    this.state.meta = merge({}, ...this.state.metas);
    return this;
  }

  components = [];

  async component(...args) {
    this.log.trace('component()', args[0]);
    const result = await args[0];
    if (result.default) {
      args[0] = result.default; // eslint-disable-line no-param-reassign
    } else {
      args[0] = result; // eslint-disable-line no-param-reassign
    }
    // }
    if (args.length > 1) {
      this.components = args;
    } else {
      this.components = args[0]; // eslint-disable-line prefer-destructuring
    }
    this.log.trace('components()', this.components);
    return this;
  }

  redirect(...args) {
    const [redirect] = args;
    this.log.trace('redirect()', redirect);
    if (this.disabled) return this;
    this.state.redirect = args;
    return this;
  }

  renderComponent() {
    this.log.trace('renderComponent()', this.state);
    let Component;
    let props = {};
    if (Array.isArray(this.components)) {
      [Component, props] = this.components;
    } else {
      Component = this.components;
    }
    if (Array.isArray(this.components)) {
      return React.createElement(this.components[0], this.components[1] || {});
    }
    return React.createElement(Component, props);
  }

  render() {
    this.log.trace('renderRoot()');
    let children = this.renderComponent();
    if (typeof children === 'undefined') {
      if (__DEV__) {
        children = 'Page return empty result';
      } else {
        children = '';
      }
    }
    const { Provider } = this;
    if (!Provider) return children;
    return React.createElement(Provider, { app: this.app, page: this }, children);
  }
}

export default PageModule;
