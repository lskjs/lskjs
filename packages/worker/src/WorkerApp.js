import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Err from '@lskjs/utils/Err';
import importFn from '@lskjs/utils/importFn';

export class WorkerApp extends Module {
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
    this.on('runFinish', () => this.started());
  }
  async worker(name) {
    if (this.initedWorkers[name]) return this.initedWorkers[name];
    if (!this.availableWorkers[name])
      throw new Err('WORKER_NOT_FOUND', `In worker "${name}" not found index with exported default function`);
    const Worker = await importFn(this.availableWorkers[name]);
    const worker = await Worker.createAndRun({
      app: this,
      rabbit: this.rabbit,
    });
    this.initedWorkers[name] = worker;
    return worker;
  }
  async runWorkers() {
    const { worker: workerKey } = this.config;
    this.log.trace(`runWorkers(${workerKey})`);
    let workerNames;
    if (workerKey === '*') {
      workerNames = Object.keys(this.workers);
    } else if (workerKey) {
      workerNames = workerKey.split(',').map((w) => w.trim());
    }
    await asyncMapValues(workerNames, async (name) => this.worker(name));
  }
  async run() {
    await super.run();
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
    if (__DEV__) {
      this.log.info(str);
    } else {
      this.log.warn(str);
    }
  }
}

export default WorkerApp;
