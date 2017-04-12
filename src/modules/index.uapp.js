export default function () {
  return {
    chat: require('./chat/chat.uapp').default(...arguments),
    offer: require('./offer/offer.uapp').default(...arguments),
  };
}
