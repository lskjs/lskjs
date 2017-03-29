export default function () {
  return {
    mailer: require('./mailer').default(...arguments),
  };
}
