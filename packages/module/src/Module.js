import toPairs from 'lodash/toPairs';
import get from 'lodash/get';
import Promise from 'bluebird';
import logger from '@lskjs/log';
import isFunction from 'lodash/isFunction';
import assignProps from '@lskjs/utils/assignProps';
import classNewOrFunctionCall from '@lskjs/utils/classNewOrFunctionCall';
import Emitter from './emitter';

const DEBUG = __DEV__ && false;

export default class Module {
  _module = true;

  name = 'Module';
  constructor(props) {
    assignProps(this, props);
  }

  createLogger(params) {
    return logger.createLogger({
      name: this.name || 'app',
      src: __DEV__,
      // level: 'trace',
      level: __DEV__ ? (__STAGE__ === 'isuvorov' ? 'trace' : 'debug') : __STAGE__ === 'production' ? 'error' : 'warn', // eslint-disable-line no-nested-ternary
      ...get(this, 'config.log', {}),
      ...params,
    });
  }

  emit(...args) {
    if (this.log && this.log.trace) {
      this.log.trace(`[e] ${this.name}:`, ...args);
    } else {
      console.log(`[e] ${this.name}:`, ...args); // eslint-disable-line no-console
    }
    if (this.ee && this.ee.emit) this.ee.emit(...args);
  }
  on(...args) {
    if (this.ee) {
      this.ee.on(
        args[0],
        async (...params) => {
          try {
            await args[1](...params);
          } catch (err) {
            this.log.error(`App.on(${args[0]})`, err);
          }
        },
        args[2],
      );
    }
  }

  async beforeInit() {
    if (!this.ee) this.ee = new Emitter();
    if (!this.log) this.log = this.createLogger();
    if (this.ee && this.log) this.ee.on('*', event => this.log.trace(event));
  }

  async init() {
    // if (!this.log) this.log = this.createLogger();
    this.emit('init');
    // this.log.trace(`${this.name}.init()`);
    // if (!this.config) this.config = config;
  }

  getModels() {
    return {};
  }

  getModules() {
    return {};
  }

  _modules = {};
  modules = {};
  initModules() {
    if (this.getModules) this._modules = this.getModules();
  }
  statusModule(name) {
    if (!this._modules || !this._modules[name]) return 'undefined';
    // undefined
    // notImported
    // imported
    // inited
    // runned
    if (this.modules && this.modules[name]) return 'started';
    return null;
  }
  async module(nameOrNames) {
    if (Array.isArray(nameOrNames)) {
      const modules = {};
      await Promise.map(nameOrNames, async name => {
        modules[name] = await this.module(name);
      });
      return modules;
    }
    const name = nameOrNames;

    if (this.modules && this.modules[name]) return this.modules[name];
    if (!this._modules || !this._modules[name]) throw `!modules.${name}`;
    const pack = await this._modules[name]();
    let AsyncModule;
    if (pack && pack.default) {
      AsyncModule = pack.default;
    } else {
      AsyncModule = pack;
    }
    // let asyncModule;
    const asyncModule = classNewOrFunctionCall(AsyncModule, this);
    if (asyncModule.start) {
      await asyncModule.start();
    } else {
      if (asyncModule.init) await asyncModule.init();
      if (asyncModule.run) await asyncModule.run();
    }
    this.modules[name] = asyncModule;
    return this.modules[name];
  }

  broadcastModules(method) {
    if (DEBUG) this.log.trace(`${this.name}.broadcastModules`, method);
    // console.log('this.getModulesSequence()', this.getModulesSequence());
    const modules = toPairs(this.modules || {}).map(([k, v]) => ({ name: k, module: v }));
    return Promise.map(modules, pack => {
      if (!(pack.module && isFunction(pack.module[method]))) return null;
      // let res;
      try {
        if (DEBUG) this.log.trace(`module ${pack.name}.${method}()`);
        return pack.module[method]();
      } catch (err) {
        this.log.error(`module ${pack.name}.${method}() ERROR:`, err);
      }
      return null;
    });
  }

  run() {
    this.emit('run');
  }

  async startOrRestart() {
    if (this.startCount) {
      return this.restart();
    }
    return this.start();
  }

  async restart() {
    this.log.trace(`${this.name}.restart()`);
    await this.stop();
    if (isFunction(this.onRestart)) {
      this.log.trace(`${this.name}.onRestart()`);
      await this.onRestart();
    }
    await this.start();
  }

  startCount = 0;
  async start() {
    try {
      if (isFunction(this.beforeInit)) {
        await this.beforeInit();
      }
      if (isFunction(this.init)) {
        await this.init();
      }
      if (isFunction(this.initModules)) {
        if (DEBUG) this.log.trace(`${this.name}.initModules()`);
        await this.initModules();
      }
      if (isFunction(this.afterInit)) {
        if (DEBUG) this.log.trace(`${this.name}.afterInit()`);
        await this.afterInit();
      }
      if (isFunction(this.run)) {
        if (DEBUG) this.log.trace(`${this.name}.run()`);
        await this.run();
      }
      // if (isFunction(this.broadcastModules)) {
      //   if (DEBUG) this.log.trace(`${this.name}.broadcastModules('run')`);
      //   await this.broadcastModules('run');
      // }
      if (isFunction(this.afterRun)) {
        if (DEBUG) this.log.trace(`${this.name}.afterRun()`);
        await this.afterRun();
      }
      if (isFunction(this.started)) {
        if (DEBUG) this.log.trace(`${this.name}.started()`);
        await this.started();
      }
      if (isFunction(this.onStart)) {
        if (DEBUG) this.log.trace(`${this.name}.onStart()`);
        await this.onStart();
      }
      this.startCount += 1;
    } catch (err) {
      if (this.log && this.log.fatal) {
        this.log.fatal(`${this.name}.start() err`, err);
      } else {
        console.error(`${this.name}.start() err`, err); // eslint-disable-line no-console
      }
      if (typeof process !== 'undefined' && process.exit) {
        process.exit(1);
      }
      throw err;
    }
    return this;
  }

  async stop() {
    this.emit('stop');
    this.log.trace(`${this.name}.stop()`);
    try {
      if (isFunction(this.broadcastModules)) {
        if (DEBUG) this.log.trace(`${this.name}.broadcastModules('stop')`);
        await this.broadcastModules('stop');
      }
      if (isFunction(this.onStop)) {
        if (DEBUG) this.log.trace(`${this.name}.onStop()`);
        await this.onStop();
      }
    } catch (err) {
      if (this.log && this.log.fatal) {
        this.log.fatal(`${this.name}.stop() err`, err);
      } else {
        console.error(`${this.name}.stop() err`, err); // eslint-disable-line no-console
      }
      if (typeof process !== 'undefined' && process.exit) {
        process.exit(1);
      }
      throw err;
    }
    return this;
  }
}
