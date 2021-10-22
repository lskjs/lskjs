import { createRequest } from '@lskjs/proxy/createRequest';
import { ProxyManager } from '@lskjs/proxy/ProxyManager';

import { RabbitWorker } from './RabbitWorker';

export class RequestWorker extends RabbitWorker {
  getModules() {
    return {
      proxyManager: [
        ProxyManager,
        {
          config: {
            log: {
              name: 'request',
            },
          },
          ...ProxyManager.parseProxyParam(process.env.PROXY),
        },
      ],
    };
  }
  async init() {
    await super.init();
    let proxyManager;
    if (this.hasModule('proxyManager')) proxyManager = await this.module('proxyManager', { throw: false });
    let apm;
    if (this.app.hasModule('apm')) apm = await this.app.module('apm', { throw: false });
    this.request = createRequest({
      proxyManager,
      apm,
    });
  }
}

export default RequestWorker;
