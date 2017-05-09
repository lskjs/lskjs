export default function () {
  return {
    vkontakte: require('./vkontakte').default(...arguments),
    youtube: require('./youtube').default(...arguments),
  };
}
