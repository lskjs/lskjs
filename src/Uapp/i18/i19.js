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
  // setLocale = require('./setLocale').default;
  // getLocale = require('./getLocale').default;
  // getI18Params = require('./getI18Params').default;
  // getI18 = require('./getI18').default;
  // initI18 = require('./initI18').default;

  async init(params) {
    console.log('i19 init');
    this.i18 = await this.getI18(params);
    const { locale } = this.i18;
    // const { locales } = this.config;
    // const { lng } = params;
    // let locale = lng ? this.getLocale(lng) : this.getDefaultLocale();
    // if (!locales.includes(locale)) {
    //   locale = locales[0];
    // }
    this.locale = locale;
    // this.i18.locale = locale;
    const m = (...momentArgs) => {
      return moment(...momentArgs).locale(this.i18.locale);
    };
    this.m = m;
    this.t = (...tArgs) => {
      return this.i18.t(...tArgs);
    };
    console.log('i19 init completed');
  }
  getDefaultLocale() {
    let locale;
    if (__SERVER__) {
      if (this.state?.locale) return this.state?.locale;
      if (this.state2?.locale) return this.state2?.locale;
      if (this.user?.locale) return this.user?.locale;
      if (this.req?.cookies?.locale) return this.req?.cookies?.locale;
    }
    if (__CLIENT__) {
      locale = Cookies.get('locale');
      if (locale) return locale;
    }
    if (__CLIENT__) {
      locale = window.navigator.userLanguage || window.navigator.language;
      if (locale) return locale;
    }
    return locale;
  }
  async getI18Params(params) {
    const config = this.config.i18;
    const result = Object.assign({}, config, params);
    if (!result.lng) {
      const defaultLocale = this.getDefaultLocale();
      if (defaultLocale) result.lng = defaultLocale;
    }
    console.log(result, 'result');
    return result;
  }
  async getI18(params) {
    return new Promise(async (resolve, reject) => {
      const i18 = i18next.createInstance();
      const app = this;
      const i18params = this.getI18Params(params);
      if (__CLIENT__ && i18params.backend) {
        i18.use(i18nextXhrBackend);
      }
      if (__DEV__) {
        i18.use({
          type: 'logger',
          log(args) {
            if (args[0] === 'i18next: initialized') return;
            if (args[0] === 'i18next::translator: missingKey') {
              app.log.error(args.join(', '));
            }
          },
          warn(args) {
            app.log.warn(args.join(', '));
          },
          error(args) {
            app.log.error(args.join(', '));
          },
        });
      }
      return i18
        .init(i18params)
        .then(() => {
          return resolve(i18);
        })
        .catch((err) => {
          console.error('i18next.init reject', err);  //eslint-disable-line
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
}

export default I19;

