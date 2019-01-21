import React from 'react';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

const DEBUG = false;

export default class Page {
  _page = true;
  defaultState = {
    favicon: '/favicon.ico',
  }

  constructor(...args) {
    this.init(...args);
  }

  async init(props = {}) {
    Object.assign(this, omit(props, ['state']));
    this.state = {
      ...this.defaultState,
      ...props.state,
    };
    this.state.titles = [];
    this.disabled = false;
  }

  toTop() {
    if (__CLIENT__) document.body.scrollTop = 0;
    return this;
  }

  setState(state = {}) {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  // useRes(res) {
  //   if (this.state.redirect) {
  //     return res.redirect(this.state.redirect);
  //   }
  //   return res
  //     .status(200)
  //     .send(this.render());
  // }

  getRes(isRenderHtml = false) {
    if (this.state.redirect) {
      return {
        redirect: this.state.redirect,
      };
    }
    if (isRenderHtml) {
      return {
        status: 200,
        content: this.renderHtml(),
      };
    }
    return {
      status: 200,
      component: this.renderRoot(),
    };
  }

  enable() {
    this.disabled = false;
    return this;
  }
  disable() {
    this.disabled = true;
    return this;
  }

  error(err) {
    if (__DEV__) {
      if (err.message) {
        console.error(err.message);
        console.error(err.stack);
      } else {
        console.error(err);
      }
    }
    if (this.disabled) return this;
    return this
      .layout(this.state.errorLayout)
      .component('div', { children: err });
  }

  loading() {
    return this.component('Loading...');
  }


  async next(next) {
    if (this.disabled) return this;
    try {
      const res = await next();
      return res;
    } catch (err) {
      if (__CLIENT__ && this.uapp.checkVersion) {
        this.uapp.checkVersion();
      }
      return this.error(err);
    }
  }

  title(...args) {
    return this.pushTitle(...args);
  }


  pushTitle(...args) {
    return this.meta({ title: args[0] });
  }

  composeMeta(metas = []) {
    return merge({}, ...metas);
  }

  getMeta(name, def = null) {
    if (name) return (this.state.meta || {})[name] || def;
    return this.state.meta || {};
  }

  meta(meta) {
    if (this.disabled) return this;
    if (!this.state.metas) this.state.metas = [];
    this.state.metas.push(meta);
    this.state.meta = this.composeMeta(this.state.metas);
    return this;
  }

  errorLayout(errorLayout) {
    if (this.disabled) return this;
    this.state.errorLayout = errorLayout;
    return this;
  }

  layout(layout) {
    if (this.disabled) return this;
    this.state.layout = layout;
    return this;
  }

  async component(...args) {
    if (this.disabled) return this;
    DEBUG && console.log('args[0]', args[0]);
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
    DEBUG && console.log('this.state.component', this.state.component);
    return this.toTop();
  }

  content(content) {
    if (this.disabled) return this;
    this.state.content = content;
    return this;
  }

  redirect(redirect) {
    if (this.disabled) return this;
    this.state.redirect = redirect;
    return this;
  }

  // ///////////////////////////////////////////////////////////////////////
  renderLayout(props = {}, layout = null) {
    // console.log('page.renderLayout', props);
    // if (typeof props.children === 'undefined') {
    //   props.children = 'undefined'
    // }
    if (!this.state.layout) {
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
    if (!Array.isArray(this.state.component)) {
      return this.state.component;
    }
    return React.createElement(this.state.component[0], this.state.component[1]);
  }

  renderComponentWithLayout() {
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
    return {
      uapp: this.uapp,
      history: this.uapp.history,
      insertCss: this.uapp.insertCss,
    };
  }

  renderRoot() {
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
