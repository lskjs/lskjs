import getMailer from 'lsk-mailer/server';
import nodemailer from 'nodemailer';
// import sesTransport from 'nodemailer-ses-transport';

export default (ctx) => {
  return class Mailer extends getMailer(ctx) {
    getTemplates() {
      return {
        ...super.getTemplates(),
        ...require('./templates').default(ctx),
      };
    }

    getTransporter() {
      // if (this.config.transportType === 'ses') {
      //   return nodemailer.createTransport(sesTransport(this.config.transport));
      // }
      return nodemailer.createTransport(this.config.transport);
    }

    async run() {
      await super.run();
      ctx.app.use('/api/module/mailer/debug', require('./api/debug').default(ctx, this));
    }


    getMailerParams(user) {
      return {
        to: user.email,
        locale: user.locale,
        user,
        t: user.getT ? user.getT() : ctx.i18.t,
      };
    }
    // Отправить email
    async renderTemplate(props) {
      const { to, template, params = {}, options = {}, t: tFunc, locale, ...otherProps } = props;
      const t = tFunc || ctx.i18 && ctx.i18.getFixedT && ctx.i18.getFixedT(locale || 'en') || (a => a);
      if (!template) throw '!template';
      if (!this.templates[template]) throw `cant find email template ${template}`;
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
      return sendOptions;
    }


    async sendUser(data = {}, params = {}) {
      const { User } = ctx.models;
      if (!data.user && !data.userId) throw '!mailer.sendUser(userId)';

      let user = data.user || await User.findById(data.userId);
      if (!user) throw '!mailer.sendUser(user)';
      // console.log('user', user);
      if (!user.getMailerParams) {
        user = await User.findById(data.userId);
        if (!user.getMailerParams) {
          // console.log('!user.getMailerParams', user.getMailerParams);
          return false;
        }
      }
      const params2 = user.getMailerParams();
      if (!params2.to) return false;
      if (!params2.bcc) return false;
      // console.log('user.getMailerParams()', user.getMailerParams());
      return this.send({
        ...params2,
        ...params,
      });
    }
  };
};
