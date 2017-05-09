export default ctx => (
  function isAuth(req, res, next) {
    try {
      if (!ctx.helpers.isAuth(req)) {
        return next('!isAuth');
      }
      return next();
    } catch(err) {
      next(err)
    }
  }
);
