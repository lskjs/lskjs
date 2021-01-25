import Module from '@lskjs/module';

import I18Instance from './I18Instance';

export class I18Module extends Module {
  I18Instance = I18Instance;
  locales = [];
  locale = null; // defaultLocale
  instances = {};

  async getT(locale = this.locale) {
    const instance = await this.instance(locale);
    return instance.t;
  }

  async instance(locale = this.locale) {
    if (!locale) throw '!locale';
    if (!this.locales.include(locale)) throw `!locales[${locale}]`;
    if (!this.instances[locale]) {
      this.instances[locale] = await this.I18Instance.createAndRun({ config: { locale } });
    }
    return this.instances[locale];
  }

  async init() {
    await super.init();
    this.locales = this.config.locales || [];
  }

  async update() {
    this.emit('setLanguage', this.locale);
  }

  async changeLanguage(locale) {
    if (!locale) throw '!locale';
    if (!this.locales.include(locale)) throw `!locales[${locale}]`;
    await this.instance.changeLanguage(locale);
    this.locale = locale;
    await this.update();
  }
  async setLocale(locale) {
    await this.changeLanguage(locale);
  }
}

export default I18Module;
