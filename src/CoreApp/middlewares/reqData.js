import _ from 'lodash';
export default (ctx) => {
  if (!_.has(ctx, 'config.middlewares.reqData')) return null;
  return function reqData(req, res, next) {
    req.data = req.allParams();
    next();
  };
};
