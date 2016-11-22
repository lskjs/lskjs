import jwt from 'express-jwt'
import asyncRouter from 'lego-starter-kit/utils/AsyncRouter'

export default (ctx) => {
  return {
    parseUser(req, res, next) {
      console.log("parseUser DEPRECATED")
      const options = {
        secret: ctx.config.jwt.secret,
        getToken: function fromHeaderOrQuerystring(req) {
          if (req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer') {
            return req.headers.authorization.split( ' ' )[ 1 ]
          } else if (req.headers['x-access-token']) {
						return req.headers['x-access-token'];
		      } else if ( req.query && req.query.token ) {
            return req.query.token
          }
          if (__DEV__ && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken
          return null;
        }
      }
      jwt(options)(req, res, (err) => {
        if (err) req._errJwt = err
        next()
      })
    },

    isAuth(req, res, next) {
      if (req._errJwt) return next(req._errJwt)
      if (!req.user || !req.user._id) throw ctx.errors.e401('!req.user')
      next()
    },

    checkNotFound(data) {
      if (!data) throw ctx.errors.e404('Object not found')
      return Promise.resolve(data)
    },


    createResourse(Model) {
      return {
        list() {
          return Model.find({})
        },
        create(req) {
          const data = req.allParams()
          return Model.create(data)
        },
        get(req) {
          const id = req.params.id
          return Model.findById(id).then(ctx.helpers.checkNotFound)
        },
        update(req) {
          const id = req.allParams().id
          const data = req.allParams()
          return Model.findByIdAndUpdate(id, data, { new: true }).then(ctx.helpers.checkNotFound)
        },
        remove(req) {
          const id = req.allParams().id
          return Model.findByIdAndRemove(id).then(ctx.helpers.checkNotFound)
        },
      }
    },

    wrapResourse(resourse, params = {}) {
      const api = params.api || asyncRouter()
      const prefix = params.prefix || ''
      const middleware = params.middleware || function(){}
      api.get(`${prefix}/`, middleware, resourse.list)
      api.post(`${prefix}/`, middleware, resourse.create)
      api.get(`${prefix}/:id`, middleware, resourse.get)
      api.all(`${prefix}/:id/create`, middleware, resourse.create)
      api.put(`${prefix}/:id`, middleware, resourse.update)
      api.all(`${prefix}/:id/update`, middleware, resourse.update)
      api.delete(`${prefix}/:id`, middleware, resourse.remove)
      api.all(`${prefix}/:id/remove`, middleware, resourse.remove)
      return api
    }
  }
}
