export default function () {
  return {
    Notifications: require('./Notifications').default(...arguments),
  };
}
