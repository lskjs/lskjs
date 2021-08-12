import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import get from 'lodash/get';

export class MailerApi extends Api {
  getRoutes() {
    return {
      '/test/:type/:template': this.test.bind(this),
    };
  }
  async test(req, res) {
    if (!isDev) throw new Err('!isDev');
    const mailer = await this.app.module('mailer');
    if (!mailer) throw '!mailer';
    const {
      data: { email, ...data },
      params: { template, type },
    } = req;

    const devProps = get(
      mailer.devProps || mailer.testProps,
      template,
      get(mailer, `templates.${template}.testProps`, {}),
    );
    const props = { ...devProps, ...data };
    const params = { props, template };
    if (type === 'email') {
      if (!email) throw '!email';
      return mailer.send({ ...params, to: email });
    }
    const options = mailer.renderTemplate(params);
    if (type === 'html') {
      return res.send(options.html);
    }
    return options;
  }
}

export default MailerApi;
