export default (ctx) =>
  function parserToken(req, res, next) {
    const token = ctx.helpers.getToken(req);
    req.token = token;
    next();
  };
