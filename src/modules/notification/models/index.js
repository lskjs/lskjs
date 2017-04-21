export default function () {
  return {
    Notification: require('./Notification').default(...arguments),
  };
}
