import forEach from 'lodash/forEach';

export default ctx => (req, res, next) => {
  if (ctx.responses) {
    forEach(ctx.responses, (val, key) => {
      res[key] = val.bind(res);
    });
  }
  next();
};
