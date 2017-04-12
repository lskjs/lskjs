export default function () {
  return {
    NewOffer: require('./NewOffer').default,//(...arguments),
    Offer: require('./Offer').default,//(...arguments),
    OfferCard: require('./OfferCard').default,//(...arguments),
    Offers: require('./Offers').default,//(...arguments),
  };
}
