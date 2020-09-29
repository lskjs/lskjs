export default (...args) => ({
  BotsBotModel: require('./BotsBotModel').default(...args),
  BotsEventModel: require('./BotsEventModel').default(...args),
  BotsTelegramMessageModel: require('./BotsTelegramMessageModel').default(...args),
});
