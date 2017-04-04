import bunyan from 'bunyan';
import express from 'express';
import { Server as httpServer } from 'http';
import mixin from 'lego-starter-kit/utils/mixin';
import AsyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import _ from 'lodash';

const DEBUG = false;

export default class ExpressApp {
  static mixin = mixin;
  asyncRouter = AsyncRouter;
  constructor(params = {}) {
    Object.assign(this, params);
    if (!this.log) this.log = this.getLogger(); // because CoreApp.log() before init
  }


  async init() {
    super.init();
    this.log.trace('ExpressApp init');
    this.express = this.createExpress();
    this.httpServer = httpServer(this.express);
    if (this.config.express) {
      this.log.trace('express config:', this.config.express);
      _.forEach((this.config.express || {}), (value, key) => {
        this.express.set(key, value);
      });
    }
  }


  createExpressApp() {
    return express();
  }
  getLogger(params) {
    const options = Object.assign({
      name: 'app',
      src: __DEV__,
      level: 'trace',
    }, this.config.logger || {});
    return bunyan.createLogger(options, params);
  }
  getModules() {
    return {}
  }

  getModulesSequence() {
    //
    // {k: v}
    // [[k, v]]
    return _.toPairs(this.modules || {}).map(([k,v]) => ({name: k, module: v}));
  }

  init() {
    this.log.trace('ExpressApp init');
    this.app = this.createExpressApp();
    this.httpServer = httpServer(this.app);
  }

  initModules() {
    this.log.trace('ExpressApp initModules');
    this.modulesClasses = this.getModules();
    const modules = {}
    _.forEach(this.modulesClasses, (Module, key) => modules[key] = new Module(this))
    this.modules = modules

    return Promise.each(this.getModulesSequence(), pack => {
      if (!pack.module || !pack.module.init) return ;
      this.log.trace('module ' + pack.name + '.init()');
      return pack.module.init()
    })
  }
  runModules() {
    this.log.trace('ExpressApp runModules');
    return Promise.each(this.getModulesSequence(), pack => {
      if (!pack.module || !pack.module.run) return ;
      this.log.trace('module ' + pack.name + '.run()');
      return pack.module.run()
    })
  }

  async run() {
    this.log.trace('ExpressApp run');
    this.useMiddlewares();
  }

  async afterRun() {
    this.log.trace('ExpressApp afterRun');
    this.useRoutes();
    this.useStatics();
    this.useDefaultRoute();
    this.useCatchErrors();
    return new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(this.config.port, () => {
        this.log.info(`App running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }

  useMiddlewares() {}
  useRoutes() {}
  useStatics() {}
  useDefaultRoute() {
    this.app.use((req, res) => {
      return res.send(`Hello World from "${this.config.name}"`);
    });
  }
  useCatchErrors() {}


  async start() {
    try {
      DEBUG && this.log.trace('CORE.init()');
      await this.init();
      DEBUG && this.log.trace('CORE.initModules()');
      await this.initModules();
      DEBUG && this.log.trace('CORE.run()');
      await this.run();
      DEBUG && this.log.trace('CORE.runModules()');
      await this.runModules();
      DEBUG && this.log.trace('CORE.afterRun()');
      await this.afterRun();
      DEBUG && this.log.trace('CORE.started()');
      await this.started();
    } catch (err) {
      this.log.fatal('start err', err);
    }
  }

  async started() {
    console.log(`🎃  The server is running at http://127.0.0.1:${this.config.port}/ [${global.timing()}ms]`);
  }
}
