import Module from '@lskjs/module';
import omit from 'lodash/omit';
import Sequelize from 'sequelize';

export default class SequelizeServerModule extends Module {
  config = {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 100000,
      acquire: 50000,
      evict: 50000,
      handleDisconnects: true,
    },
  };

  Sequelize = Sequelize;

  getOptions() {
    const options = omit(this.config, ['uri']);
    if (options.logging) options.logging = !!this.debug;
    return options;
  }
  async init() {
    await super.init();
    if (!this.config.uri) {
      await this.log.warn('!uri', 'ignore module');
      return;
    }
    this.client = new this.Sequelize(this.config.uri, this.getOptions());
    await this.client.authenticate();
  }
  async run() {
    if (!this.client) return;
    await this.client.sync();
  }
}
