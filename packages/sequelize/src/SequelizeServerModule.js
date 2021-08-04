import Module from '@lskjs/module';
import maskUriPassword from '@lskjs/utils/maskUriPassword';
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
    if (options.logging == null) options.logging = !!this.debug;
    if (options.logging) {
      options.logging = (msg) => {
        const msg2 = msg.split('Executing (default): ').reverse()[0];
        this.log.trace('[sql]', msg2);
      };
    }
    return options;
  }
  async init() {
    await super.init();
    if (!this.config.uri) {
      await this.log.warn('!uri', 'ignore module');
      return;
    }
    const options = this.getOptions();
    this.client = new this.Sequelize(this.config.uri, options);
    await this.client.authenticate();
  }
  async run() {
    if (!this.client) return;
    await this.client.sync();
    this.log.debug('[ready]', maskUriPassword(this.config.uri));
  }
}
