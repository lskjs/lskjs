export default (...args) => ({
  SessionStore: require('./SessionStore').default(...args),
  PassportStore: require('./PassportStore').default(...args),
});
