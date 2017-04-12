export default function () {
  return {
    mailer: require('./mailer/mailer.server').default(...arguments),
    chat: require('./chat/chat.server').default(...arguments),
    offer: require('./offer/offer.server').default(...arguments),
  };
}
