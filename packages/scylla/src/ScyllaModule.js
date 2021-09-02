import Err from '@lskjs/err';
import Module from '@lskjs/module';
import { delay } from '@lskjs/utils/delay';
import cassandra from 'cassandra-driver';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

export class ScyllaModule extends Module {
  cassandra = cassandra;
  execute(...args) {
    if (!this.client) {
      throw new Err('!client');
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
      // throw new Err('!config');
    }
    this.debug = Boolean(this.config.debug);
    const { Client } = this.cassandra;
    this.client = new Client(omit(this.config, ['defaultKeyspace']));
    await delay(1000);
  }
}

export default ScyllaModule;
