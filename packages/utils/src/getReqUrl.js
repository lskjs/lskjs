import getReqOrigin from './getReqOrigin';

export default (req) => getReqOrigin(req) + req.originalUrl;
