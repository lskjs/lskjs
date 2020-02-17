export default ctx => (req, res, next) => {
  const token = ctx.helpers.getToken(req);
  req.token = token;
  next();
};
