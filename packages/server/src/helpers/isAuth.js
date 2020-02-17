export default ctx => {
  return function isAuth(req) {
    if (req._errJwt) throw req._errJwt;
    if (!req.user || !req.user._id) throw ctx.e('!req.user', { status: 401 });
    return true;
  };
};
