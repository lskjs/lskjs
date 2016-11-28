import React, { PropTypes } from 'react';

export default class Html {
  constructor(params) {
    Object.assign(this, params);
  }
  renderHead() {
    return `
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="apple-touch-icon" href="apple-touch-icon.png" />
<style id="css">${this.style || ''}</style>
${this.headerHtml || ''}
`
  }
  render() {
    const props = this
    const debug = __DEV__ ? `<!-- ${JSON.stringify({...props,children:undefined,style:undefined})} -->` : ''
    return `
<!doctype html>
<html className="${props.htmlClass || ''}" lang="${props.lang || ''}">
  <head>
    <title>${props.title}</title>
    ${this.renderHead()}
  </head>
  <body>
    <div id="app"/>
      ${props.children || ''}
    </div>
    ${props.assets && props.assets.js && (
      `<script
        id="js"
        src="${props.assets.js}"
        data-initial-state="${JSON.stringify(props.initialState) || '{}'}"
      ></script>`
    ) || ''}
    ${props.footerHtml || ''}
    ${debug}
  </body>
</html>
    `
  }
}
