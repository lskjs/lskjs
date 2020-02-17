export default (...args) => ({
  accessLogger: require('./accessLogger').default(...args),
  reqParser: require('./reqParser').default(...args),
  catchError: require('./catchError').default(...args),
  parseUser: require('./parseUser').default(...args),
  parseToken: require('./parseToken').default(...args),
  reqData: require('./reqData').default(...args),
  reqLog: require('./reqLog').default(...args),
  extendReqRes: require('./extendReqRes').default(...args),
  i18: require('./i18').default(...args),
});
