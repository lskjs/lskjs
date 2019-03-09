/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_mjml';

export default class ApproveEmailTemplate extends Base {
  getSubject() {
    return this.t('email.approveEmail.subject', this.props);
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('email.approveEmail.title', this.props))}
        ${this.text(this.t('email.approveEmail.text', this.props))}
        ${this.buttonWithLink(this.t('common.confirm'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
