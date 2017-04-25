export default function () {
  return {
    chat: require('./chat/chat.uapp').default(...arguments),
    offer: require('./offer/offer.uapp').default(...arguments),
    rating: require('./rating/rating.uapp').default(...arguments),
    notification: require('./notification/notification.uapp').default(...arguments),
    auth: require('./auth/auth.uapp').default(...arguments),
    posts: require('./posts/posts.uapp').default(...arguments),
  };
}
