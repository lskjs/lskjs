import MjmlTemplate from './MjmlTemplate';

export default class RawTemplate extends MjmlTemplate {
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
