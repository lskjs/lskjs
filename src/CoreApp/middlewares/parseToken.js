
export default ctx => (
  function parseToken(req, res, next) {
    const token = ctx.helpers.getToken(req);
    req.token = token;
    next();
  }
);
