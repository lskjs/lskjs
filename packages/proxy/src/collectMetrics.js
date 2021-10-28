import { Gauge } from 'prom-client';

export const collectMetrics = async function ({ prefix = 'bg' } = {}) {
  if (!this.__metrics) this.__metrics = {};
  if (!this.__metrics.gauge) {
    this.__metrics.gauge = new Gauge({
      name: [prefix, 'proxy'].filter(Boolean).join('_'),
      help: 'Информация по проксям',
      labelNames: ['provider', 'type', 'country', 'ipv', 'worker'],
    });
  }
  if (!this.__metrics.gaugeTargetCount) {
    this.__metrics.gaugeTargetCount = new Gauge({
      name: [prefix, 'proxy_count'].filter(Boolean).join('_'),
      help: 'Информация по статусам проксям',
      labelNames: ['target', 'provider', 'status'],
    });
  }
  try {
    const proxyList = await this.getProxyList();
    // console.log({ proxyList });
    proxyList.forEach((proxy) => {
      // console.log({ proxy });
      const { provider, type, tags } = proxy || {};
      // console.log({provider})
      const { country, ipv, worker } = tags || {};
      // console.log({country})
      this.__metrics.gauge.inc({ provider, type, country, ipv, worker });
    });
  } catch (err) {
    this.log.error('[collectMetrics] getProxyList', err);
  }
  try {
    const proxyTestsResults = await this.getProxyTestsResults();
    Object.values(proxyTestsResults).forEach(({ test, proxy, time, status } = {}) => {
      const { provider } = proxy || {};
      const { tags = [] } = test || {};
      tags.forEach((target) => {
        if (!target) return;
        this.__metrics.gaugeTargetCount.inc({ target, provider, status });
      });
    });
  } catch (err) {
    this.log.error('[collectMetrics] getProxyTests', err);
  }

  return this.__metrics;
};

export default collectMetrics;
