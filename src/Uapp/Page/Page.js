import React from 'react';
import _ from 'lodash';
import Root from '../Root';
import ReactDOM from 'react-dom/server';

export default class Page {

  Root = Root;

  state = {
    favicon: '/favicon.ico',
  }

  defaultProps = {
  }

  constructor(...args) {
    this.init(...args);
  }

  async init(props = {}, state = {}) {
    this._page = true;

    this.props = {
      ...this.defaultProps,
      ...props,
    };
    this.state = {
      ...this.defaultState,
      ...state,
    };

    this.uapp = this.props.uapp || {};

    this.state.titles = [];
    this.disabled = false;
  }

  checkAuth() {
    // console.log('checkAuth',!!(this.uapp && this.uapp.rootState.user),this.uapp);
    return this.uapp.rootState.user;
  }

  checkUserRole(role) {
    // if ()
    return !!(this.uapp && this.uapp.rootState.user &&
      (
        this.uapp.rootState.user.role === role ||
        this.uapp.rootState.user.username === 'me@coder24.ru'
      )
    );
  }

  setState(state = {}) {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  getState() {
    return this.state;
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


  isAuth() {
    if (!this.checkAuth()) {
      return this
        .redirect('/auth/login?r=/return/back/url') // @TODO return back url
        .disable();
    }
    return this;
  }

  isUserRole(role) {
    if (!this.checkUserRole(role)) {
      return this
        .error('Доступ запрещен')
        .disable();
    }
    return this;
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
      console.error({ err });
    }
    if (this.disabled) return this;
    return this
      .layout(this.state.errorLayout)
      .title('ERROR!!!')
      .component(`Error: ${err}`);
  }

  next(next) {
    if (this.disabled) return this;
    return next()
    .catch((err) => {
      return this.error(err);
    });
  }

  title(...args) {
    return this.pushTitle(...args);
  }


  pushTitle(...args) {
    return this.meta({ title: args[0] });
  }

  composeMeta(metas = []) {
    return _.merge({}, ...metas);
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

  component(...args) {
    if (this.disabled) return this;
    if (args.length > 1) {
      this.state.component = args;
    } else {
      this.state.component = args[0];
    }
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


  // //////////////////////////////////////////////////////////////////////////


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

  renderComponentWithLayout() {
    // console.log('page.render');
    return this.renderLayout({
      children: this.renderComponent(),
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
    const Root = this.Root;
    return (
      <Root {...this.getRootComponentProps()}>
        {this.renderComponentWithLayout()}
      </Root>
    );
  }

  getTitle() {
    const metas = this.state.metas || [];
    // "profile.games": { $in: ["aa", "bb", "z"] }
    // console.log(metas);
    return _.get(metas, `${metas.length - 1}.title`) || '';
  }

  renderTitle() {
    return this.renderFullTitle();
  }

  // RENDER
  renderFullTitle() {
    return (this.state.metas || []).reverse().map(t => t.title).join(' - ');
  }

  renderOGMeta() {
    return `\
<meta property="og:title" content="${this.getMeta('title')}" />
<meta property="og:description" content="${this.getMeta('description')}" />
<meta property="og:url" content="${this.getMeta('url')}" />
<meta property="og:image" content="${this.getMeta('image')}" />
`;
  }

  renderFavicon() {
    return `\
${!this.state.favicon ? '' : `<link rel="shortcut icon" href="${this.state.favicon}" type="image/x-icon" />`}
<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
<link rel="manifest" href="/icons/manifest.json">
<meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png">
<meta name="msapplication-TileColor" content="#ff0000">
<meta name="theme-color" content="#ff0000">
`;
  }


  getRootState() {
    return this.uapp.rootState;
  }

  renderHead() {
    return `\
<title>${this.renderTitle()}</title>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="${this.getMeta('description')}"/>
${this.renderFavicon()}
${this.renderOGMeta()}
${this.renderAssets('css')}
${this.renderStyle()}
`;
  }


  getHtmlClass() {
    const ua = {};// useragent.is(req.headers['user-agent'])
    ua.js = false;
    ua.touchable = false;

    const postfix = __DEV__ ? ' __DEV__' : '';
    return (_.map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ') || '') + postfix;
  }


  renderStyle() {
    const styles = this.uapp.styles || [];
    return `<style id="css">${(styles).join('\n')}</style>`;
  }


  renderAssets(type) {
    const props = this.uapp;
    if (!props || !props.assets) return '';
    if (type === 'css' && props.assets && props.assets.css) {
      return `<link rel="stylesheet" href="${props.assets.css}">`;
    }
    if (type === 'js' && props.assets && props.assets.js) {
      return `<script id="js" src="${props.assets.js}"></script>`;
    }
    return '';
  }

  renderFooter() {
    const util = require('util');
    const debug = __DEV__ && __SERVER__ ? `<!--
DEBUG INFO

__SERVER__: ${__SERVER__}
__DEV__: ${__DEV__}
__PROD__: ${__PROD__}
__STAGE__: ${__STAGE__}

uapp.keys: ${Object.keys(this.uapp)}
uapp.config:
${util.inspect(this.uapp.config)}
uapp.page.state:
${util.inspect(this.uapp.page.state)}
-->` : '';
      // const debug = __DEV__ && __SERVER__ ? `<!-- ${util.inspect({ ...this.props, style: undefined, req: undefined, ctx: null })} -->` : '';
      // ${debug}
    return `\
${debug}
${this.state.footerHtml || ''}
`;
  }

  renderHtml() {
    let root;
    try {
      root = ReactDOM.renderToStaticMarkup(this.renderRoot()); // because async style render
    } catch (err) {
      console.error('ReactDOM.renderToStaticMarkup', err);
      return `ReactDOM.renderToStaticMarkup err${JSON.stringify(err)}`;
    }
    return `\
  <!doctype html>
  <html class="${this.getHtmlClass()}">
    <head>
      ${this.renderHead()}
    </head>
    <body>
      <div id="root"/>
        ${root}
      </div>
      <script>
        window.__ROOT_STATE__ = ${JSON.stringify(this.getRootState(), null, __DEV__ ? 4 : 0)};
      </script>
      ${this.renderAssets('js')}
      ${this.renderFooter()}
    </body>
  </html>
      `;
  }


}
