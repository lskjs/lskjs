/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import Base from './_mjml';

export default class RecoveryTemplate extends Base {
  getSubject() {
    return this.t('email.recovery.subject', this.props);
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('email.recovery.title', this.props))}
        ${this.text(this.t('email.recovery.text', this.props))}
      `)}
      ${this.footer()}
    `;
  }
}
