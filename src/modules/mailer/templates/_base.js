export default class Template {
  getOptions() {
    return {};
  }
  head() {
    return `
    <head>
    </head>
    `;
  }
  body() {
    return `
    <body>
    </body>
    `;
  }
  render(params = {}) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      ${this.head(params)}
      ${this.body(params)}
    </html>
    `;
  }
}
