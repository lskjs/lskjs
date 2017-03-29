import bunyan from 'bunyan';
import express from 'express';
import { Server as httpServer } from 'http';
import mixin from 'lego-starter-kit/utils/mixin';
import AsyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import _ from 'lodash';

export default class ExpressApp {
  static mixin = mixin;
  asyncRouter = AsyncRouter;
  constructor(params = {}) {
    Object.assign(this, params);
    if (!this.log) this.log = this.getLogger(); // because CoreApp.log() before init
    try {
      this.init();
      this.initModules();
      this.initExpress();
    } catch (err) {
      this.log.fatal('init err', err);
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
    return _.values(this.modules || {});
  }
  init() {
    this.log.trace('ExpressApp init');
    this.app = this.createExpressApp();
    this.httpServer = httpServer(this.app);
  }
  initModules() {
    this.modulesClasses = this.getModules()
    const modules = {}
    _.forEach(this.modulesClasses, (Module, key) => modules[key] = new Module(this))
    this.modules = modules
    return Promise.each(this.getModulesSequence(), m => m.init && m.init())
    // this.modules = this.getModulesSequence().map(Module => new Module(this));
    // return Promise.each(this.getModulesSequence(), m => m.init && m.init())
  }

  initExpress() {
    this.log.trace('ExpressApp initExpress');
    this.useMiddlewares();
    this.useRoutes();
    this.useStatics();
    this.useDefaultRoute();
    this.useCatchErrors();
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

  async run() {
    this.log.trace('ExpressApp run');

    return new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(this.config.port, () => {
        this.log.info(`App running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }
  runModules() {
    return Promise.each(this.getModulesSequence(), m => m.run && m.run())
  }

  async start() {
    try {
      await this.run();
      await this.runModules();
    } catch (err) {
      this.log.fatal('run err', err);
    }
    console.log(`🎃  The server is running at http://127.0.0.1:${this.config.port}/ [${global.timing()}ms]`);
  }
}
