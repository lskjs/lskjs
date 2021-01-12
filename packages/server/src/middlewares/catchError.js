/* eslint-disable no-unused-vars */
import get from 'lodash/get';

export default (webserver) =>
  function catchError(err, req, res, next) {
    if (get(webserver, 'config.middlewares.errorLogger')) {
      // if (get(err, 'level', 'error') === 'error') {
      if (req && req.log && req.log.error) {
        req.log.error(
          {
            err,
            query: req.query,
            body: req.body,
            headers: req.headers,
          },
          (err || {}).stack,
        );
      } else {
        console.error(err); // eslint-disable-line no-console
      }
    }
    // }
    res.status(err.status || 500);
    if (res.err) return res.err(err);
    return res.json(err);
  };
