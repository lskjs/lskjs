export default function () { // eslint-disable-line
  return {
    accessLogger: require('./accessLogger').default(...arguments), // eslint-disable-line
    reqParser: require('./reqParser').default(...arguments), // eslint-disable-line
    catchError: require('./catchError').default(...arguments), // eslint-disable-line
    isAuth: require('./isAuth').default(...arguments), // eslint-disable-line
    parseUser: require('./parseUser').default(...arguments), // eslint-disable-line
    parseToken: require('./parseToken').default(...arguments), // eslint-disable-line
    reqData: require('./reqData').default(...arguments), // eslint-disable-line
    reqLog: require('./reqLog').default(...arguments), // eslint-disable-line
    extendReqRes: require('./extendReqRes').default(...arguments), // eslint-disable-line
  };
}
