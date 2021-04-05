import isFunction from 'lodash/isFunction';

async function updateRules({ ctx, bot }) {
  const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
  const fromId = bot.getUserId(ctx);
  const userRules = await BotsTelegramPortalRulesModel.find({ where: fromId }).select(['then', 'when', 'where']).lean();
  return [...this.rules, ...userRules];
}

export default async function getActiveRules({ ctx, bot }) {
  const userId = bot.getUserId(ctx);
  const chatId = bot.getMessageChatId(ctx);
  const text = bot.getMessageText(ctx);
  const messageType = bot.getMessageType(ctx);
  const pack = { userId, chatId, text, messageType };
  const rules = await updateRules.call(this, { ctx, bot });
  const activeRules = rules
    .filter((rule) => {
      if (!rule.where) return true;
      if (isFunction(rule.where) && rule.where(pack)) return true;
      if (`${rule.where}` === `${userId}` || `${rule.where}` === `${chatId}`) return true;
      return false;
    })
    .filter((rule) => {
      if (!rule.when) return true;
      if (rule.when.text && rule.when.text === text) return true;

      const type = bot.getMessageType(ctx);
      if (rule.when.type && rule.when.type === type) return true;
      if (rule.when.types && rule.when.types.includes(type)) return true;

      return false;
    });
  return activeRules;
}
