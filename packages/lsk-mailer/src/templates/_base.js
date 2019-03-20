export default class Template {
  constructor(params = {}) {
    Object.assign(this, params);
  }

  getOptions() {
    return {};
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
  renderBody({ params }) {
    // <div class="header">Привет!</div>
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
              ${this.renderContent(...arguments)}
              ${this.renderFooter(...arguments)}
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
  render(params = {}) {
    //
    // ${this.renderBody(params)}
    return `
    <!DOCTYPE html>
    <html lang="en">
      ${this.renderHead(params)}
      ${this.renderBody(params)}
    </html>
    `;
  }

  getHtml(...args) {
    return this.render(...args);
  }
}
