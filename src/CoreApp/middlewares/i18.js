export default ctx => async (req, res, next) => {
  req.getLocale = () => {
    const locale = req.data.locale;  //eslint-disable-line
    if (locale) return locale.split('-')[0];
    return null;
  };
  req.i18 = await ctx.getI18({ lng: req.getLocale() });
  req.t = (...args) => {
    return req.i18.t(...args);
  };
  next();
};
