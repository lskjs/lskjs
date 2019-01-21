import get from 'lodash/get';
import map from 'lodash/map';
import ReactDOM from 'react-dom/server';

import BasePage from './Page.client';

export default class Page extends BasePage {
  getTitle() {
    const metas = this.state.metas || [];
    return get(metas, `${metas.length - 1}.title`) || '';
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
    // ${!this.state.favicon ? '' : `<link rel="shortcut icon" href="${this.state.favicon}" type="image/x-icon" />`}
    return `\
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-icon-180x180.png" />
<link rel="icon" type="image/png" sizes="192x192"  href="/assets/icons/android-icon-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
<link rel="manifest" href="/assets/icons/manifest.json" />
<meta name="msapplication-TileImage" content="/assets/icons/ms-icon-144x144.png" />
<meta name="msapplication-TileColor" content="#ff0000" />
<meta name="theme-color" content="#ff0000" />
`;
  }

  getRootState() {
    return this.uapp.rootState;
  }

  renderHead() {
    const js = this.renderJS();
    return `\
<title>${this.renderTitle()}</title>
${this.renderMeta()}
${this.renderShims()}
${this.renderFavicon()}
${this.renderOGMeta()}
${this.renderAssets('css')}
${this.renderStyle()}
${!js ? '' : `<script>${js}</script>`}
${this.renderPreloader()}
`;
  }


  renderMeta() {
    return `\
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1., maximum-scale=1." />
<meta name="description" content="${this.getMeta('description')}"/>
`;
  }
  renderShims() {
    return `\
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
`;
  }

  preloader = `
    <img
      src="/preloader.gif"
      alt="Loading"
      width="120"
      height="120"
      class="preloader-gif"
    />
  `;
  renderPreloader() {
    if (!this.preloader) return '';
    return `\
    <style type="text/css">
      .ua_js_no .preloader {
        visibility: visible;
        opacity: 1;
      }
      .ua_js_yes .preloader {
        visibility: hidden;
        opacity: 0;
      }
      .preloader {
          transition: opacity .8s ease-out, visibility .8s ease-out;
          height: 100%;
          min-height: 100%;
          margin: 0;
          overflow: hidden;
          user-select: none;
          cursor: progress;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;

          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(255, 255, 255);
      }
      .preloader-element {
        display: flex;
      }
      .preloader-gif {
        user-select: none;
      }
    </style>
    ${!(!__DEV__ && __SERVER__) ? '' : `
      <div class="preloader">
        <div class="preloader-element">
          ${this.preloader}
        </div>
      </div>
    `}
`;
  }


  getHtmlClass() {
    const ua = {};// useragent.is(req.headers['user-agent'])
    ua.js = false;
    ua.touchable = false;

    const postfix = __DEV__ ? ' __DEV__' : '';
    return (map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ') || '') + postfix;
  }

  renderStyle() {
    const styles = this.uapp.styles || [];
    return `<style id="css">${(styles).join('\n')}</style>`;
  }


  renderJS() {
    if (__CLIENT__) return '';
    return `
      window.__VERSION='${__VERSION}';
      window.__STAGE='${__STAGE}';
      window.__INSTANCE='${__INSTANCE}';
      window.__MASTER=${__MASTER} || false;
      window.__STAGE='${process.env.STAGE || 'develop'}';
    `;
  }

  renderChunks(type, chunk = 'client') {
    const props = this.uapp;
    if (!props || !props.assets) return '';
    // console.log('props.assets', props.assets);
    const assets = props.assets[chunk];
    if (type === 'css' && assets) {
      return assets
        .filter(filename => filename.includes('.css'))
        .map(filename => (
          `<link rel="stylesheet" href="${filename}">`
        ))
        .join('\n');
    }
    if (type === 'js' && assets) {
      return assets
        .filter(filename => filename.includes('.js'))
        .map(filename => (
          `<script id="js" src="${filename}"></script>`
        ))
        .join('\n');
    }
    return '';
  }

  renderAssets(type) {
    const props = this.uapp;
    if (!props || !props.assets) return '';
    if (type === 'css' && props.assets) {
      return `<link rel="stylesheet" href="${props.assets['client.css']}">`;
    }
    if (type === 'js' && props.assets) {
      return `<script id="js" src="${props.assets['client.js']}"></script>`;
    }
    return '';
  }

  renderFooter() {
    const util = require('util');
    // const SHOW_DEBUG = true; //__DEV__ && __SERVER__
    const SHOW_DEBUG = __DEV__ && __SERVER__;
    const debug = SHOW_DEBUG ? `<!--
DEBUG INFO

__SERVER__: ${__SERVER__}
__DEV__: ${__DEV__}
__STAGE: ${__STAGE}

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
${this.footer || ''}
`;
  }

  renderHtml() {
    let root;
    let rootDom;
    try {
      rootDom = this.renderRoot();
      root = ReactDOM.renderToStaticMarkup(rootDom); // because async style render
    } catch (err) {
      const text = ['Error', 'Page.renderHtml', 'ReactDOM.renderToStaticMarkup', ''].join(':\n');
      console.error(text, err);
      // __DEV__ && console.log(err);
      if (__DEV__) {
        return `<pre>${text}${err.stack}</pre>`;
      }
      return err.message;
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
