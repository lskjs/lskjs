import map from 'lodash/map';

// import renderPreloader from '@lskjs/general/Loading/renderPreloader';
export default class Html {
  constructor(props) {
    Object.assign(this, props);
  }

  publicDir = __DEV__ ? `${process.cwd()}/public` : `${process.cwd()}/../public`;
  assets(url) {
    const str = require('fs').readFileSync(`${this.publicDir}/asset-manifest.json`);
    const json = JSON.parse(str);
    return json[url];
  }

  renderTitle() {
    const { meta = {} } = this;
    return meta.title || '';
  }

  renderOGMeta() {
    const { meta = {} } = this;
    return `\
${meta.title ? `<meta property="og:title" content="${meta.title}" />` : ''}
${meta.description ? `<meta property="og:description" content="${meta.description}" />` : ''}
${meta.url ? `<meta property="og:url" content="${meta.url}" />` : ''}
${meta.image ? `<meta property="og:image" content="${meta.image}" />` : ''}
`;
  }

  // renderFavicon = require('./renderFavicon').default

  renderFavicon = () => '<!-- favicon -->';

  renderHead() {
    const js = this.renderJS();
    const { head } = this;
    return `\
<title>${this.renderTitle()}</title>
${this.renderMeta()}
${this.renderShims()}
${this.renderFavicon()}
${this.renderOGMeta()}
${this.renderAssets('css')}
${this.renderStyle()}
${head || ''}
${!js ? '' : `<script>${js}</script>`}
${this.renderPreloader()} 
`;
  }

  renderPreloader() {
    return '<!-- renderPreloader -->';
    // return renderPreloader();
  }

  renderMeta() {
    const { meta = {} } = this;
    return `\
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1., maximum-scale=1." />
${meta.description ? `<meta name="description" content="${meta.description}"/>` : ''}

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

  renderJS() {
    const { js = '' } = this;
    return `
${this.renderGlobals()}
${js}
    `;
  }

  renderGlobals() {
    const { globals = {} } = this;
    return map(globals, (val, key) => `window['${key}'] = ${JSON.stringify(val)};\n`).join('');
  }

  renderChunks(type, chunk = 'client') {
    if (!this.assets) return '';
    // console.log('props.assets', props.assets);
    const assets = this.assets[chunk];
    if (type === 'css' && assets) {
      return assets
        .filter(filename => filename.includes('.css'))
        .map(filename => `<link rel="stylesheet" href="${filename}">`)
        .join('\n');
    }
    if (type === 'js' && assets) {
      return assets
        .filter(filename => filename.includes('.js'))
        .map(filename => `<script id="js" src="${filename}"></script>`)
        .join('\n');
    }
    return '';
  }

  renderAssets(type) {
    if (!this.assets) return '';
    if (type === 'css') {
      try {
        return this.assets('main.css') || '';
      } catch (err) {
        if (__DEV__) {
          console.error('renderAssets', type, err); // eslint-disable-line no-console
        }
        return '';
      }
    }
    if (type === 'js') {
      try {
        return (
          require('fs')
            .readFileSync(`${this.publicDir}/footer.html`)
            .toString() || ''
        );
      } catch (err) {
        if (__DEV__) {
          console.error('renderAssets', type, err); // eslint-disable-line no-console
        }
        return '';
      }
    }
    return '';
  }

  renderDebug() {
    const util = require('util');
    return `<!--
DEBUG INFO

__SERVER__: ${__SERVER__}
__DEV__: ${__DEV__}
__STAGE: ${__STAGE__}

uapp.keys: ${Object.keys(this.page.uapp)}
uapp.config:
${util.inspect(this.page.uapp.config)}
uapp.page.state:
${util.inspect(this.page.state)}
-->`;
  }

  renderFooter() {
    const { footer } = this;
    return `\
${footer || ''}
`;
  }

  renderRootState() {
    return `\
<script>
window.__ROOT_STATE__ = ${JSON.stringify(this.rootState, null, __DEV__ ? 4 : 0)};
</script>
`;
  }

  render() {
    return `\
<!doctype html>
<html class="${this.getHtmlClass()}">
  <head>
    ${this.renderHead()}
  </head>
  <body>
    <div id="root"/>
      ${this.content}
    </div>
    ${this.renderRootState()}
    ${this.renderAssets('js')}
    ${this.renderFooter()}
  </body>
</html>
      `;
  }
}
