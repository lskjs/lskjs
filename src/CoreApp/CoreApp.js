import express from 'express'
import path from 'path'
import _ from 'lodash'

import asyncRouter from 'lego-starter-kit/utils/AsyncRouter'
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

    super.init(...arguments)
  }
  getMiddlewares() {
    return getMiddlewares(this)
  }
  getModels() {
    return getModels(this)
  }
  getDatabase() {
    return getMongoose(this, this.config.db)
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
  useStaticPublic(publicPath, urlPath = null) {
    if (!publicPath) {
      publicPath = path.join(__dirname, 'public')
    } else {
      publicPath = path.join(publicPath)
    }
    if (urlPath == null) {
      urlPath = '/'
    }
    this.log.trace(`Static attach ${urlPath} => ${publicPath}`)
    this.app.use(urlPath, express.static(publicPath))
  }

  useWebSockets() {

  }

  useGraphql() {

  }


  beforeUseMiddlewares() {
    super.beforeUseMiddlewares()
    this.app.use(this.middlewares.extendReqRes)
    this.app.use(this.middlewares.reqLog)
    this.app.use(this.middlewares.accessLogger)
    this.app.use(this.middlewares.reqParser)
    this.app.use(this.resourses.Auth.parseToken)
    this.app.use(this.resourses.Auth.parseUser)
  }

  acl() {
    return (req, res, next) => {
      next()
    }
  }

  getAuthApi() {
    return getAuthApi(this)
  }

  getDocsRouter(getDocs, params) {
    const api = asyncRouter()
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
    this.useStaticPublic()
    this.useWebSockets()
    this.useGraphql()
  }

  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = this.errors.e404('Route not found')
      next(err)
    })
  }
  afterUseMiddlewares() {
    this.app.use(this.middlewares.catchError)
  }

  run(...args) {
    this.log.trace('CoreApp run')
    const promise = this.db.run()
    return promise.then(() => {
      return super.run(...args).then(() => {
        // this.useWebSockets()
      })
    }).catch(err => {
      this.log.fatal(err)
    })
  }
}
