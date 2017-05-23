export default class Template {
  getOptions() {
    return {};
  }
  renderHead() {
    return `
    <head>
      <meta charset="UTF-8">
      <title></title>
      <link href="http://hi-jay.eu/mails/mail.css" rel="stylesheet" type="text/css" media="all">
    </head>
    `;
  }
  renderFooter() {
    return ``;
    return `
    <div class="footer1">
      <p>Напиши на <a href="mailto:support@hi-jay.eu">support@hi-jay.eu</a>, если у тебя возникли проблемы с использованием «Hi, Jay!», мы обязательно тебе поможем.
      <p>С уважением, команда «Hi, Jay!».
      <p><a href="http://www.hi-jay.eu" target="_blank">www.hi-jay.eu</a>
    </div>
    `;
  }
  renderContent() {
    return `
    Base Sample Email
    `;
  }
  renderBody({ params }) {
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
            <div class="header">Привет!</div>
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
    return `
    <!DOCTYPE html>
    <html lang="en">
      ${this.renderHead(params)}
      ${this.renderBody(params)}
    </html>
    `;
  }
}
