import Module from '@lskjs/module';
import Sequelize from 'sequelize';
import merge from 'lodash/merge';

export default class SequelizeServerModule extends Module {
  enabled = false;
  defaultConfig = {
    uri: '',
    options: {
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
  async init() {
    await super.init();
    const configSequelize = this.app.config.sequelize;
    if (!configSequelize) return;
    this.enabled = true;
    this.config = merge(
      {
        options: {
          dialect: 'postgres',
        },
      },
      this.defaultConfig,
      configSequelize,
    );
    this.client = new Sequelize(this.config.uri, this.config.options);
    this.sqlModels = this.getSQLModels();
    await this.client.authenticate();
  }
  getSQLModels() {
    return {};
  }
  async run() {
    if (!this.enabled) return;
    await this.client.sync();
  }
}
