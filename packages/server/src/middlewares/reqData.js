import get from 'lodash/get';

export default (ctx) => {
  if (!get(ctx, 'config.middlewares.reqData')) return null;
  return function reqData(req, res, next) {
    req.data = req.allParams();
    next();
  };
};
