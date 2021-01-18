import Module from '@lskjs/module';
import ElasticApm from 'elastic-apm-node';
import get from 'lodash/get';

export const apmMock = {
  startTransaction() {
    return {
      end: () => null,
      startSpan: () => ({ end: () => null }),
      addLabels: () => null,
      setLabel: () => null,
    };
  },
  async captureError() {
    return null;
  },
  setCustomContext() {
    return null;
  },
  setLabel() {
    return null;
  },
  addLabels() {
    return null;
  },
};

export class ApmModule extends Module {
  ElasticApm = ElasticApm;
  async init() {
    await super.init();
    if (!this.config || !this.config.serverUrl) {
      this.config = get(this, 'app.config.apm', {});
    }
    if (this.config.disabled) {
      this.log.warn('config.disabled');
      return;
    }
    if (!this.config.serverUrl) {
      this.log.warn('!config.serverUrl');
      return;
    }
    const { serviceName = get(process, 'env.WORKER', `nodejs_${get(process, 'env.USER')}`) } = this.config;
    const config = {
      logLevel: 'warn',
      ...this.config,
      serviceName,
    };
    this.log.debug('config', config);
    this.client = this.ElasticApm.start(config);
  }

  startTransaction(...args) {
    if (!this.client) return apmMock.startTransaction(...args);
    return this.client.startTransaction(...args);
  }
  async captureError(...args) {
    if (!this.client) return apmMock.captureError(...args);
    return this.client.captureError(...args);
  }
  setCustomContext(...args) {
    if (!this.client) return apmMock.setCustomContext(...args);
    return this.client.setCustomContext(...args);
  }
  setLabel(...args) {
    if (!this.client) return apmMock.setLabel(...args);
    return this.client.setLabel(...args);
  }
  addLabels(...args) {
    if (!this.client) return apmMock.addLabels(...args);
    return this.client.addLabels(...args);
  }
}

export default ApmModule;