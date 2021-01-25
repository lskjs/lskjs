import logger from '@lskjs/log';
import arrayToObject from '@lskjs/utils/arrayToObject';
import assignProps from '@lskjs/utils/assignProps';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import classNewOrFunctionCall from '@lskjs/utils/classNewOrFunctionCall';
import importFn from '@lskjs/utils/importFn';
import Promise from 'bluebird';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import toPairs from 'lodash/toPairs';

import Emitter from './emitter';

const DEBUG = __DEV__ && false;

logger.safeLog = (ctx, level = 'info', ...args) => {
  if (ctx.log && ctx.log[level]) {
    ctx.log[level](`<${ctx.name}>`, ...args);
  } else {
    console.log(`[${level[0]}] <${ctx.name}>`, ...args); // eslint-disable-line no-console
  }
};

logger.fatalLog = (...args) => {
  logger.safeLog(...args);
  if (__DEV__) throw new Error(args[3]);
};
export default class Module {
  _module = true;

  name = 'Module';
  constructor(...props) {
    assignProps(this, ...props);
  }

  createLogger(params) {
    const loggerParams = {
      name: this.name || 'app',
      src: __DEV__,
      // level: 'trace',
      level: __DEV__ ? (__STAGE__ === 'isuvorov' ? 'trace' : 'debug') : __STAGE__ === 'production' ? 'error' : 'warn', // eslint-disable-line no-nested-ternary
      ...get(this, 'config.log', {}),
      ...params,
    };
    return logger.createLogger(loggerParams);
  }

  emit(...args) {
    logger.safeLog(this, 'trace', `[ee] emit(${args[0]})`);
    if (this.ee && this.ee.emit) this.ee.emit(...args);
  }
  on(...args) {
    if (!this.ee) {
      if (__DEV__) {
        logger.safeLog(this, 'warn', `[ee] !ee`);
      }
      return;
    }
    logger.safeLog(this, 'trace', `[ee] on(${args[0]})`);
    this.ee.on(
      args[0],
      async (...params) => {
        try {
          await args[1](...params);
        } catch (err) {
          this.log.error(`[ee] on(${args[0]})`, err);
        }
      },
      args[2],
    );
  }

  async beforeInit() {
    if (this.name === 'Module') logger.fatalLog(this, 'warn', `Module.name is empty`);
    this._stage = 'beforeInit';
    if (!this.ee) this.ee = new Emitter();
    if (!this.log) this.log = this.createLogger();
    if (this.ee) this.ee.on('*', (event) => logger.safeLog(this, 'trace', `[ee] ${event}`));
  }

  async init() {
    await this.beforeInit();
    if (this._stage !== 'beforeInit') logger.fatalLog(this, 'warn', `beforeInit() missing`);
    this._stage = 'init';
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
  getModuleStage(name) {
    if (!this._modules || !this._modules[name]) return 'undefined';
    // TODO:
    // undefined
    // notInited
    // beforeInit
    // init
    // run
    if (this.modules && this.modules[name]) return this.modules[name]._stage;
    return 'notInited';
  }
  async module(name) {
    if (Array.isArray(name)) return asyncMapValues(arrayToObject(name), (n) => this.module(n));
    if (this.modules && this.modules[name]) return this.modules[name];
    if (!this._modules || !this._modules[name]) throw `!modules.${name}`;
    let asyncModule;
    try {
      const AsyncModule = await importFn(this._modules[name]);
      if (Array.isArray(AsyncModule)) {
        asyncModule = classNewOrFunctionCall(...AsyncModule, this);
      } else {
        asyncModule = classNewOrFunctionCall(AsyncModule, this);
      }
    } catch (err) {
      this.log.error(`module(${name})`, err);
      throw err;
    }
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
    return Promise.map(modules, (pack) => {
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
    if (this._stage !== 'init') logger.fatalLog(this, 'warn', `init() missing`);
    this._stage = 'run';
    this.emit('run');
  }

  async startOrRestart() {
    if (this._started) {
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

  _started = 0;
  async start() {
    try {
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
      this._started += 1;
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
