import toPairs from 'lodash/toPairs';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import logger from './logger';
import Promise from 'bluebird';
// import config from './config';

function isClass(v) {
  return isFunction(v);// && /^\s*class\s+/.test(v.toString());
}

const DEBUG = true;

export default class Core {
  name = 'Core';
  constructor(params = {}) {
    Object.assign(this, params);
  }

  createLoggerMock() {
    return createLoggerMock(get(this, 'config.log', {}));
  }

  createLogger(params) {
    return logger.createLogger({
      name: this.name || 'app',
      src: __DEV__,
      level: 'trace',
      ...get(this, 'config.log', {}),
      ...params,
    });
  }

  async beforeInit() {
    if (!this.log) this.log = this.createLogger();
  }

  async init() {
    if (!this.log) this.log = this.createLogger();
    this.log.trace(`${this.name}.init()`);
    // if (!this.config) this.config = config;
  }

  getModules() {
    return {};
  }

  getModulesSequence() {
    return toPairs(this.modules || {}).map(([k, v]) => ({ name: k, module: v }));
  }

  broadcastModules(method) {
    this.log.trace(`${this.name}.broadcastModules`, method);
    // console.log('this.getModulesSequence()', this.getModulesSequence());
    
    return Promise.map(this.getModulesSequence(), (pack) => {
      // this.log.trace(`@@@@ module ${pack.name}.${method}()`, typeof pack.module[method], pack.module);
      if (!(pack.module && isFunction(pack.module[method]))) return;
      let res
      try {
        this.log.trace(`module ${pack.name}.${method}()`);
        return pack.module[method]();
      } catch(err) {
        this.log.error(`module ${pack.name}.${method}() ERROR:`, err);
      }
    });
  }

  initModules() {
    this._modules = this.getModules();
    // console.log('@@!!', {modules});
    const modules = {};
    forEach(this._modules, (Module, key) => {
      // const Module = module(ctx);
      if (isClass(Module)) {
        modules[key] = new Module(this);
      } else {
        modules[key] = Module;
      }
      if (!modules[key].name || modules[key].name === 'Core') {
        modules[key].name = key;
      }
    });
    this.modules = modules;
    DEBUG && this.log.trace(`${this.name}.modules`, Object.keys(this.modules));
    // this.log.debug('_modules', Object.keys(this._modules));
    return this.broadcastModules('init');
  }

  run() {
  }

  async startOrRestart() {
    if (this.startCount) {
      this.restart()
    } else {
      this.start()
    }
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
        this.log.trace(`${this.name}.initModules()`);
        await this.initModules();
      }
      if (isFunction(this.afterInit)) {
        this.log.trace(`${this.name}.afterInit()`);
        await this.afterInit();
      }
      if (isFunction(this.run)) {
        this.log.trace(`${this.name}.run()`);
        await this.run();
      }
      if (isFunction(this.broadcastModules)) {
        this.log.trace(`${this.name}.broadcastModules('run')`);
        await this.broadcastModules('run');
      }
      if (isFunction(this.afterRun)) {
        this.log.trace(`${this.name}.afterRun()`);
        await this.afterRun();
      }
      if (isFunction(this.onStart)) {
        this.log.trace(`${this.name}.onStart()`);
        await this.onStart();
      }
      this.startCount += 1;
    } catch (err) {
      if (this.log && this.log.fatal) {
        this.log.fatal(`${this.name}.start() err`, err);
      } else {
        console.error(`${this.name}.start() err`, err);
      }
      if (typeof process !== 'undefined' && process.exit) {
        process.exit(1);
      }
      throw err;
    }
    return this;
  }

  async stop() {
    this.log.trace(`${this.name}.stop()`);
    try {
      if (isFunction(this.broadcastModules)) {
        this.log.trace(`${this.name}.broadcastModules('stop')`);
        await this.broadcastModules('stop');
      }
      if (isFunction(this.onStop)) {
        this.log.trace(`${this.name}.onStop()`);
        await this.onStop();
      }
    } catch (err) {
      if (this.log && this.log.fatal) {
        this.log.fatal(`${this.name}.stop() err`, err);
      } else {
        console.error(`${this.name}.stop() err`, err);
      }
      if (typeof process !== 'undefined' && process.exit) {
        process.exit(1);
      }
      throw err;
    }
    return this;
  }

}
