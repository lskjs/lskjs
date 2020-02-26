import Api from '@lskjs/server-api';

export default class MailerApi extends Api {
  getRoutes() {
    return {
      '/dev/html/:template': ::this.devHtml,
      '/dev/email/:template': ::this.devEmail,
    };
  }
  devHtml() {
    return 'devHtml';
  }
  devEmail() {
    return 'devEmail';
  }
}
