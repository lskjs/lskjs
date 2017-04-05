
export default class Provider {
  static v = 2;
  constructor(props = {}) {
    Object.assign(this, props);
    this.log = this.getLogger();
  }

  getLogger(params) {
    if (this.app.log) {
      return this.app.log;
    }
    console.error('bunyan log not found');
    return {
      info: (...args) => { console.log('[LOGGER]', ...args); },
      error: (...args) => { console.error('[ERROR]', ...args); },
    };
  }

  initV2(props = {}) {
    Object.assign(this, props);
    if (!this.page) {
      this.page = new this.Page({}, { uapp: this });
    } else {
      // @TODO:  update page
    }
    return {
      uapp: this,
      page: this.page,
      Page: this.Page,
    };
  }

  provide() {
    return {
      uapp: this,
      log: this.log,
      config: this.config,
    };
  }
}
