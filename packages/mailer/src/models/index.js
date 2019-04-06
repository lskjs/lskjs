export default function () {
  return {
    Email: require('./Email').default(...arguments), // eslint-disable-line prefer-rest-params
  };
}
