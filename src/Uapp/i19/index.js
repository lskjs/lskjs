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

  constructor(uapp) {
    this.uapp = uapp;
  }

  async init(params) {
    this.i18 = await this.getI18(params);
    const { language: locale } = this.i18;
    this.locale = locale;
    this.m = (...args) => {
      return moment(...args).locale(locale);
    };
    this.t = (...args) => {
      return this.i18.t(...args);
    };
  }
  getDefaultLocale() {
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
      const config = this.uapp.config.i18;
      const result = Object.assign({}, config, params);
      if (!result.lng) {
        const defaultLocale = this.getDefaultLocale();
        if (defaultLocale) result.lng = defaultLocale;
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
    if (locale && this.user && this.user?.locale !== locale) {
      try {
        const { UserStore } = this.stores;
        await UserStore.update({
          _id: this.user?._id,
          locale,
        });
      } catch (err) {
        console.error('uapp.setLocale', err); // eslint-disable-line no-console
      }
    }
    if (Cookies && locale && Cookies.get('locale') !== locale) {
      Cookies.set('locale', locale);
    }
    if (this.t('locale') !== locale) {
      await this.init({
        lng: locale,
      });
    }
  }
  loadNamespaces(...args) {
    return this.i18.loadNamespaces(...args);
  }
}

export default I19;

