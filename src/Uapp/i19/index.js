import Promise from 'bluebird';
import { observable } from 'mobx';
import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import moment from 'moment';

class I19 {
  @observable locale;
  @observable t;
  @observable m;
  @observable i18;

  constructor(props = {}) {
    this.setState(props);
  }
  setState(props = {}) {
    Object.assign(this, props);
    return this;
  }
  getT(locale) {
    const instance = this.instances[locale];
    if (!instance) throw 'i18.getT !instance';

    // return instance.t;
    return (...args) => instance.t(...args);
  }
  async init(params) {
    this.i18 = await this.getI18(params);
    if (this.config.locales) {
      this.locales = this.config.locales;
    }
    if (__SERVER__) {
      this.instances = {};
      Promise.map(this.locales, async (locale) => {
        this.instances[locale] = await this.getI18({ lng: locale });
      });
    }

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
  getI18Locale() {
    let locale;
    if (this.getLocale) locale = this.getLocale();
    const { locales = [] } = this.config;
    if (!locales.includes(locale)) locale = null;
    if (locale) return locale;
    return this.config.lng || 'en';
  }
  getI18Params(params = {}) {
    try {
      const { config } = this;
      const result = {
        ...config,
        ...params,
      };
      if (!params.lng) result.lng = this.getI18Locale();
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
      if (this.config.debug) {
        const { log = console } = this;
        i18.use({
          type: 'logger',
          log(args) {
            if (args[0] === 'i18next: initialized') return;
            if (args[0] === 'i18next: languageChanged') return;
            if (args[0] === 'i18next::translator: missingKey') {
              log.error(args.join(', '));
              return;
            }
            log.trace(args.join(', '));
          },
          warn(args) { log.warn(args.join(', ')); },
          error(args) { log.error(args.join(', ')); },
        });
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

