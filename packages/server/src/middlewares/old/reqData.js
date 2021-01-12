import get from 'lodash/get';
import getReqData from '../utils/getReqData';

export default (ctx) => {
  if (!get(ctx, 'serverConfig.middlewares.reqData')) return null;
  return function reqData(req, res, next) {
    req.data = getReqData(req, get(ctx, 'config.middlewares.reqData.parse'));
    next();
  };
};
