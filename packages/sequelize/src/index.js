import Sequelize from 'sequelize';
import merge from 'lodash/merge';

export default ({ config }) => class SequelizeModule {
  async init() {
    this.enabled = false;
    if (!config.sequelize) return;
    this.enabled = true;
    this.defaultConfig = {
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
    this.config = merge({
      options: {
        dialect: 'postgres',
      },
    }, this.defaultConfig, config.sequelize);
    this.client = new Sequelize(this.config.uri, this.config.options);
    await this.client.authenticate();
  }
  async run() {
    if (!this.enabled) return;
    await this.client.sync();
  }
};
