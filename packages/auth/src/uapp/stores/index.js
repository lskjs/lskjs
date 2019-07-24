export default function () {
  return {
    // AuthApi: require('./AuthApi').default(...arguments),
    SessionStore: require('./SessionStore').default(...arguments),
    PassportStore: require('./PassportStore').default(...arguments),
    Passports: require('./PassportStore').default(...arguments),
  };
}
