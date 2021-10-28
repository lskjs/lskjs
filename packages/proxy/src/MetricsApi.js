import { stage } from '@lskjs/env';
import Api from '@lskjs/server-api';
import { Registry } from 'prom-client';

export class MetricsApi extends Api {
  getRoutes() {
    return {
      '/': this.metrics.bind(this),
    };
  }

  async init() {
    await super.init();
    this.registry = new Registry();
    this.registry.setDefaultLabels({
      stage,
    });
    const proxy = await this.app.module('proxy');
    Object.values(await proxy.metrics()).map((m) => this.registry.registerMetric(m));
  }
  async metrics(req, res) {
    this.registry.resetMetrics();
    const proxy = await this.app.module('proxy');
    await proxy.metrics();
    const raw = await this.registry.metrics();
    return res.send(raw);
  }
}

export default MetricsApi;
