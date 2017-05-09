export default function () {
  return {
    User: require('./User').default(...arguments),
    Passport: require('./Passport').default(...arguments),
  };
}
