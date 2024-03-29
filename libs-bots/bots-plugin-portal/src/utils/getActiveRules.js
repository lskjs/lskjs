import flatten from 'lodash/flatten';
import isFunction from 'lodash/isFunction';
import some from 'lodash/some';

async function updateRules({ ctx, bot }) {
  const BotsUserDataModel = await this.botsModule.module('models.BotsUserDataModel');
  const fromId = bot.getUserId(ctx);
  const data = {
    telegramUserId: fromId,
    'info.rules': { $exists: true },
  };

  const userRules = await BotsUserDataModel.find(data).select('info.rules').lean();
  const rules = flatten(userRules.map(({ info }) => info.rules));

  return [...this.rules, ...rules];
}

export default async function getActiveRules({ ctx, bot } = {}) {
  const pack = {};
  const message = bot.getMessage(ctx);
  pack.userId = bot.getUserId(ctx);
  pack.chatType = bot.getMessageChatType(ctx);
  pack.chatId = bot.getMessageChatId(ctx);
  pack.messageType = bot.getMessageType(ctx);
  pack.messageText = bot.getMessageText(ctx);
  pack.stickerEmoji = message.sticker?.emoji;
  pack.stickerSetName = message.sticker?.set_name;
  pack.nextRoute = bot.getNextRoute(ctx);

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
  const checkStickerEmoji = (item) => {
    if (Array.isArray(item)) return some(item, checkStickerEmoji);
    if (isFunction(item) && !item(pack)) return false;
    if (item instanceof RegExp) return item.test(pack.stickerEmoji);
    return item === pack.stickerEmoji;
  };
  const checkStickerSetName = (item) => {
    if (Array.isArray(item)) return some(item, checkStickerSetName);
    if (isFunction(item) && !item(pack)) return false;
    if (item instanceof RegExp) return item.test(pack.stickerSetName);
    return item === pack.stickerSetName;
  };
  const checkNextRoute = (item) => {
    if (Array.isArray(item)) return some(item, checkNextRoute);
    if (isFunction(item) && !item(pack)) return false;
    if (item instanceof RegExp) return item.test(pack.nextRoute);
    return item === pack.nextRoute;
  };

  const checkCriteria = (item) => {
    if (Array.isArray(item)) return some(item, checkCriteria);
    if (isFunction(item) && !item(pack)) return false;
    const { userId, chatType, chatId, messageType, messageText, stickerEmoji, stickerSetName, nextRoute } = item;
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
    if (stickerEmoji && !checkStickerEmoji(stickerEmoji)) {
      this.log.trace('!checkStickerEmoji');
      return false;
    }
    if (stickerSetName && !checkStickerSetName(stickerSetName)) {
      this.log.trace('!checkStickerSetName');
      return false;
    }
    if (nextRoute && !checkNextRoute(nextRoute)) {
      this.log.trace('!checkNextRoute');
      return false;
    }
    return true;
  };

  const activeRules = rules.filter((rule) => {
    const { criteria, action } = rule;

    if (!criteria) return false;

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
