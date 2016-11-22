import _ from 'lodash'
export default (ctx) => ([
  (req, res, next) => {
    if (ctx.requests) {
      _.forEach(ctx.requests, (val, key) => {
        req[key] = val.bind(req)
      })
      // if (req.allParams) {
      //   req.params = req.allParams.bind(req)()
      // }
    }
    if (ctx.responses) {
      _.forEach(ctx.responses, (val, key) => {
        res[key] = val.bind(res)
      })
    }
    next()
  }
])
