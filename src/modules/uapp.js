export default function () {
  return {
    rating: require('lsk-rating/uapp').default(...arguments),
    chat: require('lsk-chat/uapp').default(...arguments),
    auth: require('lsk-auth/uapp').default(...arguments),
    upload: require('lsk-upload/uapp').default(...arguments),
    // mailer: require('lsk-mailer/uapp').default(...arguments),
    user: require('lsk-user/uapp').default(...arguments)
  };
}

