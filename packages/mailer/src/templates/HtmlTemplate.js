import get from 'lodash/get';

export default class HtmlTemplate {
  config = {};
  theme = {};

  constructor(params = {}) {
    Object.assign(this, params);
  }

  url(str) {
    return this.mailer ? this.mailer.url(str) : str;
  }

  assetsUrl(str) {
    return this.mailer ? this.mailer.assetsUrl(str) : str;
  }

  getTheme(name, defaultValue = '') {
    const value = get(this, `theme.${name}`);
    if (typeof value === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('Template.getTheme not found:', name);
      return defaultValue;
    }
    return value;
  }

  getUnsubscribeEvent() {
    return null;
  }
  getUnsubscribeLink() {
    const event = this.getUnsubscribeEvent();
    let url = `/api/mailer/unsubscribe`;
    if (event) {
      url += `?event=${event}`;
    }
    return event ? this.url(url) : null;
  }

  getSubject() {
    return null;
  }

  getText() {
    return null;
  }

  getHtml() {
    return this.render();
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
