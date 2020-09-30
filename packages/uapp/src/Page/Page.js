import React from 'react';
import merge from 'lodash/merge';
import Promise from 'bluebird';
import createLogger from '@lskjs/utils/createLogger';
import assignProps from '@lskjs/utils/assignProps';
import Err from '@lskjs/utils/Err';
import { observable } from 'mobx';
// import Loading from '@lskjs/general/Loading';

// const DEBUG = __DEV__ && false;
const debug = createLogger({ name: 'uapp/Page', enable: __DEV__ && false });
// const deprecated = createLogger({ name: 'uapp/Page', type: 'deprecated' });

// DEBUG ? () => null : console.log; // eslint-disable-line no-console
// const DEBUG = true;

export default class Page {
  _page = 1;
  @observable state = {};
  rootState = null;

  constructor(...props) {
    assignProps(this, ...props);
  }

  init() {
    this.state = {};
    this._page += 1;
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
    debug('Page.onExit');
    const { onExit = [] } = this.state;
    this.setState({
      onExit: [...onExit, fn],
    });
    return this;
  }

  scrollTo(id) {
    console.log(`Not realized: Uapp.scrollTo(${id})`); // eslint-disable-line no-console
  }

  async exit() {
    debug('Page.exit');
    const { onExit } = this.state;
    if (onExit && onExit.length) {
      await Promise.map(onExit, (fn) => fn());
      this.state.onExit = [];
    }
  }

  async enter() {
    debug('Page.enter');
    this.scrollTo(0);
  }

  setState(state = {}) {
    debug('Page.setState');
    this.state = {
      ...this.state,
      ...state,
    };
    return this;
  }

  catchError(err) {
    debug('Page.error', err);
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
    debug('Page.loading');
    if (!args.length) return this.component('Loading...');
    return this.component(...args);
  }

  async next(next) {
    debug('Page.next');
    if (this.disabled) return this;
    try {
      const res = await next();
      return res;
    } catch (err) {
      return this.catchError(err);
    }
  }

  meta(meta) {
    debug('Page.meta', JSON.stringify(this.state.metas), meta);
    if (!this.state.metas) this.state.metas = [];
    this.state.metas.push(meta);
    this.state.meta = merge({}, ...this.state.metas);
    return this;
  }

  components = [];

  async component(...args) {
    debug('Page.component', args[0]);
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
    debug('Page.components', this.components);
    return this;
  }

  redirect(...args) {
    const [redirect] = args;
    debug('Page.redirect', redirect);
    if (this.disabled) return this;
    this.state.redirect = args;
    return this;
  }

  // ///////////////////////////////////////////////////////////////////////
  renderLayout(props = {}, layout = null) {
    debug('Page.renderLayout');
    // debug('Page.renderLayout');
    // console.log('page.renderLayout', props);
    // if (typeof props.children === 'undefined') {
    //   props.children = 'undefined'
    // }
    if (!this.state.layout && !layout) {
      return props.children;
    }
    let Layout;
    if (layout) {
      Layout = layout;
    } else {
      Layout = this.state.layout;
    }

    return React.createElement(Layout, props);
  }

  renderComponent() {
    debug('Page.renderComponent', this.state);
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

  renderComponentWithLayout() {
    debug('Page.renderComponentWithLayout');
    let children = this.renderComponent();
    // console.log('page.children111', children, typeof children, typeof children === 'undefined');
    if (typeof children === 'undefined') {
      if (__DEV__) {
        children = 'Page return empty result';
      } else {
        children = '';
      }
    }
    // console.log('page.children222', children, typeof children, typeof children === 'undefined');

    return this.renderLayout({
      children,
    });
  }

  render() {
    debug('Page.renderRoot');
    const children = this.renderComponentWithLayout();
    const { Provider } = this;
    if (!Provider) return children;
    return React.createElement(Provider, { uapp: this.uapp }, children);
  }
}
