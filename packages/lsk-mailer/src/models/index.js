export default function () {
  return {
    Email: require('./Email').default(...arguments),
    Thread: require('./Thread').default(...arguments),
  };
}
