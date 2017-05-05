export default function () {
  return {
    Passport: require('./Passport').default(...arguments),
  };
}
