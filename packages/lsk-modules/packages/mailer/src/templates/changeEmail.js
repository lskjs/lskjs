/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_mjml';

export default class ChangeEmailTemplate extends Base {
  getSubject() {
    return this.t('email.changeEmail.subject', this.props);
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('email.changeEmail.title', this.props))}
        ${this.text(this.t('email.changeEmail.text', this.props))}
        ${this.buttonWithLink(this.t('email.approveEmail.change'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
