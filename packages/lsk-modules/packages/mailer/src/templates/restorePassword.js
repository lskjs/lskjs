/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_base';

export default class RestorePasswordTemplate extends Base {
  getSubject() {
    return this.t('email.restorePassword.subject', this.props);
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('email.restorePassword.title', this.props))}
        ${this.text(this.t('email.restorePassword.text', this.props))}
        ${this.buttonWithLink(this.t('email.restorePassword.change'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
