import _ from 'lodash';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';
export default (ctx) => {
  return class Mailer {
    constructor() {
      this.config = _.get(ctx, 'config.mailer');
      this.templates = this.getTemplates();
    }
    getTemplates() {
      return require('./templates').default(ctx);
    }
    async init() {
      const transporter = (this.config && this.config.transport)
        && Promise.promisifyAll(nodemailer.createTransport(this.config.transport));
      this.transporter = transporter;
    }
    async run() {
      if (this.transporter) {
        this.transporter.use('compile', inlineCss());
      }
    }
    // Отправить email
    async send({ to, template, params = {}, options = {} }) {
      try {
        if (!to) throw '!to';
        if (!template) throw '!template';
        if (!this.transporter) throw '!transporter';
        if (!this.templates[template]) throw 'cant find email templete'
        // Ищем шаблон
          // Шаблон это класс, создаем экземпляр
        const emailTemplate = new this.templates[template]({ ctx, params });
        // вызываем render
        const defaultOptions = emailTemplate.getOptions({ ctx, params });
        const html = emailTemplate.render({ ctx, params });
        const options2 = Object.assign({}, this.config.options, defaultOptions, options);
        options2.to = to;
        options2.html = html;
        return this.transporter.sendMailAsync(options2);
      } catch (err) {
        throw err;
      }
      return null;
    }
  };
};
