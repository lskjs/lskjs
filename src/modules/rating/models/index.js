export default function () {
  return {
    Rating: require('./Rating').default(...arguments),
  };
}
