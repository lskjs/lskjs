import i18next from 'i18next';
import moment from 'moment';
import i18nextXhrBackend from 'i18next-xhr-backend';
import Promise from 'bluebird';

export default class I18 {
  config = {};
  locale = null;
  t = () => null;
  m = () => null;
  i18 = null;

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
    this.instance = await this.getI18(params);
    if (!this.config) console.error('!i18.config'); // eslint-disable-line no-console
    if (this.config && this.config.locales) {
      this.locales = this.config.locales;
    } else {
      this.locales = [];
    }
    if (__SERVER__) {
      this.instances = {};
      if (this.locales) {
        Promise.map(this.locales, async (locale) => {
          this.instances[locale] = await this.getI18({ lng: locale });
        });
      }
    }
    this.initObservable();
  }
  initObservable() {
    const { language: locale } = this.instance;
    this.locale = locale;
    this.m = (...args) => moment(...args).locale(this.locale);
    this.t = (...args) => this.instance.t(...args);
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
      const remoteLocale = this.getI18Locale();
      if (remoteLocale !== result.lng) {
        result.lng = this.getI18Locale() || 'en';
      }
      return result;
    } catch (err) {
      console.error('I18 getI18Params', err);  //eslint-disable-line
      throw err;
    }
  }
  async getI18(params) {
    return new Promise(async (resolve, reject) => {
      const instance = i18next.createInstance();
      const i18params = this.getI18Params(params);
      if (__CLIENT__ && i18params.backend) {
        instance.use(i18nextXhrBackend);
      }
      if (this.config.debug) {
        const { log = console } = this;
        instance.use({
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

      return instance
        .init(i18params)
        .then(() => resolve(instance))
        .catch((err) => {
          console.error('getI18 init', err);  //eslint-disable-line
          return reject(err);
        });
    });
  }
  async setLocale(locale) {
    this.instance.changeLanguage(locale);
    this.initObservable();
  }
  async loadNamespaces(...args) {
    await this.instance.loadNamespaces(...args);
    this.initObservable();
  }
}
