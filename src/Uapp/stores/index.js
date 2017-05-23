export default function () {
  return {
    Entity: require('./Entity').default(...arguments),
    List: require('./List').default(...arguments),

    Auth: require('./Auth').default(...arguments),
    User: require('./User').default(...arguments),
    Users: require('./Users').default(...arguments),
    // Users: require('./Users').default(...arguments),
  };
}
