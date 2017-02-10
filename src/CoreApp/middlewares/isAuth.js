export default ctx => (
  function isAuth(req, res, next) {
    if (req._errJwt) return next(req._errJwt);
    if (!req.user || !req.user._id) throw ctx.errors.e401('!req.user');
    next();
  }
);
