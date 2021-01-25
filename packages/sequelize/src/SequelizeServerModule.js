import Module from '@lskjs/module';
import get from 'lodash/get';
import merge from 'lodash/merge';
import Sequelize from 'sequelize';

export default class SequelizeServerModule extends Module {
  enabled = false;
  Sequelize = Sequelize;
  config = {
    options: {
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 50000,
        evict: 50000,
        handleDisconnects: true,
      },
    },
  };

  async getConfig() {
    return merge(
      //
      {},
      await super.getConfig(),
      get(this, 'config', {}),
      get(this, '__config', {}),
    );
  }

  async init() {
    await super.init();
    if (!this.config.uri) {
      await this.log.warn('!uri ignore module');
      return;
    }
    this.client = new Sequelize(this.config.uri, this.config.options);
    this.models = this.getModels();
    await this.client.authenticate();
  }
  getModels() {
    return {};
  }
  async run() {
    if (!this.client) {
      await this.log.warn('!client ignore module');
      return;
    }
    await this.client.sync();
  }
}
