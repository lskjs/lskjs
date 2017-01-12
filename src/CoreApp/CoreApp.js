import express from 'express'
import path from 'path'
import _ from 'lodash'

import ExpressApp from 'lego-starter-kit/ExpressApp'

import getMongoose from './getMongoose'
import getErrors from './getErrors'
import getHelpers from './getHelpers'
import getMiddlewares from './middlewares'
import getModels from './models'
import getResourses from './resourses'
import getDocsTemplate from './getDocsTemplate'

export default class CoreApp extends ExpressApp {
  init() {
    this.log.trace('CoreApp init')

    this.db = this.getDatabase()
    this.requests = this.getRequests()
    this.log.trace('requests', Object.keys(this.requests))
    this.responses = this.getResponses()
    this.log.trace('responses', Object.keys(this.responses))
    this.errors = this.getErrors()
    this.log.trace('errors', Object.keys(this.errors))
    this.middlewares = this.getMiddlewares()
    this.log.trace('middlewares', Object.keys(this.middlewares))
    this.models = this.getModels()
    this.log.trace('models', Object.keys(this.models))
    this.resourses = this.getResourses()
    this.log.trace('resourses', Object.keys(this.resourses))
    this.helpers = this.getHelpers()
    this.log.trace('helpers', Object.keys(this.helpers))
    this.statics = this.getResolvedStatics()
    this.log.trace('statics', this.statics)

    super.init(...arguments)
  }
  getMiddlewares() {
    return getMiddlewares(this)
  }
  getModels() {
    return getModels(this)
  }
  getDatabase() {
    return this.config.db && getMongoose(this, this.config.db)
  }
  getErrors() {
    return getErrors(this)
  }
  getResourses() {
    return getResourses(this)
  }
  getRequests() {
    return require('./requests')
  }
  getResponses() {
    return require('./responses')
  }
  getHelpers() {
    return getHelpers(this)
  }
  getStatics() {
    return {}
  }
  getResolvedStatics() {
    return _.mapValues(this.getStatics() || {}, p => path.resolve(p))
  }
  useStatics() {
    _.forEach(this.getResolvedStatics(), (path, url) => {
      this.app.use(url, express.static(path))
    })
  }

  useStaticPublic(publicPath, urlPath = null) {
    if (!publicPath) {
      publicPath = path.join(__dirname, 'public')
    } else {
      publicPath = path.join(publicPath)
    }
    if (urlPath == null) {
      urlPath = '/'
    }
    // this.statics[urlPath] = publicPath
    this.log.trace(`Static attach ${urlPath} => ${publicPath}`)
    this.app.use(urlPath, express.static(publicPath))
  }

  beforeUseMiddlewares() {
    super.beforeUseMiddlewares();
    [
      this.middlewares.extendReqRes,
      this.middlewares.reqLog,
      this.middlewares.accessLogger,
      this.middlewares.reqParser,
      this.resourses.Auth.parseToken,
      this.resourses.Auth.parseUser,
    ].forEach(middleware => {
      middleware && this.app.use(middleware);
    });
  }

  acl() {
    return (req, res, next) => {
      next()
    }
  }

  getDocsRouter(getDocs, params) {
    const api = this.asyncRouter()
    const docsParams = Object.assign({}, params, {
      docs: `${params.path || '/api'}/docs`,
      docsJson: `${params.path || '/api'}/docs/json`,
    })
    api.all('/', (req, res) => res.json(docsParams))
    api.all('/docs', (req, res) => res.send(getDocsTemplate(this, docsParams)))
    api.all('/docs/json', (req, res) => res.json(getDocs(this, docsParams)))
    return api
  }

  useMiddlewares() {
  }

  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = this.errors.e404('Route not found')
      next(err)
    })
  }
  afterUseMiddlewares() {
    this.middlewares.catchError && this.app.use(this.middlewares.catchError);
  }

  run(...args) {
    this.log.trace('CoreApp run')

    if (this.db) {
      const promise = this.db.run()
      return promise.then(() => {
        return super.run(...args).then(() => {
          this.afterRun()
        })
      }).catch(err => {
        this.log.fatal(err)
      })
    }

    return super.run(...args)
  }

  afterRun() {

  }
}
