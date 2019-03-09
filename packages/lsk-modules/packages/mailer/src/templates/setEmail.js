/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_base';

export default class SetEmailTemplate extends Base {
  getSubject() {
    return this.t('email.setEmail.subject', this.props);
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('email.setEmail.title', this.props))}
        ${this.text(this.t('email.setEmail.text', this.props))}
        ${this.buttonWithLink(this.t('email.setEmail.continue'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
