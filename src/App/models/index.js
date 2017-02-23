export default function () {
  return {
    User: require('./User').default(...arguments),
    Category: require('./Category').default(...arguments),
    // Tag: require('./Tag').default(...arguments),
    // Pet: require('./Pet').default(...arguments),
    // Counter: require('./Counter').default(...arguments),
    Task: require('./Task').default(...arguments),
    Game: require('./Game').default(...arguments),
  };
}
