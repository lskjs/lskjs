export default function () {
  return {
    Passports: require('./Passports').default(...arguments),
  };
}
