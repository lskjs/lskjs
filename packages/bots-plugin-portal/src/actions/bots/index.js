/* eslint-disable global-require */

export default {
  checkDelay: require('./checkDelay').default,
  checkMessage: require('./checkMessage').default,
  checkChallenge: require('./checkChallenge').default,
  checkInterview: require('./checkInterview').default,

  findMessage: require('./findMessage').default,

  pause: require('./pause').default,
  remove: require('./remove').default,
  repost: require('./repost').default,
  send2messages: require('./send2messages').default,

  reply: require('./reply').default,
  createMessage: require('./createMessage').default,
  forwardMessage: require('./forwardMessage').default,
  copyMessage: require('./copyMessage').default,
  sendMessage: require('./sendMessage').default,
  replyInterview: require('./replyInterview').default,

  messageTrim: require('./messageTrim').default,
  messageAppend: require('./messageAppend').default,
  messageAddExtra: require('./messageAddExtra').default,
};
