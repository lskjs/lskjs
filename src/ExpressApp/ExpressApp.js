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
    try {
      this.init();
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
  init() {
    this.log.trace('ExpressApp init');
    this.app = this.createExpressApp();
    this.httpServer = httpServer(this.app);
  }

  initExpress() {
    this.log.trace('ExpressApp initExpress');
    this.useMiddlewares();
    this.useRoutes();
    this.useStatics();
    this.useDefaultRoute();
  }

  useMiddlewares() {}
  useStatics() {}
  useRoutes() {}
  useDefaultRoute() {
    this.app.use((req, res) => {
      return res.send(`Hello World from "${this.config.name}"`);
    });
  }

  async run() {
    this.log.trace('ExpressApp run');

    return new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(this.config.port, () => {
        this.log.info(`App running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }
}
