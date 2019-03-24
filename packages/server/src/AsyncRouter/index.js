import { AsyncRouter } from './express-async-router';

export default (params) => {
  const paramsWithDefaultSender = Object.assign({
    sender: (req, res, val) => res.ok(val),
  }, params);

  return AsyncRouter(paramsWithDefaultSender);
};
