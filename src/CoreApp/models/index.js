export default function () {
  return {
    User: require('./User').default(...arguments),
  }
}
