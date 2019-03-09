/* eslint-disable class-methods-use-this */
/* eslint-disable indent */

export default class Template {
  theme = { colors: {} };
  fontFamily = this.theme.fontFamily;

  constructor(params = {}) {
    Object.assign(this, params);
  }

  getSubject() {
    return 'subject';
  }
  getText() {
    return 'text';
  }
  getHtml() {
    return this.render();
  }

  url(str, params) {
    return this.ctx.url(str, params);
  }

  renderHead() {
    return `
<head>
  <title>Title</title>
  header
</head>
`.trim();
  }
  renderFooter() {
    return `
<div>
  footer
</div>
`.trim();
  }
  renderContent() {
    return `
    Base Sample Email
    `;
  }
  renderBody() {
    return `
    <body>
      <div style="background:#dfe8ef;display: table;width: 100%;margin: 0px auto;">
        <div class="mail">
          <div class="lines">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="body_mail">
            <div class="content">
              ${this.renderContent()}
              ${this.renderFooter()}
            </div>
          </div>
          <div class="lines">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </body>`;
  }
  render() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      ${this.renderHead()}
      ${this.renderBody()}
    </html>
    `;
  }

}
