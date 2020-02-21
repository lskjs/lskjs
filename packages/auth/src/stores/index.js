export default (...args) => ({
  AuthStore: require('./AuthStore').default(...args),
  SessionStore: require('./SessionStore').default(...args),
  PassportStore: require('./PassportStore').default(...args),
});
