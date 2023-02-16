import Base from './MjmlTemplate';

export default class ChangeEmailTemplate extends Base {
  getSubject() {
    return this.t('emails.changeEmail.subject', this.props);
  }

  getText() {
    return `
${this.t('emails.changeEmail.title', this.props)}
${this.t('emails.changeEmail.text', this.props)}
${this.props.link}
    `;
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('emails.changeEmail.title', this.props))}
        ${this.text(this.t('emails.changeEmail.text', this.props))}
        ${this.buttonWithLink(this.t('emails.approveEmail.change'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
