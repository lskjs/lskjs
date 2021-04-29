import isFunction from 'lodash/isFunction';
import some from 'lodash/some';

async function updateRules({ ctx, bot }) {
  const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
  const fromId = bot.getUserId(ctx);
  const userRules = await BotsTelegramPortalRulesModel.find({ 'criteria.userId': { $in: [fromId] } })
    .select(['criteria'])
    .lean();
  return [...this.rules, ...userRules];
}

export default async function getActiveRules({ ctx, bot } = {}) {
  const pack = {};
  pack.userId = bot.getUserId(ctx);
  pack.chatType = bot.getMessageChatType(ctx);
  pack.chatId = bot.getMessageChatId(ctx);
  pack.messageType = bot.getMessageType(ctx);
  pack.messageText = bot.getMessageText(ctx);

  const rules = await updateRules.call(this, { ctx, bot });

  this.log.trace('getActiveRules rules', rules.length);

  // TODO: подумать как унифицировать, функции абсолютно одинаковые
  const checkUserId = (item) => {
    if (Array.isArray(item)) return some(item, checkUserId);
    if (isFunction(item) && !item(pack)) return false;
    return item === pack.userId;
    // return ['number', 'string'].includes(typeof item) && String(item) === String(pack.userId); // TODO: подумать нужна ли проверка на тип и приведение к строке
  };
  const checkChatType = (item) => {
    if (Array.isArray(item)) return some(item, checkChatType);
    if (isFunction(item) && !item(pack)) return false;
    return item === pack.chatType;
  };
  const checkChatId = (item) => {
    if (Array.isArray(item)) return some(item, checkChatId);
    if (isFunction(item) && !item(pack)) return false;
    return item === pack.chatId;
    // return ['number', 'string'].includes(typeof item) && String(item) === String(pack.chatId); // TODO: подумать нужна ли проверка на тип и приведение к строке
  };
  const checkMessageType = (item) => {
    if (Array.isArray(item)) return some(item, checkMessageType);
    if (isFunction(item) && !item(pack)) return false;
    return item === pack.messageType;
  };
  const checkMessageText = (item) => {
    if (Array.isArray(item)) return some(item, checkMessageText);
    if (isFunction(item) && !item(pack)) return false;
    if (item instanceof RegExp) return item.test(pack.messageText);
    return item === pack.messageText;
  };

  const checkCriteria = (item) => {
    if (Array.isArray(item)) return some(item, checkCriteria);
    if (isFunction(item) && !item(pack)) return false;
    const { userId, chatType, chatId, messageType, messageText } = item;
    if (userId && !checkUserId(userId)) {
      this.log.trace('!checkUserId');
      return false;
    }
    if (chatType && !checkChatType(chatType)) {
      this.log.trace('!checkChatType');
      return false;
    }
    if (chatId && !checkChatId(chatId)) {
      this.log.trace('!checkChatId');
      return false;
    }
    if (messageType && !checkMessageType(messageType)) {
      this.log.trace('!checkMessageType');
      return false;
    }
    if (messageText && !checkMessageText(messageText)) {
      this.log.trace('!checkMessageText');
      return false;
    }
    return true;
  };

  const activeRules = rules.filter((rule) => {
    const { criteria = {}, action } = rule;
    // if (when) {
    //   this.log.trace('!!when');
    //   return false;
    // }
    if (!checkCriteria(criteria)) {
      this.log.trace('!checkCriteria');
      return false;
    }
    if (!action) {
      this.log.trace('!action');
      return false;
    }
    return true;
  });

  this.log.trace('getActiveRules', pack, '=>', activeRules);

  return activeRules;
}
