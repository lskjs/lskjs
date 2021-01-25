import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Err from '@lskjs/utils/Err';
import importFn from '@lskjs/utils/importFn';

export class WorkerApp extends Module {
  initedWorkers = {};
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
    this.log.info(`🐿 ${this.name} started`);
  }
}

export default WorkerApp;
