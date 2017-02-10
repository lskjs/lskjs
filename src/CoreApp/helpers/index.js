export default function () {
  return {
    checkNotFound: require('./checkNotFound').default(...arguments), // eslint-disable-line
    createResourse: require('./createResourse').default(...arguments), // eslint-disable-line
    getToken: require('./getToken').default(...arguments), // eslint-disable-line
    wrapResourse: require('./wrapResourse').default(...arguments), // eslint-disable-line
  };
}
