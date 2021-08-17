import Err from '@lskjs/err';
import Module from '@lskjs/module';

import { I18Instance } from './instances/I18Instance';

export class I18Module extends Module {
  I18Instance = I18Instance;
  locales = [];
  locale = null; // defaultLocale
  instances = {};

  async getT(locale = this.locale) {
    this.log.warn('getT deprecated');
    const instance = await this.instance(locale);
    return instance.t.bind(instance);
  }
  hasInstance(locale) {
    if (!locale) throw new Err('!locale');
    const { locales = [] } = this;
    if (!locales.includes(locale)) return false;
    return true;
  }
  async instance(locale = this.locale, throwError = true) {
    if (!locale) throw new Err('!locale');
    const { locales = [] } = this;
    if (!this.hasInstance(locale)) {
      if (throwError || !this.hasInstance(this.locale)) {
        throw new Err('!locale', 'cant find current locale in locales', { data: { locale, locales } });
      }
      // eslint-disable-next-line no-param-reassign
      locale = this.locale;
    }
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
