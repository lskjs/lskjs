export default function () {
  return {
    // mailer: require('./mailer/mailer.server').default(...arguments),
    // offer: require('./offer/offer.server').default(...arguments),
    notification: require('lsk-notification/server').default(...arguments),
    rating: require('lsk-rating/server').default(...arguments),
    auth: require('lsk-auth/server').default(...arguments),
    chat: require('lsk-chat/server').default(...arguments),
    // posts: require('./posts/posts.server').default(...arguments),
    // upload: require('./upload/upload.server').default(...arguments),
  };
}
