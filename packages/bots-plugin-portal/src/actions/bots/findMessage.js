import shuffle from 'lodash/shuffle';

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
    chatId = chatId.map((id) => (id === '*message.chat.id' ? this.bot.getMessageChatId(this.ctx) : id));
  }
  if (userId.length > 0) {
    userId = userId.map((id) => (id === '*message.user.id' ? this.bot.getMessageUserId(this.ctx) : id));
  }
  if (chatType.length > 0) {
    chatType = chatType.map((type) => (type === '*message.chat.type' ? this.bot.getMessage(this.ctx).chat.type : type));
  }
  if (messageType.length > 0) {
    messageType = messageType.map((type) => (type === '*message.type' ? this.bot.getMessage(this.ctx).type : type));
  }
  if (messageText.length > 0) {
    messageText = messageText.map((text) => (text === '*message.text' ? this.bot.getMessageText(this.ctx) : text));
  }
  if (messageDate.length > 0) {
    messageDate = messageDate.map((date) => (date === '*message.date' ? this.bot.getMessage(this.ctx).date : date));
  }
  if (messageId.length > 0) {
    messageId = messageId.map((id) => (id === '*message.id' ? this.bot.getMessageId(this.ctx) : id));
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
    message = await BotsTelegramMessageModel.findOne(data).lean();
  }
  if (message) this.bot.setMessage(this.ctx, '', message);

  return { res: !!message, data: message };
}
