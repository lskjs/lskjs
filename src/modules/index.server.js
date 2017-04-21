export default function () {
  return {
    mailer: require('./mailer/mailer.server').default(...arguments),
    chat: require('./chat/chat.server').default(...arguments),
    offer: require('./offer/offer.server').default(...arguments),
    rating: require('./rating/rating.server').default(...arguments),
    notification: require('./notification/notification.server').default(...arguments),
  };
}
