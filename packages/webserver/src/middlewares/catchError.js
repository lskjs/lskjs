/* eslint-disable no-unused-vars */
import get from 'lodash/get';

export default (webserver) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function catchError(err, req, res, next) {
    const status = (err && err.status) || 500;
    const isErrorLogger = get(webserver, 'config.middlewares.lsk.errorLogger') || false;
    const r = {
      url: req.url,
    };
    if (req.query && Object.keys(req.query).length) r.query = req.query;
    if (req.body && Object.keys(req.body).length) r.body = req.body;
    if (req.headers && Object.keys(req.headers).length) r.headers = req.headers;
    if (isErrorLogger) {
      // if (get(err, 'level', 'error') === 'error') {
      if (webserver && webserver.log) {
        if (status >= 500) {
          webserver.log.error(err);
        } else if (status >= 400) {
          webserver.log.debug(err);
        }
        webserver.log.trace('[req]', r);
      } else {
        console.error(err); // eslint-disable-line no-console
        // eslint-disable-next-line no-console
        console.log('[req]', r);
      }
    }
    // }
    res.status(status);
    if (res.err) return res.err(err);
    return res.json(err);
  };
