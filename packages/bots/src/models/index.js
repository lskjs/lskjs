export default {
  BotsBotModel: () => import('./BotsBotModel'),
  BotsMenuModel: () => import('./BotsMenuModel'),
  BotsEventModel: () => import('./BotsEventModel'),
  BotsTelegramMessageModel: () => import('./BotsTelegramMessageModel'),
  BotsTelegramImpressionModel: () => import('./BotsTelegramImpressionModel'),
  BotsTelegramPortalRulesModel: () => import('./BotsTelegramPortalRulesModel'),
  BotsTelegramChatModel: () => import('./BotsTelegramChatModel'),
  BotsTelegramUserModel: () => import('./BotsTelegramUserModel'),
};
