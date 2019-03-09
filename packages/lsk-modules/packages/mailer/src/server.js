import get from 'lodash/get';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';

export default app => class Mailer {
  getTemplates() {
    return require('./templates').default(app);
  }

  async init() {
    this.config = get(app, 'config.mailer');
    this.templates = this.getTemplates();
    this.transporter = this.getTransporter();
  }

  getTransporter() {
    if (this.config && this.config.transport) {
      return Promise.promisifyAll(nodemailer.createTransport(this.config.transport));
    }
    return null;
  }

  async run() {
    if (this.transporter && this.config.juice) {
      // нельзя прогонять через эту херню html который уже покрыт inline css
      this.transporter.use('compile', inlineCss());
    }
  }

  getUserMailerParams(user) {
    const { locale = 'en' } = user;
    return {
      to: user.email,
      locale,
      user,
    };
  }

  getT(props) {
    if (app.i18 && app.i18.getT) {
      return app.i18.getT(props.locale || 'en');
    }
    return (a) => { app.log.error('!Mailer.getT'); return a; };
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

  renderTemplate(params) {
    const {
      template, props = {}, ...otherProps
    } = params;
    if (!template) throw app.e('mailer.!template');
    const Template = this.templates[template];
    if (!Template) throw app.e('mailer.!Template', { template });
    const email = new Template({
      theme: this.theme,
      log: app.log,
      url: app.url,
      t: this.getT(otherProps.locale),
      props,
      ...otherProps,
    });
    return {
      ...this.config.options,
      ...this.getTemplateOptions(email),
    };
  }

  async send(props) {
    const {
      to, cc, bcc, ...other
    } = props;
    if (!to) throw app.e('mailer.!to');
    const options = this.renderTemplate(other);
    console.log({
      to,
      cc,
      bcc,
      ...options,
    });

    return this.transporter.sendMail({
      to,
      cc,
      bcc,
      ...options,
    });
  }

  async sendTo(props = {}, params = {}) {
    const { User } = app.models;
    if (!props.user && !props.userId) throw app.e('mailer.!userId');

    const user = props.user || await User.findById(props.userId);
    if (!user) throw app.e('mailer.!user');
    const userParams = this.getUserMailerParams(user);
    console.log({ user, userParams });


    return this.send({
      ...userParams,
      ...params,
    });
  }
};
