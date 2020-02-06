/* eslint-disable indent */
import Base from './_mjml';

export default class RawTemplate extends Base {
  getSubject() {
    return this.props.subject;
  }

  getText() {
    return `
    ${this.props.html || this.props.text}
    `;
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.props.html || this.props.text}
      `)}
      ${this.footer()}
    `;
  }
}
