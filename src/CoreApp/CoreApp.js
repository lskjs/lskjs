import express from 'express';
import path from 'path';
import _ from 'lodash';

import ExpressApp from 'lego-starter-kit/ExpressApp';

import createSockets from './sockets';
import getMongoose from './getMongoose';
import getDocsTemplate from './getDocsTemplate';

export default class CoreApp extends ExpressApp {
  init() {
    super.init(...arguments);
    this.log.trace('CoreApp init');

    this.db = this.getDatabase();
    this.requests = this.getRequests();
    this.log.trace('requests', Object.keys(this.requests));
    this.responses = this.getResponses();
    this.log.trace('responses', Object.keys(this.responses));
    this.errors = this.getErrors();
    this.log.trace('errors', Object.keys(this.errors));
    this.middlewares = this.getMiddlewares();
    this.log.trace('middlewares', Object.keys(this.middlewares));
    this.models = this.getModels();
    this.log.trace('models', Object.keys(this.models));
    this.resourses = this.getResourses();
    this.log.trace('resourses', Object.keys(this.resourses));
    this.helpers = this.getHelpers();
    this.log.trace('helpers', Object.keys(this.helpers));
    this.statics = this.getResolvedStatics();
    this.log.trace('statics', this.statics);
  }
  getMiddlewares() {
    return require('./middlewares').default(this); // eslint-disable-line
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
    return {};
  }
  getResolvedStatics() {
    return _.mapValues(this.getStatics() || {}, p => path.resolve(p));
  }
  useStatics() {
    _.forEach(this.getResolvedStatics(), (path, url) => {
      this.app.use(url, express.static(path));
    });
  }

  useStaticPublic(publicPath, urlPath = null) {
    // if (!publicPath) {
    //   publicPath = path.join(__dirname, 'public');
    // } else {
    //   publicPath = path.join(publicPath);
    // }
    // if (urlPath == null) {
    //   urlPath = '/';
    // }
    // this.statics[urlPath] = publicPath
    this.log.trace('DEPRECATED');
    // this.log.trace(`Static attach ${urlPath} => ${publicPath}`);
    // this.app.use(urlPath, express.static(publicPath));
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
    ];
  }

  acl() {
    return (req, res, next) => {
      next();
    };
  }

  getDocsRouter(getDocs, params) {
    const api = this.asyncRouter();
    const docsParams = Object.assign({}, params, {
      docs: `${params.path || '/api'}/docs`,
      docsJson: `${params.path || '/api'}/docs/json`,
    });
    api.all('/', (req, res) => res.json(docsParams));
    api.all('/docs', (req, res) => res.send(getDocsTemplate(this, docsParams)));
    api.all('/docs/json', (req, res) => res.json(getDocs(this, docsParams)));
    return api;
  }

  createExpressApp() {
    const app = super.createExpressApp();

    // asdasdsa();
    this.config.sockets && this.useSockets(app);
    return app;
  }

  async useSockets(app) {
    if (!this.config.sockets) return;
    this.log.trace('CoreApp.useSockets');
    this.io = createSockets(this);
    app.ws = (route, callback) => {
      if (typeof callback !== 'function') throw '!ws callback(namespace)';
      const namespace = this.io.of(route);
      this.io.atachMiddlwares(namespace);
      callback(namespace);
    };
  }

  async runSockets() {
    if (!this.config.sockets) return;
    this.io.serveClient(false);
    this.io.attach(this.httpServer);
    const transports = this.config.sockets.transports || ['websocket'];
    this.io.set('transports', transports);
  }

  useMiddlewares() {
    const middlewares = _.flattenDeep(this.getUsingMiddlewares());
    middlewares.forEach((middleware) => {
      middleware && typeof middleware === 'function' && this.app.use(middleware);
    });
    this.afterUseMiddlewares();
  }
  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = this.errors.e404('Route not found');
      next(err);
    });
  }
  afterUseMiddlewares() {
    this.middlewares.catchError && this.app.use(this.middlewares.catchError);
  }


  async runDb() {
    if (!this.db) return;
    this.log.trace('CoreApp.runDb');
    try {
      return this.db.run();
    } catch (err) {
      this.log.fatal(err);
      throw err;
    }
  }


  async run(...args) {
    this.log.trace('CoreApp.run');
    this.config.db && this.db && await this.runDb();
    await super.run(...args);
    this.config.sockets && await this.runSockets();
    await this.afterRun();
  }

  afterRun() {

  }
}
