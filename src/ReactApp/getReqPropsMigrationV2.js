import React from 'react';

class Page {
  constructor(props = {}, context = {}) {
    this._page = true;
    this.state = {};
    Object.assign(this.state, props);
    this.context = {};
    Object.assign(this.context, context);
    this.init();
  }

  async init() {
    if (this.state.titles) this.state.titles = [];
  }

  checkAuth() {
    // console.log('checkAuth',!!(this.context.uapp && this.context.uapp.rootState.user),this.context.uapp);
    return !!(this.context.uapp && this.context.uapp.rootState.user);
  }

  getState() {
    return {
      ...this.state,
      component: this.render(),
    };
  }

  isAuth() {
    if (!this.checkAuth()) {
      this.redirect('/auth/login?r=/return/back/url'); // @TODO return back url
      this.disable();
    }
    return this;
  }

  enable() {
    this.disabled = false;
    return true;
  }
  disable() {
    this.disabled = true;
    return true;
  }


  next(next) {
    if (this.disabled) return this;
    return next()
    .catch((err) => {
      // console.log('next err', err);
      return this
        .layout(this.state.errorLayout)
        .title('ERROR!!!')
        .component(`Error: ${err}`)
        // .component([this.state.errorLayout, { children: `Error: ${err}` }]);
        // .component(`Error: ${JSON.stringify(err)}`)
    });
  }

  title(title) {
    if (this.disabled) return this;
    this.state.titles = [title];
    return this;
  }

  pushTitle(...args) {
    if (this.disabled) return this;
    if (!this.state.titles) {
      this.state.titles = [];
    }
    this.state.titles.push(...args);
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

  component(component) {
    if (this.disabled) return this;
    this.state.component = component;
    return this;
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

  renderTitle() {

  }

  renderLayout(props = {}, layout = null) {
    if (!this.state.layout) {
      return props.children;
    }
    if (!layout) layout = this.state.layout;
    const Layout = layout;

    return <Layout {...props} />;
  }

  renderComponent() {
    if (!Array.isArray(this.state.component)) {
      return this.state.component;
    }
    return React.createElement(this.state.component[0], this.state.component[1]);
  }

  render() {
    return this.renderLayout({
      children: this.renderComponent(),
    });
  }

}

export default (app, { req, reqCtx }) => {
  const uapp = {
    umodels: app.getUmodels && app.getUmodels() || {},
    rootState: reqCtx.rootState,
  };
  return {
    uapp,
    page: new Page({}, { uapp }),
    Page,
  };
};
