export default function () {
  return {
    NotificationStore: require('./NotificationStore').default(...arguments),
  };
}
