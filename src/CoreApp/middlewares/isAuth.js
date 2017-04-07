export default ctx => (
  function isAuth(req, res, next) {
    try {
      if (!ctx.helpers.isAuth(req)) {
        next('!isAuth');
      }
      next();
    } catch(err) {
      next(err)
    }
  }
);
