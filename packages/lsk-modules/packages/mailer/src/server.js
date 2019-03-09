import get from 'lodash/get';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';

export default ctx => class Mailer {
  getTemplates() {
    return require('./templates').default(ctx);
  }

  async init() {
    console.log('mailer init@@@@@asdasd ');
    this.config = get(ctx, 'config.mailer');
    this.templates = this.getTemplates();
    this.transporter = this.getTransporter();
  }

  getTransporter() {
    if (this.config && this.config.transport) {
      return Promise.promisifyAll(nodemailer.createTransport(this.config.transport));
    }
  }

  async run() {
    if (this.transporter && this.config.juice) {
      // нельзя прогонять через эту херню html который уже покрыт inline css
      this.transporter.use('compile', inlineCss());
    }
    // if (__DEV__) {
    ctx.app.use('/api/module/mailer/debug', require('./api/debug').default(ctx, this));
    // }
  }

  getUserMailerParams(user) {
    return {
      to: user.email,
      locale: user.locale,
      user,
      t: user.getT ? user.getT() : ctx.i18.t,
    };
  }

  // Отправить email
  async renderTemplate(props) {
    const {
      to, template, params = {}, options = {}, t: tFunc, locale, ...otherProps
    } = props;
    const t = tFunc || ctx.i18 && ctx.i18.getFixedT && ctx.i18.getFixedT(locale || 'en') || (a => a);
    if (!template) throw '!template';
    if (!this.templates[template]) throw `cant find email template ${template}`;
    const args2 = {
      ctx, t, locale, params, ...otherProps,
    };
    const emailTemplate = new this.templates[template](args2);
    // вызываем render
    const defaultOptions = emailTemplate.getOptions(args2);
    const html = emailTemplate.getHtml(args2);
    const text = emailTemplate.getText && emailTemplate.getText(args2) || '';
    const sendOptions = Object.assign({}, this.config.options, defaultOptions, options);
    sendOptions.to = to;
    sendOptions.html = html;
    sendOptions.text = text;
    return sendOptions;
  }


  // Отправить email
  async send(args) {
    const {
      to, template, params = {}, options = {}, t: tFunc, locale, ...otherProps
    } = args;
    const t = tFunc || ctx.i18 && ctx.i18.getFixedT && ctx.i18.getFixedT(locale || 'en') || (a => a);
    try {
      if (!to) throw '!to email';
      if (!template) throw '!template';
      if (!this.transporter) throw '!transporter';
      if (!this.templates[template]) throw `cant find email template ${template}`;
      // Ищем шаблон
      // Шаблон это класс, создаем экземпляр
      const args2 = {
        ctx, t, locale, params, ...otherProps,
      };
      const emailTemplate = new this.templates[template](args2);
      // вызываем render
      const defaultOptions = emailTemplate.getOptions(args2);
      const html = emailTemplate.getHtml(args2);
      const text = emailTemplate.getText && emailTemplate.getText(args2) || '';
      const sendOptions = Object.assign({}, this.config.options, defaultOptions, options);
      sendOptions.to = to;
      sendOptions.html = html;
      sendOptions.text = text;
      return await this.transporter.sendMail(sendOptions);
    } catch (err) {
      throw err;
    }
    return null;
  }

  async sendText(to, subject, message, from) {
    try {
      return await this.transporter.sendMail({
        to,
        subject,
        text: message,
        from: from || get(ctx, 'config.mailer.options.from'),
      });
    } catch (e) {
      throw e;
    }
  }

  async sendUser(data = {}, params = {}) {
    const { User } = ctx.models;
    if (!data.user && !data.userId) throw '!mailer.sendUser(userId)';

    const user = data.user || await User.findById(data.userId);
    if (!user) throw '!mailer.sendUser(user)';

    const params2 = this.getUserMailerParams(user);
    if (!params2.to) return false;
    if (!params2.bcc) return false;
    // console.log('user.getMailerParams()', user.getMailerParams());
    return this.send({
      ...params2,
      ...params,
    });
  }
};
