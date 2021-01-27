import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
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
    const {
      environment = global.__DEV__ ? get(process, 'env.USER') : process.env.NODE_ENV || 'development',
    } = this.config;
    const config = {
      logLevel: 'warn',
      ...this.config,
      environment,
      serviceName,
    };

    this.log.debug('config', config);
    this.client = this.ElasticApm.start(config);
  }

  async triggerStat(props) {
    this.log.trace('[triggerStat]', props);
    const { name, type, subtype, action, status, err, time = 0, ...labels } = props;
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - time).toISOString();
    const args = [{ startTime }];
    if (action) args.push(action);
    if (subtype) args.push(subtype);
    if (type) args.push(type);
    if (name) args.push(name);
    const tx = this.startTransaction(...args.reverse());
    tx.addLabels(labels);
    let result;
    if (status === 'success') {
      result = status;
    } else if (err) {
      result = Err.getCode(err);
      await this.captureError({ code: Err.getCode(err), message: Err.getMessage(err) });
    }
    await tx.end(result, endTime);
    return tx;
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
