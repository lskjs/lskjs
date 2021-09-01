import { isClient } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';

export class I18Instance extends Module {
  instance = null;
  locale = null;
  t = () => '???';
  async init() {
    await super.init();
    this.instance = await this.createInstance();
  }
  async run() {
    await super.run();
    await this.update();
  }
  async initResources() {
    if (isClient) return;
    if (this.resources) return;
    const { resources } = this.config;
    this.resources = await asyncMapValues(resources, (value) => {
      // eslint-disable-next-line no-param-reassign
      if (typeof value === 'string') value = { translation: value };
      return asyncMapValues(value, (path) => JSON.parse(require('fs').readFileSync(path)));
    });
  }
  async exists(...args) {
    if (!this.instance) throw new Err('!this.instance');
    return this.instance.exists(...args);
  }
  async update() {
    if (!this.instance) throw new Err('!this.instance');
    this.locale = this.instance.language;
    this.t = (...args) => this.instance.t(...args);
  }
  applyLogger(instance) {
    const moduleLog = this.log;
    instance.use({
      type: 'logger',
      log(args) {
        if (args[0] === 'i18next: initialized') {
          moduleLog.trace(args.join(', '));
          return;
        }
        if (args[0] === 'i18next: languageChanged') {
          moduleLog.trace(args.join(', '));
          return;
        }
        if (args[0] === 'i18next::translator: missingKey') {
          moduleLog.error(args.join(', '));
          return;
        }
        moduleLog.trace(args.join(', '));
      },
      warn(args) {
        moduleLog.warn(args.join(', '));
      },
      error(args) {
        moduleLog.error(args.join(', '));
      },
    });
  }
  async createInstance() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const instance = i18next.createInstance();
      if (this.debug) this.applyLogger(instance);
      const { lng, locale, backend, resources, ...props } = this.config;
      props.lng = lng || locale || 'en';
      if (isClient) {
        if (backend) {
          this.log.trace('use i18nextXhrBackend');
          props.backend = backend;
          instance.use(i18nextXhrBackend);
        }
      } else {
        await this.initResources();
        props.resources = this.resources;
      }
      return instance
        .init(props)
        .then(() => resolve(instance))
        .catch((err) => {
          this.log.error('init', err);
          return reject(err);
        });
    });
  }
  async loadNamespaces(...args) {
    if (this.instance) {
      await this.instance.loadNamespaces(...args);
      await this.update();
    } else {
      this.log.error('!this.instance!');
    }
  }
  async changeLanguage(...args) {
    if (this.instance) {
      await this.instance.changeLanguage(...args);
      await this.update();
    } else {
      this.log.error('!this.instance!');
    }
  }
}

export default I18Instance;
