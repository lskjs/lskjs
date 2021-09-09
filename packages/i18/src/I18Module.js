import Err from '@lskjs/err';
import Module from '@lskjs/module';

import { I18Instance } from './instances/I18Instance';

const defaultLocale = 'en';

const instanceMock = {
  local: 'mock',
  t: (a) => a,
  exists: () => false,
};
export class I18Module extends Module {
  I18Instance = I18Instance;
  locales = [];
  locale = defaultLocale;
  instances = {};

  async getT(locale = this.locale) {
    this.log.warn('getT deprecated');
    const instance = await this.instance(locale);
    return instance.t.bind(instance);
  }
  hasInstance(locale) {
    if (!locale) throw new Err('!locale', { locale });
    const { locales = [] } = this;
    if (!locales.includes(locale)) return false;
    return true;
  }
  async instance(initLocaleOrLocales = this.locale, options = true) {
    if (options === true || options === false) {
      // eslint-disable-next-line no-param-reassign
      options = { throwError: options };
    }
    const { throwError, anyLocale } = options;
    let localeOrLocales = initLocaleOrLocales;
    // eslint-disable-next-line no-param-reassign
    if (!localeOrLocales) localeOrLocales = defaultLocale;
    // this.log.trace('instance()', localeOrLocales);
    if (!localeOrLocales) throw new Err('!locale', { locale: localeOrLocales });
    const { locales = [] } = this;
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(localeOrLocales)) localeOrLocales = [localeOrLocales];

    // eslint-disable-next-line no-param-reassign
    localeOrLocales = localeOrLocales.filter((locale) => this.hasInstance(locale));

    // if (!localeOrLocales.length) {
    if (!localeOrLocales.length) {
      if (anyLocale) {
        if (this.locales.length) {
          localeOrLocales = this.locales;
        }
        return instanceMock;
      }
      if (throwError) {
        throw new Err('!locale', 'cant find current locale in locales', {
          data: { locale: initLocaleOrLocales, locales },
        });
      } else {
        return null;
      }
    }

    // }
    const locale = localeOrLocales[0];
    if (this.instances[locale]) return this.instances[locale];
    const instance = await this.I18Instance.start({
      config: { ...(this.config || {}), locale },
    });
    this.instances[locale] = instance;
    return instance;
  }

  async init() {
    await super.init();
    this.locales = (this.config || {}).locales || [];
    if (this.debug) this.log.trace('locales', this.locales);
  }

  async update() {
    this.emit('setLanguage', this.locale);
  }

  async changeLanguage(locale) {
    if (!locale) throw new Err('!locale');
    const { locales = [] } = this;
    if (!locales.includes(locale)) {
      throw new Err('!locale', 'cant find currecnt locale in locales', { data: { locale } });
    }
    await this.instance.changeLanguage(locale);
    this.locale = locale;
    await this.update();
  }
  async setLocale(locale) {
    await this.changeLanguage(locale);
  }
}

export default I18Module;
