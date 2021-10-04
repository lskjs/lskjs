import { ProxyManager } from '@lskjs/proxy/ProxyManager';
import request from '@lskjs/proxy/request';
import Err from '@lskjs/utils/Err';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';

import { RabbitWorker } from './RabbitWorker';
import { apmMock } from './RabbitWorkerJob';

export class RequestWorker extends RabbitWorker {
  async init() {
    await super.init();
    if (process.env.PROXY) {
      const proxyManager = await ProxyManager.start({
        config: {
          log: {
            name: 'proxy',
          },
        },
        ...ProxyManager.parseProxyParam(process.env.PROXY),
      });
      this.proxyManager = proxyManager;
      await proxyManager.run();
    }
  }

  async request(options) {
    let apm;
    if (this.app.hasModule('apm')) {
      apm = await this.app.module('apm', { throw: false });
    }
    if (!apm) apm = apmMock;
    const tx = apm.startTransaction('proxy');
    // const tx = apm.startTransaction('proxy', testcase.name, testcase.provider, 'action');
    if (tx.setCustomContext) {
      tx.setCustomContext({
        test: 'context',
        rand: Math.random(),
      });
    }

    let proxy;
    const labels = {};
    if (this.proxyManager) {
      proxy = await this.proxyManager.getProxy();
    }
    if (proxy) {
      labels.proxyKey = proxy.key;
      labels.proxyType = proxy.type;
      labels.proxyProvider = proxy.provider;
      forEach(proxy.tags, (value, name) => {
        labels[camelCase(`proxy_${name}`)] = value;
      });
    }
    tx.addLabels(labels);
    let res;
    try {
      res = await request({
        ...options,
        proxy,
      }).catch((err) => {
        this.log.error(err);
        throw err;
      });
      tx.result = 'success';
    } catch (err) {
      tx.result = Err.getCode(err);
      await apm.captureError({ code: Err.getCode(err), message: Err.getMessage(err) });
      throw new Err(err);
    } finally {
      await tx.end();
    }
    return res;
  }
}

export default RequestWorker;
