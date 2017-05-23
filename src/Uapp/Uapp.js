import BaseUapp from 'lego-starter-kit/Uapp';
export default class Uapp extends BaseUapp {

  Api = require('./Api').default;
  Page = require('./Page').default;
  getRoutes() {
    return require('./routes').default;
  }

  async init() {
    await super.init();
    this.stores = this.getStores();
    this.user = new this.stores.User(this);
    this.auth = new this.stores.Auth(this);
  }

  async run() {
    await super.run();
    this.auth.init();
  }

  getStores() {
    return require('./stores').default(this);
  }

  getModules() {
    return {
      ...super.getModules(),
      ...require('~/modules/uapp').default(this), // eslint-disable-line
    };
  }
  //
  // getModels() {
  //   return require('./models').default(this); // eslint-disable-line
  // }

  provide() {
    return {
      ...super.provide(),
      auth: this.auth,
      api: this.api,
      user: this.user,
    };
  }

}
