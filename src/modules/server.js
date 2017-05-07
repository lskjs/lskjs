export default function () {
  return {
    rating: require('lsk-rating/server').default(...arguments),
    notification: require('lsk-notification/server').default(...arguments),
    chat: require('lsk-chat/server').default(...arguments),
    auth: require('lsk-auth/server').default(...arguments),
    upload: require('lsk-upload/server').default(...arguments),
    offer: require('~/modules/offer/server').default(...arguments),
    posts: require('~/modules/posts/server').default(...arguments),
    user: require('~/modules/user/server').default(...arguments)
  };
}
