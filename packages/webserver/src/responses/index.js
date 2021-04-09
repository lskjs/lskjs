export default (...args) => ({
  err: require('./err').default(...args),
  ok: require('./ok').default(...args),
  pack: require('./pack').default(...args),
});
