import Module from '@lskjs/module';
import Promise from 'bluebird';
import cassandra from 'cassandra-driver';
import omit from 'lodash/omit';
import merge from 'lodash/merge';

export default class ScyllaModule extends Module {
  cassandra = cassandra;
  execute(...args) {
    if (!this.client) {
      throw '!client';
    }
    return this.client.execute(...args);
  }
  async init() {
    await super.init();
    const defaultConfig = {
      defaultKeyspace: 'keyspace1',
    };
    this.config = merge({}, defaultConfig, this.app.config.scylla);
    if (!this.config) {
      this.log.error('!config');
      return;
      // throw '!config';
    }
    this.debug = Boolean(this.config.debug);
    const { Client } = this.cassandra;
    this.client = new Client(omit(this.config, ['defaultKeyspace']));
    await Promise.delay(1000);
  }
}
