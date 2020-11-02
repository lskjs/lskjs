export default (...args) => ({
  BotsBotModel: require('./BotsBotModel').default(...args),
  BotsEventModel: require('./BotsEventModel').default(...args),
  BotsTelegramMessageModel: require('./BotsTelegramMessageModel').default(...args),
  BotsTelegramChatModel: require('./BotsTelegramChatModel').default(...args),
  BotsTelegramUserModel: require('./BotsTelegramUserModel').default(...args),
});
