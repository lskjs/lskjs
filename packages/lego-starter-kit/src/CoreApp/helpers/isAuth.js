export default (ctx) => {
  return function isAuth(req) {
    if (req._errJwt) throw req._errJwt;
    if (!req.user || !req.user._id) throw ctx.errors.e401('!req.user');
    return true;
  };
};
