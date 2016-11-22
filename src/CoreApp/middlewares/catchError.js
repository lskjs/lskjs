export default (ctx) => (
  (err, req, res, next) => {
    if (req && req.log && req.log.error) {
      req.log.error({
        err,
        query: req.query,
        body: req.body,
        headers: req.headers
      }, (err || {}).stack)
    } else {
      console.log(err)
    }
    res.status(err.status || 500)
    if (res.err) return res.err(err)
    return res.json(err)
  }
)
