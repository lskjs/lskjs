import Api from './Api';

import AuthStore from './AuthStore';
import UserStore from './UserStore';
import Page from './Page';
import getModules from '~/modules/index.uapp';

import BaseUapp from 'lego-starter-kit/Uapp';
export default class Uapp extends BaseUapp {

  Page = Page;
  getRoutes() {
    return require('./routes').default;
  }

  async init() {
    await super.init();
    this.api = new Api(this.config && this.config.api || {});
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.models = this.getModels();
    this.stores = this.getStores();
  }

  async run() {
    await super.run();
    this.auth.init();
  }

  getStores() {
    return require('./stores').default(this); // eslint-disable-line
  }

  getModules() {
    return {
      ...super.getModules(),
      ...getModules(this),
    };
  }

  getModels() {
    return require('./models').default(this); // eslint-disable-line
  }

  provide() {
    return {
      ...super.provide(),
      auth: this.auth,
      api: this.api,
      user: this.user,
    };
  }

}
