import { observable } from 'mobx';


class I19 {
  @observable locale;
  @observable t;
  @observable m;

  constructor(uapp) {
    this.uapp = uapp;
  }
  setLocale = require('./setLocale').default;
  getLocale = require('./getLocale').default;
  getI18Params = require('./getI18Params').default;
  getI18 = require('./getI18').default;
  initI18 = require('./initI18').default;

  async init(...args) {
  }
  async init2(...args) {
    this.i18 = await this.getI18(...args);
    if (__CLIENT__) {
      const moment = require('moment');
      const { locales } = this.config;
      let locale = this.getLocale(args && args[0] && args[0].lng);

      if (!locales.includes(locale)) {
        locale = locales[0];
      }

      this.locale = locale;

      this.i18.locale = observable.box(locale);
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
}

export default I19;

