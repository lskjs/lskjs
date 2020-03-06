import map from 'lodash/map';
import serializeWindow from '@lskjs/utils/serializeWindow';
import serializeJavascript from 'serialize-javascript';

const serialize = __DEV__ ? JSON.stringify : serializeJavascript;

// const trim = str => str;
// import renderPreloader from '@lskjs/general/Loading/renderPreloader';

export default class Html {
  assetManifest = {};
  constructor(props) {
    Object.assign(this, props);
  }
  asset(name) {
    try {
      const res = this.assetManifest.files[name];
      if (!res) throw '!res';
      return res;
    } catch (err) {
      if (__DEV__) {
        console.error('Html.asset not found', name); // eslint-disable-line no-console
      }
      return null;
    }
  }
  renderAsset(name = '') {
    const path = this.asset(name);
    if (!path) return '';
    const ext = name.split('.').reverse()[0];
    if (ext === 'css') {
      return `<link rel="stylesheet" type="text/css" href="${path}">`;
    }
    if (ext === 'js') {
      return `<script type="text/javascript" src="${path}"></script>`;
    }
    return '';
  }

  renderTitle() {
    const { meta = {} } = this;
    return meta.title || '';
  }

  renderOGMeta() {
    const { meta = {} } = this;
    return `\
${meta.title ? `<meta property="og:title" content="${this.renderTitle()}" />` : ''}\
${meta.description ? `<meta property="og:description" content="${meta.description}" />` : ''}\
${meta.url ? `<meta property="og:url" content="${meta.url}" />` : ''}\
${meta.image ? `<meta property="og:image" content="${meta.image}" />` : ''}\
`;
  }

  // renderFavicon = require('./renderFavicon').default

  favicon = '<!-- favicon -->';
  renderFavicon() {
    return this.favicon || '';
  }

  head = '';
  renderHead() {
    const js = this.renderJS();
    const { head = '' } = this;
    return `\
<title>${this.renderTitle()}</title>\
${this.renderMeta()}\
${this.renderPolyfill()}\
${this.renderFavicon()}\
${this.renderOGMeta()}\
${this.renderAsset('vendor.css')}\
${this.renderAsset('main.css')}\
${this.renderStyle()}\
${head}\
${!js ? '' : `<script>${js}</script>`}\
${this.renderPreloader()} \
`;
  }

  preloader = '<!-- renderPreloader -->';
  renderPreloader() {
    return this.preloader || '';
  }

  meta = {};
  renderMeta() {
    const { meta = {} } = this;
    return `\
<meta charset="utf-8">\
<meta http-equiv="x-ua-compatible" content="ie=edge" />\
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1., maximum-scale=1." />\
${meta.description ? `<meta name="description" content="${meta.description}"/>` : ''}\
`;
  }
  renderPolyfill() {
    return `\
<!--[if lt IE 9]>\
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>\
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\
<![endif]-->\
<script>!function(e){function t(t){for(var n,i,l=t[0],f=t[1],a=t[2],c=0,s=[];c<l.length;c++)i=l[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&s.push(o[i][0]),o[i]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(p&&p(t);s.length;)s.shift()();return u.push.apply(u,a||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,l=1;l<r.length;l++){var f=r[l];0!==o[f]&&(n=!1)}n&&(u.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={1:0},u=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var l=this.webpackJsonpinit=this.webpackJsonpinit||[],f=l.push.bind(l);l.push=t,l=l.slice();for(var a=0;a<l.length;a++)t(l[a]);var p=f;r()}([])</script>
`;
  }

  getHtmlClass() {
    const ua = {}; // useragent.is(req.headers['user-agent'])
    ua.js = false;
    ua.touchable = false;

    const postfix = __DEV__ ? ' __DEV__' : '';
    return (map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ') || '') + postfix;
  }

  renderStyle() {
    const { styles = [] } = this;
    return `<style id="css">${styles.join('\n')}</style>`;
  }

  js = '';
  renderJS() {
    const { js = '' } = this;
    return `\
${this.renderGlobals()}\
${js}\
`;
  }

  globals = {};
  renderGlobals() {
    const { globals = {} } = this;
    return serializeWindow(globals, serialize);
  }

  footer = '';
  renderFooter() {
    return this.footer || '';
  }

  renderRootState() {
    let rootStateStr;
    if (typeof this.rootState === 'string') {
      rootStateStr = this.rootState;
    } else {
      rootStateStr = serializeWindow({ __ROOT_STATE__: this.rootState }, serialize);
    }
    return `\
<script>\
${rootStateStr};\
</script>\
`;
  }

  render() {
    return `\
<!doctype html>\
<html class="${this.getHtmlClass()}">\
<head>\
${this.renderHead()}\
</head>\
<body>\
<div id="root"/>\
${this.content}\
</div>\
${this.renderRootState()}\
${this.renderAsset('vendor.js')}\
${this.renderAsset('main.js')}\
${this.renderFooter()}\
</body>\
</html>\
`;
  }
}
