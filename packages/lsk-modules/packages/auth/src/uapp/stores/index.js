export default function () {
  return {
    PassportStore: require('./PassportStore').default(...arguments),
    Passports: require('./PassportStore').default(...arguments),
  };
}
