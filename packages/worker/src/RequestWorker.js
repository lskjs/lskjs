import Err from '@lskjs/err';
import { createRequest } from '@lskjs/proxy/createRequest';
import { ProxyManager } from '@lskjs/proxy/ProxyManager';
import { isNetworkError } from '@lskjs/proxy/utils/isNetworkError';
import retry from '@lskjs/utils/retry';

import { RabbitWorker } from './RabbitWorker';

export class RequestWorker extends RabbitWorker {
  async getConfig() {
    const config = await super.getConfig();
    const proxyUrl = process.env.PROXY;
    const proxyConfig = await ProxyManager.parseProxyParam(proxyUrl);
    if (!proxyConfig) {
      return {
        ...config,
        proxy: {
          ...(config?.proxy || {}),
          disabled: true,
        },
      };
    }
    const newConfig = {
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
    return newConfig;
  }
  getModules() {
    return {
      proxy: () => import('@lskjs/proxy/ProxyManager'),
    };
  }
  // TODO: нейминг
  proxyManagerErrorProps = {
    timeout: 10000,
    redelivered: false,
  };
  async onProxyManagerError({ err: initErr, ...props }) {
    let message = 'PROXY_ERROR';
    const isNetwork = isNetworkError(initErr);
    let errProps = {};
    if (isNetwork) {
      message = 'PROXY_NETWORK';
      errProps = {
        message,
        subcode: Err.getCode(initErr),
        class: 'network',
        ...(this.proxyManagerErrorProps || {}),
        ...props,
      };
    }
    const err = new Err(message, initErr, errProps);
    this.log.error('[onProxyManagerError]', err);
    throw retry.StopError(err);
  }
  async init() {
    await super.init();
    let proxyManager;
    if (this.hasModule('proxy')) proxyManager = await this.module('proxy', { throw: false });
    let apm;
    if (this.app.hasModule('apm')) apm = await this.app.module('apm', { throw: false });
    let log;
    if (this.debug) log = this.log;
    this.request = createRequest({
      proxyManager,
      apm,
      log,
      onProxyManagerError: this.onProxyManagerError && this.onProxyManagerError.bind(this),
    });
  }
}

export default RequestWorker;
