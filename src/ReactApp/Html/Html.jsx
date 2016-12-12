import React, { PropTypes } from 'react';
// import useragent from 'useragent'
import _ from 'lodash'
import util from 'util'
import ReactDOM from 'react-dom/server';

export default class Html {

  static Root = require('./Root').default;
  constructor(props) {
    this.props = props || {}
  }

  getHtmlClass(req) {
    const ua = {}//useragent.is(req.headers['user-agent'])
    ua.js = false
    return _.map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ') || ''
  }

  getRootState() {
    return this.props.ctx.rootState
  }

  renderStyle() {
    // console.log('this.props.ctx', this.props.ctx);
    const styles = this.props.ctx.style || []
    return `<style id="css">${(styles).join("\n")}</style>`
  }
  renderHead() {
    return `\
<title>${this.props.title}</title>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="apple-touch-icon" href="apple-touch-icon.png" />
${this.renderStyle()}
`
  }
  renderRoot() {
    const Root = this.constructor.Root
    const component = <Root {...this.props} rootState={this.getRootState()}>
      {this.props.children}
    </Root>
    return ReactDOM.renderToStaticMarkup(component);
  }

  renderAssets() {
    const props = this.props
    return props.assets && props.assets.js && (
      `<script id="js" src="${props.assets.js}"></script>`
    ) || ''
  }

  renderFooter() {
    const debug = __DEV__ && __SERVER__ ? `<!-- ${util.inspect({...this.props,style:undefined, req: undefined, ctx: null})} -->` : ''
    return `\
${this.props.footerHtml || ''}
${debug}
    `
  }

  render() {
    const root = this.renderRoot() // because async style render
    return `\
<!doctype html>
<html class="${this.getHtmlClass(this.props.req)}">
  <head>
    ${this.renderHead()}
  </head>
  <body>
    <div id="root"/>
      ${root}
    </div>
    <script>
      window.__ROOT_STATE__ = ${JSON.stringify(this.getRootState())};
    </script>
    ${this.renderAssets()}
    ${this.renderFooter()}
  </body>
</html>
    `
  }
}
