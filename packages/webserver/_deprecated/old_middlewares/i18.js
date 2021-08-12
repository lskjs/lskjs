import e from '@lskjs/utils/e';

export default (app) =>
  async function i18(req, res, next) {
    try {
      if (!req.getLocale) {
        req.getLocale = () => {
          if (req.data && req.data.locale) return req.data.locale;
          if (req.user && req.user.locale) return req.user.locale;
          if (req.cookies && req.cookies.locale) return req.cookies.locale;
          return null;
        };
      }
      req.i18 = await app.i18.getI18({ lng: req.getLocale() });
      req.t = (...args) => req.i18.t(...args);
      req.e = e.bind(req);
      next();
    } catch (err) {
      next(err);
    }
  };
