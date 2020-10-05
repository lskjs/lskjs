import map from 'lodash/map';
import get from 'lodash/get';
import fs from 'fs';
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
        let errText;
        if (!get(this, 'assetManifest')) {
          errText = '!assetManifest';
        } else if (!get(this, 'assetManifest.files')) {
          errText = '!assetManifest.files';
        } else {
          errText = `${name} not includes in [${Object.keys(this.assetManifest.files).join(',')}]`;
        }
        console.error('Html.asset not found', errText); // eslint-disable-line no-console
      }
      return null;
    }
  }
  renderAsset(name = '', inline, isArray) {
    let paths = this.asset(name);
    if (!Array.isArray(paths)) {
      paths = [paths];
    }
    let raws;
    if (inline) {
      try {
        const readFilePath = (path) => fs.readFileSync(this.publicPath + path).toString();
        raws = paths.map(readFilePath);
      } catch (err) {
        // eslint-disable-next-line no-console
        if (__DEV__) console.error(`renderAsset(${name}, true) err`, err);
      }
    }

    const safeRender = (renderFunc) => (str) => (str ? renderFunc(str) : '');
    const renderRawCSS = (raw) => `<style rel="stylesheet" type="text/css">${raw}</style>`;
    const renderPathCSS = (path) => `<link rel="stylesheet" type="text/css" href="${path}">`;
    const renderRawJS = (raw) => `<script type="text/javascript">${raw}</script>`;
    const renderPathJS = (path) => `<script type="text/javascript" src="${path}"></script>`;

    if (!paths) return '';
    let ext = name.split('.').reverse()[0];
    if (isArray) {
      ext = name.match(/([A-Z]+)/)[0].toLowerCase();
    }
    if (ext === 'css') {
      if (raws) return raws.map(safeRender(renderRawCSS)).join('\n');
      return paths.map(safeRender(renderPathCSS)).join('\n');
    }
    if (ext === 'js') {
      if (raws) return raws.map(safeRender(renderRawJS)).join('\n');
      return paths.map(safeRender(renderPathJS)).join('\n');
    }
    return '';
  }

  renderTitle() {
    const { meta = {} } = this;
    return meta.title || '';
  }

  renderOGNamespace(namespace, meta) {
    return map(meta, (content, name) =>
      this.renderOGMetaTag([namespace, name].filter(Boolean).join(':'), content),
    ).join('');
  }

  renderOGMetaTag(name, content) {
    return content ? `<meta property="${name}" content="${content}" />` : '';
  }
  renderOGMeta() {
    const { meta = {} } = this;
    const { og = {}, twitter } = meta;
    if (!og.title) og.title = meta.title ? meta.title : this.renderTitle();
    ['description', 'url', 'image', 'type', 'site_name'].forEach((ogName) => {
      if (!og[ogName] && meta[ogName]) og[ogName] = meta[ogName];
    });
    return `\
${this.renderOGNamespace('og', og)}\
${twitter ? this.renderOGNamespace('twitter', twitter) : ''}\
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
${this.renderAsset('vendorsCSS', false, true)}\
${this.renderAsset('main.css')}\
${this.renderStyle()}\
${head}\
${!js ? '' : `<script>${js}</script>`}\
${this.renderPreloader()} \
`;
  }

  preloader = '<!-- preloader -->';
  renderPreloader() {
    // TODO: __preloader
    return this.preloader || '';
  }

  meta = {};
  renderMeta() {
    const { meta = {} } = this;
    return `\
<meta charset="utf-8">\
<meta http-equiv="x-ua-compatible" content="ie=edge" />\
<meta http-equiv="content-language" content=”${this.getLang('meta')}” />\
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
`; // TODO: remove webpack parts
  }

  getHtmlClass() {
    const ua = {}; // useragent.is(req.headers['user-agent'])
    ua.js = false;
    ua.touchable = false;

    const postfix = __DEV__ ? ' __DEV__' : '';
    return (map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ') || '') + postfix;
  }

  getLang() {
    return 'en'; // @TODO: isuvorov поставь реальный язык, <3
  }

  renderStyle() {
    const { styles = [] } = this;
    return `<style id="css">${styles.join('\n')}</style>`;
  }

  js = '';
  renderJS() {
    const { js = '' } = this;
    return js;
  }

  globals = {};
  renderGlobals() {
    const { globals = {} } = this;
    const str = serializeWindow(
      {
        __DEV__,
        __STAGE__,
        ...globals,
      },
      serialize,
    );
    if (!str) return '';
    return `\
<script>\
${str}\
</script>\
`;
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
    if (!rootStateStr) return '';
    return `\
<script>\
${rootStateStr}\
</script>\
`;
  }

  render() {
    return `\
<!doctype html>\
<html class="${this.getHtmlClass()}" lang="${this.getLang()}" prefix="og: http://ogp.me/ns#">\
<head>\
${this.renderHead()}\
</head>\
<body>\
<div id="root"/>\
${this.content}\
</div>\
${this.renderRootState()}\
${this.renderGlobals()}\
${this.renderAsset('runtime-main.js', true)}\
${this.renderAsset('vendorsJS', false, true)}\
${this.renderAsset('main.js')}\
${this.renderFooter()}\
</body>\
</html>\
`;
  }
}
