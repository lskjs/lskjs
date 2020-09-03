// import uuid from 'uuid';
import { nanoid } from 'nanoid/non-secure';
// import nanoid from 'nanoid';

export default (ctx) => (req, res, next) => {
  if (__DEV__) {
    global.reqId = 1 + (global.reqId || 0);
    req.reqId = global.reqId;
  } else {
    req.reqId = nanoid();
  }
  if (ctx.log) {
    req.log = ctx.log.child({
      reqId: req.reqId,
    });
  }
  next();
};
