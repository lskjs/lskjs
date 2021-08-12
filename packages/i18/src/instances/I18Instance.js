import Err from '@lskjs/err';
import Module from '@lskjs/module';
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
    return new Promise((resolve, reject) => {
      const instance = i18next.createInstance();
      if (this.debug) this.applyLogger(instance);
      const { lng, locale, ...props } = this.config;
      props.lng = lng || locale || 'en';
      if (typeof window !== 'undefined' && props.backend) {
        instance.use(i18nextXhrBackend);
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
