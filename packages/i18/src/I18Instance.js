import Module from '@lskjs/module';
import Err from '@lskjs/err';
import i18next from 'i18next';

export class I18InstanceModule extends Module {
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
    instance.use({
      type: 'logger',
      log(args) {
        if (args[0] === 'i18next: initialized') {
          this.log.trace(args.join(', '));
          return;
        }
        if (args[0] === 'i18next: languageChanged') {
          this.log.trace(args.join(', '));
          return;
        }
        if (args[0] === 'i18next::translator: missingKey') {
          this.log.error(args.join(', '));
          return;
        }
        this.log.trace(args.join(', '));
      },
      warn(args) {
        this.log.warn(args.join(', '));
      },
      error(args) {
        this.log.error(args.join(', '));
      },
    });
  }
  async createInstance() {
    return new Promise((resolve, reject) => {
      const instance = i18next.createInstance();
      if (this.debug) this.applyLogger(instance);
      const { lng, locale, ...props } = this.config;
      props.lng = lng || locale || 'en';
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
      console.log('!this.instance!');
    }
  }
}

export default I18InstanceModule;
