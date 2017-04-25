export default function () {
  return {
    Posts: require('./Posts').default(...arguments),
    Post: require('./Post').default(...arguments),
  };
}
