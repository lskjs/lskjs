import uuid from 'uuid'

export default (params) => ([
  (req, res, next) => {
    if (__PROD__) {
      req.reqId = uuid.v4()
    } else {
      global.reqId = 1 + (global.reqId || 0)
      req.reqId = global.reqId
    }
    if (params.log) {
      req.log = params.log.child({
        reqId: req.reqId,
      });
    }
    next()
  },
])
