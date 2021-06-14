import Module from '@lskjs/module';
import maskUriPassword from '@lskjs/utils/maskUriPassword';
import Bluebird from 'bluebird';
import pick from 'lodash/pick';
import { Mongoose } from 'mongoose';

import { validOptionNames } from './mongo/validOptionNames';

// abstract
export class DbModule extends Module {
  config = {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // autoReconnect: true,
    // reconnectTries: __DEV__ ? 10000 : 30,
    // reconnectInterval: __DEV__ ? 30000 : 1000,
    connectTimeoutMS: 5000,
    // sets the delay between every retry (milliseconds)
  };

  provider = 'mongo';
  client = 'mongoose';
  Mongoose = Mongoose;
  reconnectios = 0;

  getOptions() {
    return {
      ...pick(this.config, validOptionNames),
      ...(this.config.options || {})
    };
  }
  async init() {
    await super.init();
    const { uri } = this.config;
    const options = this.getOptions();
    if (!uri) throw '!uri';
    if (this.debug) this.log.trace('config', maskUriPassword(uri), options); // finalOptions

    // eslint-disable-next-line no-shadow
    const { Mongoose } = this;
    this.client = new Mongoose();
    this.client.Promise = Promise;
    this.client.connection.on('connected', () => {
      if (this.debug) this.log.trace('connected');
      this.reconnectios = 0;
    });
    this.client.connection.on('error', async (err) => {
      this.log.error('error', err);
      const interval = this.reconnectios++ * 2000 + 1000; // eslint-disable-line no-plusplus
      if (this.debug) this.log.warn(`reconnect [delay] ${interval}ms`);
      await Bluebird.delay(interval);
      setTimeout(this.reconnect.bind(this), interval);
    });
    this.client.connection.on('disconnected', () => {
      if (this.debug) this.log.trace('disconnected');
    });
    this.client.set('debug', this.debug || false);
    return this.client;
  }

  async stop() {
    await super.stop();
    if (this.client) {
      if (this.client.connection) this.client.connection.close();
      this.client.disconnect();
    } else {
      this.log.warn('!client', 'cannot client.disconnect');
    }

    return Bluebird.delay(10);
  }

  async reconnect() {
    if (this.debug) this.log.trace('reconnect');
    if (this.client) {
      this.client.stop();
      this.client.run();
    } else {
      this.log.warn('!client', 'cannot client.stop and client.run');
    }
  }

  async run() {
    await super.run();
    this.reconnectios = 0;
    const { uri } = this.config;
    const options = this.getOptions();
    const connection = await new Promise((resolve, reject) => this.client.connect(uri, options).then(resolve, reject));
    this.log.debug('ready', maskUriPassword(uri));
    return connection;
  }
}

export default DbModule;
