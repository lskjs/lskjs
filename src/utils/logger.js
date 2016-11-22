import bunyan from 'bunyan'

const logger = (ctx) => {
  const logger = bunyan.createLogger({
    name: ctx.name,
    src: ctx.__DEV__,
    level: 'trace'
    // serializers: {
    //   req: (req) => {
    //     return {
    //       reqId: req.reqId,
    //       method: req.method,
    //       url: req.url,
    //       headers: req.headers
    //     };
    //   }
    // }``
  })
  return logger
}
export default logger
