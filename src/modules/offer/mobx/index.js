export default function () {
  return {
    DealModel: require('./DealModel').default(...arguments),
    OfferModel: require('./OfferModel').default(...arguments),
    OffersStore: require('./OffersStore').default(...arguments),
  };
}
