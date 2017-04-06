export default function () {
  return {
    User: require('./User').default(...arguments),
    Offer: require('./Offer').default(...arguments),
  };
}
