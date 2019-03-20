export default function () {
  return {
    User: require('./User').default(...arguments),
    Passport: require('./Passport').default(...arguments),
    // UserModel: require('./User').default(...arguments),
    // PassportModel: require('./Passport').default(...arguments),
  };
}
