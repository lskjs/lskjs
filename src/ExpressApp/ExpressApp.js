import bunyan from 'bunyan';
import express from 'express';
import { Server as httpServer } from 'http';
import mixin from 'lego-starter-kit/utils/mixin';
import AsyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default class ExpressApp {
  static mixin = mixin;
  asyncRouter = AsyncRouter;
  constructor(params = {}) {
    Object.assign(this, params);
    if (!this.log) this.log = this.getLogger(); // because CoreApp.log() before init
    this.init();
  }
  getExpress() {
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
  init() {
    this.log.trace('ExpressApp init');
    this.app = this.getExpress();
    this.appServer = httpServer(this.app);

    this.beforeUseMiddlewares();
    this.useMiddlewares();
    this.useRoutes();
    this.useStatics();
    this.useDefaultRoute();
    this.afterUseMiddlewares();
  }

  beforeUseMiddlewares() {}
  useMiddlewares() {}
  useStatics() {}
  useRoutes() {}
  useDefaultRoute() {
    this.app.use((req, res) => {
      return res.send(`Hello World from "${this.config.name}"`);
    });
  }
  afterUseMiddlewares() {}

  async run() {
    this.log.trace('ExpressApp run');

    return new Promise((resolve) => {
      this.appInstance = this.appServer.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }
}
