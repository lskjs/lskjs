import _ from 'lodash';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';
export default (ctx) => {
  return class Mailer {
    getTemplates() {
      return require('./templates').default(ctx);
    }
    async init() {
      this.config = _.get(ctx, 'config.mailer');
      this.templates = this.getTemplates();
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
    async send(args) {
      const { to, template, params = {}, options = {} } = args;
      try {
        if (!to) throw '!to email';
        if (!template) throw '!template';
        if (!this.transporter) throw '!transporter';
        if (!this.templates[template]) throw 'cant find email template'
        // Ищем шаблон
          // Шаблон это класс, создаем экземпляр
        const emailTemplate = new this.templates[template]({ ctx, params });
        // вызываем render
        const defaultOptions = emailTemplate.getOptions({ ctx, params });
        const html = emailTemplate.getHtml({ ctx, params });
        const options2 = Object.assign({}, this.config.options, defaultOptions, options);
        options2.to = to;
        options2.html = html;
        options2.text = '';
        console.log({options2});
        const res = await this.transporter.sendMailAsync(options2);
        console.log({res});
        return res
      } catch (err) {
        throw err;
      }
      return null;
    }
  };
};
