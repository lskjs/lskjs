import e from '@lskjs/utils/e';

export default app => async (req, res, next) => {
  req.getLocale = () => {
    if (req.data && req.data.locale) return req.data.locale;
    if (req.user && req.user.locale) return req.user.locale;
    return null;
  };
  req.i18 = await app.i18.getI18({ lng: req.getLocale() });
  req.t = (...args) => req.i18.t(...args);
  req.e = e.bind(req);
  next();
};
