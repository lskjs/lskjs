import Module from '@lskjs/module';
import get from 'lodash/get';
import Promise from 'bluebird';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';
import config from './config';

export default class MailerServerModule extends Module {
  name = 'MailerServerModule';
  getTemplates() {
    return require('./templates').default;
  }

  async init() {
    await super.init();
    this.config = {
      ...config,
      ...get(this, 'app.config.mailer', {}),
    };
    if (!this.config) {
      this.log.warn('config.mailer IS EMPTY');
      return;
    }
    this.templates = this.getTemplates();
    this.transporter = this.getTransporter();
  }

  getTransporter() {
    if (this.config && this.config.transport) {
      const transport = nodemailer.createTransport(this.config.transport);
      return Promise.promisifyAll(transport);
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
    return a => {
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

  getTemplateConfig() {
    const assets =
      get(this.app, 'config.client.site.assets') || get(this.app, 'config.about.assets') || '/assets/mailer';
    return {
      logo: this.app.url(`${assets}/logo.png`),
      headerImage: this.app.url(`${assets}/header.png`),
      about: get(this, 'app.config.client.about', {}),
    };
  }

  renderTemplate(params) {
    const { template, props = {}, ...otherProps } = params;
    if (!template) throw this.app.e('mailer.!template');
    const Template = this.templates[template];
    if (!Template) throw this.app.e('mailer.!Template', { template });
    const config = this.getTemplateConfig();
    if (__DEV__) console.log({ config });

    const email = new Template({
      // app: this.app,
      theme: this.theme || this.app.theme,
      log: this.app.log,
      url: this.app.url,
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

  async send(props) {
    const { to, cc, bcc, template, ...otherProps } = props;
    if (!to) throw this.app.e('mailer.!to');
    const options = this.renderTemplate({ template, ...otherProps });
    this.log.trace(`mailer.send [${template}] => ${[to, cc, bcc].filter(Boolean).join(',')}`);
    return this.transporter.sendMail({
      to,
      cc,
      bcc,
      ...options,
    });
  }

  async sendTo(params1 = {}, params2 = {}) {
    const { User: UserModel } = this.app.models;
    if (!params1.user && !params1.userId) throw this.app.e('mailer.!userId');

    const user = params1.user || (await UserModel.findById(params1.userId));
    if (!user) throw this.app.e('mailer.!user');
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
