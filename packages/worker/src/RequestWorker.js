import { createRequest } from '@lskjs/proxy/createRequest';
import { ProxyManager } from '@lskjs/proxy/ProxyManager';

import { RabbitWorker } from './RabbitWorker';

export class RequestWorker extends RabbitWorker {
  async getConfig() {
    const config = await super.getConfig();
    const proxyConfig = await ProxyManager.parseProxyParam(process.env.PROXY);
    return {
      ...config,
      proxy: {
        ...(config?.proxy || {}),
        ...(proxyConfig || {}),
        client: {
          ...(config?.proxy?.client || {}),
          ...(proxyConfig?.client || {}),
        },
      },
    };
  }
  getModules() {
    return {
      proxy: () => import('@lskjs/proxy/ProxyManager'),
    };
  }
  async init() {
    await super.init();
    let proxyManager;
    if (this.hasModule('proxy')) proxyManager = await this.module('proxy', { throw: false });
    let apm;
    if (this.app.hasModule('apm')) apm = await this.app.module('apm', { throw: false });
    this.request = createRequest({
      proxyManager,
      apm,
    });
  }
}

export default RequestWorker;
