export default function () {
  return {
    isAuth: require('./isAuth').default(...arguments), // eslint-disable-line
    checkNotFound: require('./checkNotFound').default(...arguments), // eslint-disable-line
    createResourse: require('./createResourse').default(...arguments), // eslint-disable-line
    getToken: require('./getToken').default(...arguments), // eslint-disable-line
    wrapResourse: require('./wrapResourseRestful').default(...arguments), // eslint-disable-line
    wrapResourseRestful: require('./wrapResourseRestful').default(...arguments), // eslint-disable-line
    wrapResoursePoint: require('./wrapResoursePoint').default(...arguments), // eslint-disable-line
  };
}
