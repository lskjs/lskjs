export default function () {
  return {
    accessLogger: require('./accessLogger').default(...arguments),
    reqParser: require('./reqParser').default(...arguments),
    catchError: require('./catchError').default(...arguments),
    reqLog: require('./reqLog').default(...arguments),
    extendReqRes: require('./extendReqRes').default(...arguments),
  }
}
