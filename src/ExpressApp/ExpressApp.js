import express from 'express';
import { Server as httpServer } from 'http';
import AsyncRouter from '../utils/AsyncRouter';
import forEach from 'lodash/forEach';
import Core from '../Core';

export default class ExpressApp extends Core {
  name = 'App';
  asyncRouter = AsyncRouter;

  async init() {
    super.init();
    this.log.trace('ExpressApp init');
    this.express = this.createExpressApp();
    this.httpServer = httpServer(this.express);
    if (this.config.express) {
      this.log.trace('express config:', this.config.express);
      forEach((this.config.express || {}), (value, key) => {
        this.express.set(key, value);
      });
    }
    this.app = this.express; // Fallback
  }

  createExpressApp() {
    return express();
  }

  async run() {
    this.log.trace('ExpressApp run');
    this.useStatics();
    this.useMiddlewares();
  }

  async afterRun() {
    this.log.trace('ExpressApp afterRun');
    this.useRoutes();
    this.useDefaultRoute();
    this.useCatchErrors();
    return new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(this.config.port, () => {
        this.log.trace(`App running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }
  async stop() {
    await super.stop();
    await new Promise((resolved) => {
      if (this.httpInstance) {
        this.httpInstance.close(resolved);
      } else {
        resolved();
      }
    })
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

  async started() {
    console.log(`🎃  The server is running at http://127.0.0.1:${this.config.port}/ [${global.timing()}ms]`);
  }
}
