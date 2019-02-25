import { observable } from 'mobx';
import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import moment from 'moment';
import Cookies from 'js-cookie';

class I19 {
  @observable locale;
  @observable t;
  @observable m;
  @observable i18;

  constructor(props = {}) {
    Object.assign(this, props);
  }
  async init(params) {
    this.i18 = await this.getI18(params);
    this.initObservable();
  }
  initObservable() {
    const { language: locale } = this.i18;
    this.locale = locale;
    this.m = (...args) => {
      return moment(...args).locale(this.locale);
    };
    this.t = (...args) => {
      return this.i18.t(...args);
    };
  }
  getLocale() {

    return 'en';
  }
  getI18Params(params) {
    try {
      const { config } = this.config;
      const result = {
        ...config,
        ...params,
      };
      const locale = this.getLocale();
      if (locale) {
        result.lng = locale;
      }
      return result;
    } catch (err) {
      console.error('I19 geti18Params', err);  //eslint-disable-line
      throw err;
    }
  }
  async getI18(params) {
    return new Promise(async (resolve, reject) => {
      const i18 = i18next.createInstance();
      const i18params = this.getI18Params(params);
      if (__CLIENT__ && i18params.backend) {
        i18.use(i18nextXhrBackend);
      }
      return i18
        .init(i18params)
        .then(() => {
          return resolve(i18);
        })
        .catch((err) => {
          console.error('getI18 init', err);  //eslint-disable-line
          return reject(err);
        });
    });
  }
  async setLocale(locale) {
    this.i18.changeLanguage(locale);
    this.initObservable();
  }
  async loadNamespaces(...args) {
    await this.i18.loadNamespaces(...args);
    this.initObservable();
  }
}

export default I19;

