import moment from 'moment';

export default async function (...args) {
  const { locales } = this.config;

  this.i18 = await this.getI18(...args);
  let locale = this.getLocale(args && args[0] && args[0].lng);

  if (!locales.includes(locale)) {
    locale = locales[0];
  }

  this.locale = locale;
  if (__CLIENT__) {
    moment.locale(this.locale);
  }
  const m = (...momentArgs) => {
    return moment(...momentArgs).locale(this.locale);
  };
  this.m = m;
  this.i18.m = m;
  this.t = (...args2) => {
    return (this.i18.t(...args2) || args2[0] || '').replace(/\\n/ig, '\n');
  };
}
