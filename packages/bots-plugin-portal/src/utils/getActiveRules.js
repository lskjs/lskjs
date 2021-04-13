import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

async function updateRules({ ctx, bot }) {
  const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
  const fromId = bot.getUserId(ctx);
  const userRules = await BotsTelegramPortalRulesModel.find({ 'criteria.userId': { $in: [fromId] } })
    .select(['criteria'])
    .lean();
  return [...this.rules, ...userRules];
}

export default async function getActiveRules({ ctx, bot }) {
  const userId = bot.getUserId(ctx);
  const chatId = bot.getMessageChatId(ctx);
  const text = bot.getMessageText(ctx);
  const messageType = bot.getMessageType(ctx);
  const chatType = bot.getMessageChatType(ctx);
  const pack = { userId, chatId, text, messageType, chatType };

  const rules = await updateRules.call(this, { ctx, bot });

  const activeRules = rules
    .filter((rule) => {
      this.log.debug('>> Test criteria type');
      const { criteria } = rule;
      if (!criteria) return true;
      if (isFunction(criteria) && criteria(pack)) return true;
      if (!isEmpty(criteria)) return true;
      return false;
    })
    .filter((rule) => {
      this.log.debug('>> Test criteria userId');
      const { criteria } = rule;
      if (!criteria) return true;
      if (!criteria.userId) return true;

      if (['number', 'string'].includes(typeof criteria.userId) && `${criteria.userId}` === `${userId}`) return true;
      if (Array.isArray(criteria.userId)) {
        return (
          criteria.userId.every((i) => ['number', 'string'].includes(typeof i)) &&
          criteria.userId.some((i) => `${i}` === `${userId}`)
        );
      }
      return false;
    })
    .filter((rule) => {
      this.log.debug('>> Test criteria chatId');
      const { criteria } = rule;
      if (!criteria) return true;
      if (!criteria.chatId) return true;

      if (['number', 'string'].includes(typeof criteria.chatId) && `${criteria.chatId}` === `${chatId}`) return true;
      if (Array.isArray(criteria.chatId)) {
        return (
          criteria.chatId.every((i) => ['number', 'string'].includes(typeof i)) &&
          (criteria.chatId.some((i) => `${i}` === `${userId}`) || criteria.chatId.some((i) => `${i}` === `${chatId}`))
        );
      }
      return false;
    })
    .filter((rule) => {
      this.log.debug('>> Test criteria text');
      const { criteria } = rule;
      if (!criteria) return true;
      if (!criteria.text) return true;
      if (isFunction(criteria.text) && criteria.text(pack)) return true;

      if (typeof criteria.text === 'string' && criteria.text === text) return true;
      if (criteria.text instanceof RegExp && criteria.text.test(text)) return true;
      return false;
    })
    .filter((rule) => {
      this.log.debug('>> Test criteria messageType');
      const { criteria } = rule;
      if (!criteria) return true;
      if (!criteria.messageType) return true;

      if (typeof criteria.messageType === 'string' && criteria.messageType === messageType) return true;
      if (Array.isArray(criteria.messageType)) {
        return (
          criteria.messageType.every((i) => typeof i === 'string') &&
          criteria.messageType.some((i) => i === messageType)
        );
      }
      return false;
    })
    .filter((rule) => {
      this.log.debug('>> Test criteria chatType');
      const { criteria } = rule;
      if (!criteria) return true;
      if (!criteria.chatType) return true;

      if (typeof criteria.chatType === 'string' && criteria.chatType === chatType) return true;
      if (Array.isArray(criteria.chatType)) {
        return criteria.chatType.every((i) => typeof i === 'string') && criteria.chatType.some((i) => i === chatType);
      }
      return false;
    });
  return activeRules;
}
