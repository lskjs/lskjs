/* eslint-disable global-require */

export default {
  checkDelay: require('./portal.action.checkDelay').default,
  pause: require('./portal.action.pause').default,
  remove: require('./portal.action.remove').default,
  // reply: require('./portal.action.reply').default,
  repost: require('./portal.action.repost').default,
  send2messages: require('./portal.action.send2messages').default,

  reply: require('./reply').default,
  copyMessage: require('./copyMessage').default,
  sendMessage: require('./sendMessage').default,
};
