
export default async function (...args) {
  this.i18 = await this.getI18(...args);
  if (__CLIENT__) {
    const moment = require('moment');
    const { locales } = this.config;
    let locale = this.getLocale(args && args[0] && args[0].lng);

    if (!locales.includes(locale)) {
      locale = locales[0];
    }

    this.locale = locale;

    this.i18.locale = locale;
    moment.locale(locale);
    const m = (...momentArgs) => {
      return moment(...momentArgs).locale(this.i18.locale);
    };
    this.i18.m = m;
  }
  this.t = (...args2) => {
    return (this.i18.t(...args2) || args2[0] || '').replace(/\\n/ig, '\n');
  };
}
