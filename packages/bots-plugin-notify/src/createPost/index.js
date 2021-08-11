export default {
  monitoring: require('./monitoring').default,
  alertmanager: require('./alertmanager').default,
  github: require('./github').default,
  gitlab: require('./gitlab').default,
};
