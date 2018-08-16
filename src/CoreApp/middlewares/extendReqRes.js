import forEach from 'lodash/forEach';
export default ctx => (
  (req, res, next) => {
    if (ctx.requests) {
      forEach(ctx.requests, (val, key) => {
        req[key] = val.bind(req);
      });
    }
    if (ctx.responses) {
      forEach(ctx.responses, (val, key) => {
        res[key] = val.bind(res);
      });
    }
    next();
  }
);
