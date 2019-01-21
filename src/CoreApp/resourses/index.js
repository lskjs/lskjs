export default function () {
  return {
    Auth: require('./Auth').default(...arguments),
  };
}
