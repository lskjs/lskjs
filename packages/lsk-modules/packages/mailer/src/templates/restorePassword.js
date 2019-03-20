/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_mjml';

export default class RestorePasswordTemplate extends Base {
  getSubject() {
    return this.t('emails.restorePassword.subject', this.props);
  }

  getText() {
    return `
${this.t('emails.restorePassword.title', this.props)}
${this.t('emails.restorePassword.text', this.props)}
${this.props.link}
    `;
  }

  render() {
    console.log('EMMAIL', this.props);
    
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('emails.restorePassword.title', this.props))}
        ${this.text(this.t('emails.restorePassword.text', this.props))}
        ${this.buttonWithLink(this.t('emails.restorePassword.button'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
