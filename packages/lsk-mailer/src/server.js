import get from 'lodash/get';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';
import getParser from './parser';
export default (ctx) => {
  const Parser = getParser(ctx);
  return class Mailer {
    getTemplates() {
      return require('./templates').default(ctx);
    }
    async init() {
      // nodemailer
      this.config = get(ctx, 'config.mailer');
      this.templates = this.getTemplates();
      this.transporter = this.getTransporter();
      this.parser = new Parser();
      //parser
      await this.parser.init();
    }

    getTransporter() {
      return (this.config && this.config.transport)
        && Promise.promisifyAll(nodemailer.createTransport(this.config.transport));
    }

    async run() {
      if (this.transporter && this.config.juice) {
        // нельзя прогонять через эту херню html который уже покрыт inline css
        this.transporter.use('compile', inlineCss());
      }
      await this.parser.run();
    }

    // Отправить email
    async send(args) {
      const { to, template, params = {}, options = {}, t: tFunc, locale, ...otherProps } = args;
      const t = tFunc ? tFunc : ctx.i18 && ctx.i18.getFixedT && ctx.i18.getFixedT(locale || 'en') || (a => a);
      try {
        if (!to) throw '!to email';
        if (!template) throw '!template';
        if (!this.transporter) throw '!transporter';
        if (!this.templates[template]) throw 'cant find email template ' + template
        // Ищем шаблон
          // Шаблон это класс, создаем экземпляр
        const args2 = { ctx, t, locale, params, ...otherProps };
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
      if (!from) from = ctx.config.mailer.options.from;
      try {
        return await this.transporter.sendMail({ to, subject, text: message, from });
      } catch (e) {
        throw e;
      }
    }
  };
};
