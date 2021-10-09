import Err from '@lskjs/err';
import arrayToObject from '@lskjs/utils/arrayToObject';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import { isDev } from '@lskjs/utils/env';
import importFn from '@lskjs/utils/importFn';
import get from 'lodash/get';

import { createErrorInfo } from './createErrorInfo';
import { SampleApp } from './SampleApp';

export class WorkerApp extends SampleApp {
  preload = true;
  initedWorkers = {};
  async model(...args) {
    this.log.warn('app.model deprecated', ...args);
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
  }
  isWorkerClass(WorkerClass) {
    return !!(WorkerClass && WorkerClass.__worker);
  }
  isWorkerJob(WorkerJob) {
    return !!(WorkerJob && WorkerJob.__workerJob);
  }
  async worker(nameOrNames) {
    // eslint-disable-next-line no-param-reassign
    if (nameOrNames === '*') nameOrNames = Object.keys(this.availableWorkers || {});
    if (Array.isArray(nameOrNames)) return asyncMapValues(arrayToObject(nameOrNames), (n) => this.module(n));
    const name = nameOrNames;
    if (this.initedWorkers[name]) return this.initedWorkers[name];
    if (!this.availableWorkers[name])
      throw new Err('WORKER_NOT_FOUND', `In worker "${name}" not found index with exported default function`);
    const CurrentWorker = await importFn(this.availableWorkers[name]);
    const config = this.getWorkerConfig(name);
    // TODO: разобраться почему ругается eslint
    // eslint-disable-next-line no-prototype-builtins
    if (!this.isWorkerClass(CurrentWorker)) {
      throw new Err('notInstanceOfWorker', { data: { name } });
    }
    const worker = await CurrentWorker.start({
      app: this,
      rabbit: this.rabbit,
      config,
    });
    this.initedWorkers[name] = worker;
    return worker;
  }
  getWorkerConfig(name) {
    const config = get(this, 'config.worker') || {};
    if (typeof config === 'string') {
      throw new Err('DEPRECATED config.worker === string');
    }
    return {
      ...(get(this, `config.workers.${name}`) || {}),
      ...config,
    };
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
    await this.runWorkers();
  }
}

export default WorkerApp;
