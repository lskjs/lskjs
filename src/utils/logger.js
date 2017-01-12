import bunyan from 'bunyan'

const logger = (ctx) => {
  return bunyan.createLogger({
    name: ctx.name,
    src: __DEV__,
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
}
export default logger
