export default function () {
  return {
    Users: require('./UsersStore').default(...arguments),
    Offers: require('./OffersStore').default(...arguments),
  };
}
