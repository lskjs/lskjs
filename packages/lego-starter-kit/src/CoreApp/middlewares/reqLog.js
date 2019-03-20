import uuid from 'uuid';

export default ctx => (
  (req, res, next) => {
    if (__DEV__) {
      global.reqId = 1 + (global.reqId || 0);
      req.reqId = global.reqId;
    } else {
      req.reqId = uuid.v4();
    }
    if (ctx.log) {
      req.log = ctx.log.child({
        reqId: req.reqId,
      });
    }
    next();
  }
);
