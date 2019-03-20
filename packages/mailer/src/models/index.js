export default function () {
  return {
    Email: require('./Email').default(...arguments),
  };
}
