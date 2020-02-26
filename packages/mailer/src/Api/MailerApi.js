import Api from '@lskjs/server-api';

export default class MailerApi extends Api {
  getRoutes() {
    return {
      '/dev/:type/:template': ::this.dev,
    };
  }
  async dev(req, res) {
    const mailer = await this.app.module('mailer');
    if (!mailer) throw '!mailer';
    const {
      data: { email, ...data },
      params: { template, type },
    } = req;
    if (type === 'email') {
      if (!email) throw '!email';
      return mailer.send({ ...data, template, to: email });
    }
    const options = mailer.renderTemplate({ ...data, template });
    if (type === 'email') {
      return res.send(options.html);
    }
    return options;
  }
}
