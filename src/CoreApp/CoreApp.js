import express from 'express';
import path from 'path';
import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import flattenDeep from 'lodash/flattenDeep';
import map from 'lodash/map';
import Api from 'apiquery';
import staticFileMiddleware from 'connect-static-file';

import ExpressApp from '../ExpressApp';
import createWs from './ws';
import getMongoose from './getMongoose';
import I19 from '../Uapp/i19';


export default class CoreApp extends ExpressApp {
  Api = Api;
  async init() {
    super.init(...arguments);
    this.log.trace('CoreApp init');
    this.db = await this.getDatabase();
    this.requests = this.getRequests();
    this.log.debug('requests', Object.keys(this.requests));
    this.responses = this.getResponses();
    this.log.debug('responses', Object.keys(this.responses));
    this.errors = this.getErrors();
    this.log.debug('errors', Object.keys(this.errors));
    this.middlewares = this.getMiddlewares();
    this.log.debug('middlewares', Object.keys(this.middlewares));
    this.models = this.getMongooseModels();
    this.log.debug('models', Object.keys(this.models));
    this.resourses = this.getResourses();
    this.log.debug('resourses', Object.keys(this.resourses));
    this.helpers = this.getHelpers();
    this.log.debug('helpers', Object.keys(this.helpers));
    this.statics = this.getResolvedStatics();
    this.log.debug('statics', this.statics);
    this.api = new this.Api({
      url: `http://127.0.0.1:${this.config.port}`,
      log: this.log,
    });
    this.config.ws && this.initWs();
    this.initI18();
    this.i19 = new I19(this);
    await this.i19.init();
  }

  url(str, params = null) {
    let query = '';
    if (params) {
      query = `?${map(params, (val, key) => `${key}=${val}`).join('&')}`;
    }
    return `${this.config.url}${str}${query}`;
  }

  emit(...args) {
    this.modules.events && this.modules.events.emit(...args); // eslint-disable-line
  }
  on(...args) {
    this.modules.events && this.modules.events.on(...args); // eslint-disable-line
  }
  once(...args) {
    this.modules.events && this.modules.events.once(...args); // eslint-disable-line
  }

  getMiddlewares() {
    return require('./middlewares').default(this); // eslint-disable-line
  }
  getMongooseModels() {
    const models = this.getModels();
    return mapValues(models, (model) => {
      if (model._universal) {
        return model.getMongooseModel(this.db);
      }
      return model;
    });
  }
  getModels() {
    return require('./models').default(this); // eslint-disable-line
  }
  getDatabase() {
    return this.config.db && getMongoose(this, this.config.db);
  }
  getErrors() {
    return require('./getErrors').default(this); // eslint-disable-line
  }
  getResourses() {
    return require('./resourses').default(this); // eslint-disable-line
  }
  getRequests() {
    return require('./requests').default(this); // eslint-disable-line
  }
  getResponses() {
    return require('./responses').default(this); // eslint-disable-line
  }
  getHelpers() {
    return require('./helpers').default(this); // eslint-disable-line
  }
  getStatics() {
    const buildRoot = `${__dirname}/public`;
    const root = __DEV__ ? `${__dirname}/../public` : buildRoot;
    return {
      '/': root,
      // '/favicon.ico': buildRoot + require('file-loader!../public/favicon.ico'), // eslint-disable-line
    };
  }
  getResolvedStatics() {
    return mapValues(this.getStatics() || {}, p => path.resolve(p));
  }
  useStatics() {
    forEach(this.statics, (_path, url) => {
      this.app.use(url, express.static(_path));
      this.app.use(url, staticFileMiddleware(_path));
    });
  }

  useStaticPublic(publicPath, urlPath = null) {
    this.log.trace('DEPRECATED');
  }

  getUsingMiddlewares() {
    return [
      this.middlewares.extendReqRes,
      this.middlewares.reqLog,
      this.middlewares.accessLogger,
      this.middlewares.reqParser,
      this.middlewares.reqData,
      this.middlewares.parseToken,
      this.middlewares.parseUser,
      this.middlewares.i18,
    ];
  }

  acl() {
    return (req, res, next) => {
      next();
    };
  }

  initWs() {
    this.ws = createWs(this);
    this.ws.wrapExpress(this.app);
  }
  async afterInit() {
    await this.runModels();
  }

  async runWs() {
    if (!this.config.ws) return;
    this.ws.serveClient(false);
    this.ws.attach(this.httpServer);
    const transports = this.config.ws.transports || ['websocket'];
    this.ws.set('transports', transports);
  }

  useMiddlewares() {
    this.log.trace('CoreApp.useMiddlewares');
    const middlewares = flattenDeep(this.getUsingMiddlewares());
    middlewares.forEach((middleware) => {
      middleware && typeof middleware === 'function' && this.app.use(middleware);
    });
  }
  useDefaultRoute() {
    this.log.trace('CoreApp.useDefaultRoute');
    // console.log('useDefaultRoute');
    this.app.use((req, res, next) => {
      const err = this.errors.e404('Route not found');
      next(err);
    });
  }

  useCatchErrors() {
    this.middlewares.catchError && this.app.use(this.middlewares.catchError);
  }

  runModels() {
    const promises = map(this.models, async (model, name) => {
      if (model.run) {
        this.models[name] = await model.run(this);
      }
    });
    return Promise.all(promises);
  }


  getDocsRouter = require('./methods/getDocsRouter').default;
  getDocsTemplate = require('./methods/getDocsTemplate').default;

  resolve = require('./methods/resolve').default;
  runRedis = require('./methods/runRedis').default;

  getI18 = require('../Uapp/i18/getI18').default;
  getI18Params = require('../Uapp/i18/getI18Params').default;
  getLocale = require('../Uapp/i18/getLocale').default;
  initI18 = require('../Uapp/i18/initI18').default;


  async run(...args) {
    await super.run(...args);
    this.log.trace('CoreApp.run');
    // console.log('this.config.db', this.config, this.config?.db);

    this.config.db && this.db && await this.db.run();
    this.config.ws && await this.runWs();
    this.config.redis && await this.runRedis();
  }

  async stop() {
    await super.stop();
    this.db && await this.db.stop();
  }
}
