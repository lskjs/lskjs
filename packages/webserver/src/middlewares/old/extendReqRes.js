import forEach from 'lodash/forEach';

export default (ctx) =>
  function extendReqRes(req, res, next) {
    if (ctx.responses) {
      forEach(ctx.responses, (val, key) => {
        res[key] = val.bind(res);
      });
    }
    next();
  };
