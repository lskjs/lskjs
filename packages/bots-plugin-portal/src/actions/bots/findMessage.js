import shuffle from 'lodash/shuffle';

const types = {
  chatId: '*message.chat.id',
  userId: '*message.user.id',
  chatType: '*message.chat.type',
  messageType: '*message.type',
  messageText: '*message.text',
  messageDate: '*message.date',
  messageId: '*message.id',
};

function getItem({ type, item }) {
  if (item !== types[type]) return item;
  let data;
  if (item === types.chatId) {
    data = this.bot.getMessageChatId(this.ctx);
  }
  if (item === types.userId) {
    data = this.bot.getMessageUserId(this.ctx);
  }
  if (item === types.chatType) {
    data = this.bot.getMessage(this.ctx).chat.type;
  }
  if (item === types.messageType) {
    data = this.bot.getMessage(this.ctx).type;
  }
  if (item === types.messageText) {
    data = this.bot.getMessageText(this.ctx);
  }
  if (item === types.messageDate) {
    data = this.bot.getMessage(this.ctx).date;
  }
  if (item === types.messageId) {
    data = this.bot.getMessageId(this.ctx);
  }

  if (!data) data = { $exists: true };
  return data;
}

export default async function findMessage(params) {
  const BotsTelegramMessageModel = await this.actionModule.module('models.BotsTelegramMessageModel');
  const { criteria, random = false } = params;
  let { chatId, userId, chatType, messageType, messageText, messageDate, messageId } = criteria;

  if (!Array.isArray(chatId)) chatId = chatId ? [chatId] : [];
  if (!Array.isArray(userId)) userId = userId ? [userId] : [];
  if (!Array.isArray(chatType)) chatType = chatType ? [chatType] : [];
  if (!Array.isArray(messageType)) messageType = messageType ? [messageType] : [];
  if (!Array.isArray(messageText)) messageText = messageText ? [messageText] : [];
  if (!Array.isArray(messageDate)) messageDate = messageDate ? [messageDate] : [];
  if (!Array.isArray(messageId)) messageId = messageId ? [messageId] : [];

  if (chatId.length > 0) {
    chatId = chatId.map((item) => getItem.call(this, { type: 'chatId', item }));
  }
  if (userId.length > 0) {
    userId = userId.map((item) => getItem.call(this, { type: 'userId', item }));
  }
  if (chatType.length > 0) {
    chatType = chatType.map((item) => getItem.call(this, { type: 'chatType', item }));
  }
  if (messageType.length > 0) {
    messageType = messageType.map((item) => getItem.call(this, { type: 'messageType', item }));
  }
  if (messageText.length > 0) {
    messageText = messageText.map((item) => getItem.call(this, { type: 'messageText', item }));
  }
  if (messageDate.length > 0) {
    messageDate = messageDate.map((item) => getItem.call(this, { type: 'messageDate', item }));
  }
  if (messageId.length > 0) {
    messageId = messageId.map((item) => getItem.call(this, { type: 'messageId', item }));
  }

  const data = { 'meta.status': { $ne: 'deleted' } };
  if (userId.length > 0) data['from.id'] = { $in: userId };
  if (chatId.length > 0) data['chat.id'] = { $in: chatId };
  if (chatType.length > 0) data['chat.type'] = { $in: chatType };
  if (messageType.length > 0) data.type = { $in: messageType };
  if (messageText.length > 0) data.$or = [{ text: { $in: messageText } }, { caption: { $in: messageText } }];
  if (messageDate.length > 0) data.date = { $in: messageDate };
  if (messageId.length > 0) data.message_id = { $in: messageId };

  let message = false;
  if (random) {
    const messages = await BotsTelegramMessageModel.find(data).lean();
    message = messages.length > 0 ? shuffle(messages)[0] : false;
  } else {
    const messages = await BotsTelegramMessageModel.find(data).sort({ date: -1 }).limit(1).lean();
    message = messages.length > 0 ? messages[0] : false;
  }
  if (message) this.bot.setMessage(this.ctx, '', message);

  return { res: !!message, data: message };
}
