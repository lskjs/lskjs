export default function () {
  return {
    Post: require('./Post').default(...arguments),
    // Like: require('./Like').default(...arguments),
  };
}
