/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_mjml';

export default class SignupTemplate extends Base {
  getSubject() {
    return this.t('emails.signup.subject', this.props);
  }

  getText() {
    return `
${this.t('emails.signup.title', this.props)}
${this.t('emails.signup.text', this.props)}
${this.props.link}
    `;
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('emails.signup.title', this.props))}
        ${this.text(this.t('emails.signup.text', this.props))}
        ${this.buttonWithLink(this.t('emails.signup.button'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
