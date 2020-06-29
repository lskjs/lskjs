/* eslint-disable no-unused-vars */
import get from 'lodash/get';

export default () =>
  function (err, req, res, next) {
    if (get(err, 'level', 'error') === 'error') {
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
    res.status(err.status || 500);
    if (res.err) return res.err(err);
    // if (false) next()
    return res.json(err);
  };
