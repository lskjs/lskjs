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
    let locale;
    if (__SERVER__) {
      if (this.uapp?.state?.locale) return this.uapp.state.locale;
      if (this.uapp?.state2?.locale) return this.uapp.state2.locale;
      if (this.uapp?.user?.locale) return this.uapp.user.locale;
      if (this.uapp?.req?.cookies?.locale) return this.uapp.req.cookies.locale;
    }
    if (__CLIENT__) {
      locale = Cookies.get('locale');
      if (locale) return locale;
      locale = window.navigator.userLanguage || window.navigator.language;
      if (locale) return locale;
    }
    return 'en';
  }
  getI18Params(params) {
    try {
      const { config } = this;
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
      console.log(i18params, 'i18params');
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
    console.log('setLocale', this.onSetLocale);
    if (this.onSetLocale) {
      await this.onSetLocale(locale);
    }
  }
  async loadNamespaces(...args) {
    await this.i18.loadNamespaces(...args);
    this.initObservable();
  }
}

export default I19;

