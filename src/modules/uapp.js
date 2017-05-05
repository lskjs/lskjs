export default function () {
  return {
    rating: require('lsk-rating/uapp').default(...arguments),
    notification: require('lsk-notification/uapp').default(...arguments),
    chat: require('lsk-chat/uapp').default(...arguments),
    auth: require('lsk-auth/uapp').default(...arguments),
    upload: require('lsk-upload/uapp').default(...arguments),
    offer: require('~/modules/offer/uapp').default(...arguments),
    posts: require('~/modules/posts/uapp').default(...arguments)
  };
}