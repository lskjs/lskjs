import uuid from 'uuid';

export default ctx => (
  (req, res, next) => {
    if (__PROD__) {
      req.reqId = uuid.v4();
    } else {
      global.reqId = 1 + (global.reqId || 0);
      req.reqId = global.reqId;
    }
    if (ctx.log) {
      req.log = ctx.log.child({
        reqId: req.reqId,
      });
    }
    next();
  }
);
