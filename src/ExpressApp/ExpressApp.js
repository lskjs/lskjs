import bunyan from 'bunyan'
import express from 'express'
import { Server as httpServer} from 'http'

export default class ExpressApp {
  constructor(params = {}) {
    Object.assign(this, params)
    // super(...arguments)
    if (!this.log) this.log = this.getLogger()
    this.init()
  }
  getExpress() {
    return express()
  }
  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      src: __DEV__,
      level: 'trace',
    }, params))
  }
  init() {
    this.log.trace('ExpressApp init')
    this.app = this.getExpress()
    this.appServer = httpServer(this.app)

    this.beforeUseMiddlewares()
    this.useMiddlewares()
    this.useRoutes()
    this.useDefaultRoute()
    this.afterUseMiddlewares()
  }

  beforeUseMiddlewares() {}
  useMiddlewares() {}
  useRoutes() {}
  useDefaultRoute() {
    this.app.use((req, res) => {
      return res.send(`Hello World from "${this.config.name}"`)
    })
  }
  afterUseMiddlewares() {}

  async run() {
    this.log.trace('ExpressApp run')

    return new Promise((resolve) => {
      this.appInstance = this.appServer.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`)
        resolve(this)
      })
    })
  }
}
