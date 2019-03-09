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
      t: user.getT ? user.getT() : this.getT({ locale }),
    };
  }

  getT(props) {
    if (app.i18 && app.i18.getT) {
      return app.i18.getT(props.locale || 'en');
    }
    return a => a;
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

  renderTemplate(props) {
    const {
      to, template, params = {}, options = {}, ...otherProps
    } = props;
    if (!to) throw app.e('errors.mailer.!to');
    if (!template) throw app.e('errors.mailer.!template');
    const Template = this.templates[template];
    if (!Template) throw app.e('errors.mailer.!Template', { template });

    const email = new Template({
      app,
      url: app.url,
      t: otherProps.t || this.getT(otherProps),
      props: params,
      ...otherProps,
    });
    return {
      ...this.config.options,
      ...this.getTemplateOptions(email),
      ...options,
    };
  }

  async send(props) {
    const sendOptions = this.getTemplateOptions(props);
    return this.transporter.sendMail(sendOptions);
  }

  async sendTo(props = {}, params = {}) {
    const { User } = app.models;
    if (!props.user && !props.userId) throw app.e('errors.mailer.!userId');

    const user = props.user || await User.findById(props.userId);
    if (!user) throw app.e('errors.mailer.!user');

    return this.send({
      ...this.getUserMailerParams(user),
      ...params,
    });
  }
};
