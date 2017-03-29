export default function () {
  return {
    Chat: require('./Chat').default(...arguments),
    Message: require('./Message').default(...arguments),
  };
}
