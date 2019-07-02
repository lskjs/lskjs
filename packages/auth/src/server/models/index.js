/* eslint-disable global-require */
export default (...args) => ({
  UserModel: require('./UserModel').default(...args),
  PassportModel: require('./PassportModel').default(...args),
});
