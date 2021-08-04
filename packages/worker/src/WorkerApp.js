import Module from '@lskjs/module';
import arrayToObject from '@lskjs/utils/arrayToObject';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import { isDev } from '@lskjs/utils/env';
import Err from '@lskjs/utils/Err';
import importFn from '@lskjs/utils/importFn';
import get from 'lodash/get';

import { createErrorInfo } from './createErrorInfo';

export class WorkerApp extends Module {
  preload = true;
  initedWorkers = {};
  async model(...args) {
    const modelsModule = await this.module('models');
    return modelsModule.model(...args);
  }
  setProp(name, value) {
    if (name === 'workers') return super.setProp('availableWorkers', value);
    return super.setProp(name, value);
  }
  async init() {
    await super.init();
    if (!this.getErrorInfo) this.getErrorInfo = createErrorInfo(this.errors);
    this.on('runFinish', () => this.started());
  }
  async worker(nameOrNames) {
    // eslint-disable-next-line no-param-reassign
    if (nameOrNames === '*') nameOrNames = Object.keys(this.availableWorkers || {});
    if (Array.isArray(nameOrNames)) return asyncMapValues(arrayToObject(nameOrNames), (n) => this.module(n));
    const name = nameOrNames;
    if (this.initedWorkers[name]) return this.initedWorkers[name];
    if (!this.availableWorkers[name])
      throw new Err('WORKER_NOT_FOUND', `In worker "${name}" not found index with exported default function`);
    const Worker = await importFn(this.availableWorkers[name]);
    const config = this.getWorkerConfig();
    const worker = await Worker.start({
      app: this,
      rabbit: this.rabbit,
      config,
    });
    this.initedWorkers[name] = worker;
    return worker;
  }
  getWorkerConfig() {
    if (get(this, 'config.worker') === 'object') return get(this, 'config.worker');
    const workerKey = get(this, 'config.worker.name') || get(this, 'config.worker');
    if (workerKey && typeof workerKey !== 'string') {
      return { name: workerKey };
    }
    return {};
  }
  async runWorkers() {
    const config = this.getWorkerConfig();
    const workerKey = config.name;
    if (!workerKey || typeof workerKey !== 'string') {
      this.log.warn('!config.worker', '[ignore]');
      return;
    }
    this.log.trace(`runWorkers(${workerKey})`);
    let workerNames;
    if (workerKey === '*') {
      workerNames = Object.keys(this.availableWorkers || {});
    } else if (workerKey) {
      workerNames = workerKey.split(',').map((w) => w.trim());
    }
    await asyncMapValues(workerNames, async (name) => this.worker(name));
  }
  async run() {
    await super.run();
    if (this.preload) {
      if (this.hasModule('db')) await this.module('db');
      if (this.hasModule('models')) await this.module('models.*');
    }
    await this.runWorkers();
  }
  async started() {
    const timing = global.timing ? `[${global.timing()}ms]` : '';
    const rawAddress = this.webserver && this.webserver.httpInstance.address();
    let str;
    if (rawAddress) {
      const { port, address } = rawAddress;
      str = `🎃 The ${this.name} is ready at http://${address === '::' ? '127.0.0.1' : address}:${port}/ ${timing}`;
    } else {
      str = `🎃 The ${this.name} is ready ${timing}`;
    }
    if (isDev) {
      this.log.info(str);
    } else {
      this.log.warn(str);
    }
  }
}

export default WorkerApp;
