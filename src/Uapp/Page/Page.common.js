import React from 'react';
import merge from 'lodash/merge';
import Promise from 'bluebird';

const DEBUG = __DEV__ && false;

export default class Page {
  _page = true;
  state = {};

  constructor(...args) {
    this.init(...args);
  }

  async init(props = {}) {
    Object.assign(this, props);
  }

  onExit(fn) {
    if (DEBUG) console.log('Page.onExit');
    const { onExit = [] } = this.state;
    this.setState({
      onExit: [
        ...onExit,
        fn,
      ],
    });
    return this;
  }

  onError(err) {
    if (DEBUG) console.log('Page.onError', err);
    if (__CLIENT__ && this.uapp.checkVersion) { // / !!!!!!!!!!!!!
      this.uapp.checkVersion();
    }
    return this;
  }

  async exit() {
    if (DEBUG) console.log('Page.exit');
    const { onExit } = this.state;
    if (onExit && onExit.length) {
      await Promise.map(onExit, fn => fn());
      this.state.onExit = [];
    }
  }

  async enter() {
    if (DEBUG) console.log('Page.enter');

    if (__CLIENT__) document.body.scrollTop = 0;
    // change title
  }

  toTop() {
    if (__CLIENT__) document.body.scrollTop = 0;
    return this;
  }

  setState(state = {}) {
    if (DEBUG) console.log('Page.setState');

    this.state = {
      ...this.state,
      ...state,
    };
    return this;
  }

  // getRes(isRenderHtml = false) {
  //   if (this.state.redirect) {
  //     return {
  //       redirect: this.state.redirect,
  //     };
  //   }
  //   if (isRenderHtml) {
  //     return {
  //       status: 200,
  //       content: this.renderHtml(),
  //     };
  //   }
  //   return {
  //     status: 200,
  //     component: this.renderRoot(),
  //   };
  // }


  error(err) {
    if (DEBUG) console.log('Page.error', err);
    if (__DEV__) {
      if (err.message) {
        console.error(err.message);
        console.error(err.stack);
      } else {
        console.error(err);
      }
    }
    // return this.setState({ err });
    if (this.disabled) return this;
    return this
      .setState({ layout: this.state.errorLayout })
      .component('div', { children: err });
  }

  loading() {
    if (DEBUG) console.log('Page.loading');
    const Loading = this.state.loading || 'Loading...';
    return this.component(Loading);
  }


  async next(next) {
    if (DEBUG) console.log('Page.next');
    if (this.disabled) return this;
    try {
      const res = await next();
      return res;
    } catch (err) {
      this.onError(err);
      return this.error(err);
    }
  }

  meta(meta) {
    if (DEBUG) console.log('Page.meta');
    if (!this.state.metas) this.state.metas = [];
    this.state.metas.push(meta);
    this.state.meta = merge({}, ...this.state.metas);
    return this;
  }

  async component(...args) {
    if (DEBUG) console.log('Page.component', args[0]);
    const result = await args[0];
    if (result.default) {
      args[0] = result.default;
    } else {
      args[0] = result;
    }
    // }
    if (args.length > 1) {
      this.state.component = args;
    } else {
      this.state.component = args[0];
    }
    if (DEBUG) console.log('Page.this.state.component', this.state.component);
    return this;
  }

  redirect(redirect) {
    if (DEBUG) console.log('Page.redirect', redirect);
    if (this.disabled) return this;
    this.state.redirect = redirect;
    return this;
  }

  // ///////////////////////////////////////////////////////////////////////
  renderLayout(props = {}, layout = null) {
    if (DEBUG) console.log('Page.renderLayout');
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

    return <Layout {...props} />;
  }

  renderComponent() {
    if (DEBUG) console.log('Page.renderComponent');
    if (!Array.isArray(this.state.component)) {
      return this.state.component;
    }
    return React.createElement(this.state.component[0], this.state.component[1]);
  }

  renderComponentWithLayout() {
    if (DEBUG) console.log('Page.renderComponentWithLayout');
    let children = this.renderComponent();
    // console.log('page.children111', children, typeof children, typeof children === 'undefined');
    if (typeof children === 'undefined') {
      if (__DEV__) {
        children = '@undefined';
      } else {
        children = '';
      }
    }
    // console.log('page.children222', children, typeof children, typeof children === 'undefined');

    return this.renderLayout({
      children,
    });
  }

  getRootComponentProps() {
    if (DEBUG) console.log('Page.getRootComponentProps');
    return {
      uapp: this.uapp,
      history: this.uapp.history,
      insertCss: this.uapp.insertCss,
    };
  }

  renderRoot() {
    if (DEBUG) console.log('Page.renderRoot');
    const children = this.renderComponentWithLayout();
    if (!this.Root) return children;
    const { Root } = this;
    return (
      <Root {...this.getRootComponentProps()}>
        {children}
      </Root>
    );
  }
}
