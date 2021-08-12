/* eslint-disable global-require */
import Module from '@lskjs/module';
import Err from '@lskjs/err';
import staticFileMiddleware from 'connect-static-file';
import Express from 'express';
import http from 'http';
import flattenDeep from 'lodash/flattenDeep';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import path from 'path';
import { getPortPromise } from 'portfinder';

import defaultConfig from './config';
import defaultHelpers from './helpers';
import createWs from './ws';

export class WebserverModule extends Module {
  Express = Express;
  config = defaultConfig;
  // client

  async getHelpers() {
    return defaultHelpers;
  }

  async getConfig() {
    // console.log('this.__parent.name', this.__parent.name);
    // console.log('this.__parent', this.__parent);
    const config = await super.getConfig();
    return {
      ...config,
      jwt: {
        ...(this.__parent.config.jwt || {}),
        ...(config.jwt || {}),
      },
    };
  }

  createExpress() {
    return this.Express();
  }
  setExpressConfig() {
    if (this.config.express && Object.keys(this.config.express).length) {
      this.log.trace('config.express:', this.config.express);
      forEach(this.config.express || {}, (value, key) => {
        this.express.set(key, value);
      });
    }
  }
  async init() {
    await super.init();
    this.helpers = await this.getHelpers();
    if (this.debug) this.log.debug('helpers', Object.keys(this.helpers));
    this.express = this.createExpress();
    this.httpServer = http.createServer(this.express);
    this.setExpressConfig();
    this.responses = this.getResponses();
    if (this.debug) this.log.debug('responses', Object.keys(this.responses));
    if (this.debug) this.log.debug('config.middlewares', this.config.middlewares);
    this.middlewares = this.getMiddlewares();
    if (this.debug) this.log.debug('middlewares', Object.keys(this.middlewares));
    this.helpers = this.getHelpers();
    this.statics = this._getStatics();
    if (this.debug) this.log.debug('statics', this.statics);
    if (this.config.ws) this.initWs();
  }

  url(str, params = null) {
    let query = '';
    if (params && Object.keys(params.length)) {
      query = `?${map(params, (val, key) => `${key}=${val}`).join('&')}`;
    }
    // `http://127.0.0.1:${this.config.port || this.config.port}`,
    return `${this.config.url || this.config.url || '/'}${str}${query}`;
  }

  getMiddlewares() {
    return require('./middlewares').default(this); // eslint-disable-line
  }
  getResponses() {
    return require('./responses').default(this);
  }
  getStaticsDir(dirPath) {
    const fs = require('fs');
    const { readdirSync } = fs;
    const files = readdirSync(dirPath).filter((p) => p !== '.' && p !== '..');
    const res = {};
    files.forEach((file) => {
      res[`/${file}`] = `${dirPath}/${file}`;
    });
    return res;
  }
  getEnv(req) {
    return {
      __ROOT_STATE__: {
        token: req.token,
        user: req.user,
        req: {
          token: req.token,
          user: req.user,
        },
        config: this.config.client || {},
      },
      __DEV__: global.__DEV__,
      __STAGE__: global.__STAGE__,
    };
  }
  getStatics() {
    if (this.config && this.config.public) {
      return this.getStaticsDir(this.config.public);
    }
    return {};
  }
  _getStatics() {
    return mapValues(this.getStatics() || {}, (p) => path.resolve(p));
  }
  runStatics() {
    forEach(this.statics, (_path, url) => {
      this.express.use(url, this.Express.static(_path));
      this.express.use(url, staticFileMiddleware(_path));
    });
  }
  getUsingMiddlewares() {
    return [this.middlewares.reqParser, this.middlewares.reqUser, this.middlewares.lsk];
  }
  initWs() {
    this.ws = createWs(this);
    this.ws.wrapExpress(this.express);
  }
  async runWs() {
    if (!this.config.ws) return;
    if (this.debug) this.log.trace('runWs');
    this.ws.serveClient(false);
    this.ws.attach(this.httpServer);
    const transports = this.config.ws.transports || ['websocket'];
    this.ws.set('transports', transports);
    if (this.config.ws.origins) this.ws.set('origins', this.config.ws.origins);
  }
  runMiddlewares() {
    if (this.debug) this.log.trace('runMiddlewares');
    const middlewares = flattenDeep(this.getUsingMiddlewares());
    middlewares.forEach((middleware) => {
      if (middleware && typeof middleware === 'function') this.express.use(middleware);
    });
  }
  runDefaultRoute() {
    if (this.debug) this.log.trace('runDefaultRoute');
    this.express.use((req, res, next) => {
      next(new Err('ROUTE_NOT_FOUND', { status: 404 }));
    });
  }
  runCatchErrors() {
    if (this.middlewares.catchError) this.express.use(this.middlewares.catchError);
  }
  getDocsRouter = require('./methods/getDocsRouter').default;
  getDocsTemplate = () => 'deprecated';
  expressResolve = require('./methods/expressResolve').default;
  useApi = require('./methods/useApi').default;
  async getAvailablePort() {
    const port = await getPortPromise({
      port: this.config.port || 8000,
      stopPort: this.config.stopPort || 9000,
      // stopPort: 3333, // maximum port
    });
    return port;
  }
  async run() {
    await super.run();
    // if (this.config.ws) await this.runWs();
    await this.runStatics();
    await this.runMiddlewares();
    if (this.Api) {
      await this.useApi(this.Api);
    } else {
      this.log.warn('!Api');
    }
    await this.runDefaultRoute();
    await this.runCatchErrors();
    const port = await this.getAvailablePort();
    await new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(port, () => {
        resolve(this);
        this.log.debug('started', { port });
        this.emit('started');
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
    });
  }
}

export default WebserverModule;
