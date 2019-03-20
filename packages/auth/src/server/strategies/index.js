export default function () {
  return {
    youtube: require('./youtube').default(...arguments),
    vkontakte: require('./vkontakte').default(...arguments),
    facebook: require('./facebook').default(...arguments),
    telegram: require('./telegram').default(...arguments),
  };
}
