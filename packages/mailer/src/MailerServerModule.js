import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';

import defaultTemplates from './templates';

export default class MailerServerModule extends Module {
  getTemplates() {
    return defaultTemplates;
  }

  async init() {
    await super.init();
    this.templates = this.getTemplates();
    this.transporter = this.getTransporter();
  }

  getTransporter() {
    if (this.config && this.config.transport) {
      const transport = nodemailer.createTransport(this.config.transport);
      return Bluebird.promisifyAll(transport);
    }
    return null;
  }

  async run() {
    await super.run();
    if (this.transporter && this.config.juice) {
      // нельзя прогонять через эту херню html который уже покрыт inline css
      this.transporter.use('compile', inlineCss());
    }
  }

  getUserParams(user) {
    const { locale = 'en' } = user;
    return {
      to: user.email,
      locale,
      user,
    };
  }

  getT(props = {}) {
    if (this.app.i18 && this.app.i18.getT) {
      return this.app.i18.getT(props.locale || 'en');
    }
    return (a) => {
      this.app.log.error('!Mailer.getT');
      return a;
    };
  }

  getTemplateOptions(email) {
    const options = {};
    if (email.getSubject) {
      const subject = email.getSubject();
      if (subject) options.subject = subject;
    }
    if (email.getHtml) {
      const html = email.getHtml();
      if (html) options.html = html;
    }
    if (email.getText) {
      const text = email.getText();
      if (text) options.text = text;
    }
    return options;
  }

  url(str) {
    return this.app ? this.app.url(str) : str;
  }

  assetsUrl(str) {
    const assets =
      get(this.app, 'config.client.site.assets') || get(this.app, 'config.about.assets') || '/assets/mailer';
    return this.url(assets + str);
  }

  getTemplateConfig() {
    return {
      logo: this.assetsUrl(`/logo.png`),
      headerImage: this.assetsUrl(`/header.png`),
      ...get(this, 'app.config.client.about', {}),
    };
  }

  renderTemplate(params) {
    const { template, props = {}, ...otherProps } = params;
    if (!template) throw new Err('mailer.!template');
    const Template = this.templates[template];
    if (!Template) throw new Err('mailer.!Template', { template });
    // eslint-disable-next-line no-shadow
    const config = this.getTemplateConfig();
    const email = new Template({
      // app: this.app,
      mailer: this,
      theme: this.theme || this.app.theme,
      log: this.app.log,
      t: this.getT(otherProps.locale),
      config,
      props,
      ...otherProps,
    });
    return {
      ...(this.config.options || {}),
      ...this.getTemplateOptions(email),
    };
  }
  canSend() {
    return true;
  }
  async send(props) {
    const { to, cc, bcc, template, ...otherProps } = props;
    if (!this.canSend(to)) throw new Err('mailer.canSend');
    if (!to) throw new Err('mailer.!to');
    const options = this.renderTemplate({ template, ...otherProps });
    this.log.trace(`send [${template}] => ${[to, cc, bcc].filter(Boolean).join(',')}`);
    return this.transporter.sendMail({
      to,
      cc,
      bcc,
      ...options,
    });
  }

  async sendTo(params1 = {}, params2 = {}) {
    const { User: UserModel } = this.app.models;
    if (!params1.user && !params1.userId) throw new Err('mailer.!userId');

    const user = params1.user || (await UserModel.findById(params1.userId));
    if (!user) throw new Err('mailer.!user');
    const userParams = this.getUserParams(user);
    const props = {
      me: user,
      ...(params2.props || {}),
    };
    return this.send({
      ...userParams,
      ...params2,
      props,
    });
  }
}
