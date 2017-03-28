import _ from 'lodash';
import nodemailer from 'nodemailer';
import inlineCss from 'nodemailer-juice';
import getTemplates from './templates/templates';
export default (ctx) => {
  const { e500 } = ctx.errors;
  const Templates = getTemplates(ctx);
  class Mailer {
    constructor() {
      const transporter = (ctx.config.mail && ctx.config.mail.transport)
    && Promise.promisifyAll(nodemailer.createTransport(ctx.config.mail.transport));
      if (transporter) {
        transporter.use('compile', inlineCss());
      }
      this.transporter = transporter;
    }
    defaultOptions = _.get(ctx, 'config.mail.options') || {
      subject: 'lsk-example',
    }
    getOptions(type = '') {
      if (type && Templates[type] && Templates[type].getOptions) {
        return Templates[type].getOptions();
      }
      return {};
    }
    async send({ to, type = 'example', options = {}, params = {} }) {
      try {
        const html = await ctx.mailer.render(type, params);
        options = Object.assign({}, this.defaultOptions, this.getOptions(type), options);
        if (html) {
          options.html = html;
        }
        if (to) options.to = to;
        return this.transporter.sendMailAsync(options);
      } catch (err) {
        throw e500(err);
      }
    }
    async render(type = 'example', params = {}) {
      return Templates[type].render({ params });
    }
  }
  return new Mailer();
};
