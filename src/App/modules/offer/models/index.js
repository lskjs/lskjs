export default function () {
  return {
    Offer: require('./Offer').default(...arguments),
    Deal: require('./Deal').default(...arguments),
  };
}
