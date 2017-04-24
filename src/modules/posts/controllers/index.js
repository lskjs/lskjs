export default function () {
  return {
    Post: require('./Post').default(...arguments),
  };
}
