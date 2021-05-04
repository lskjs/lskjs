export default async function findMessage(params) {
  const BotsTelegramMessageModel = await this.actionModule.module('models.BotsTelegramMessageModel');
  const { chatId, userId, chatType, messageType, messageText, messageDate, messageId } = params.criteria;

  const data = { 'meta.status': { $ne: 'deleted' } };
  if (userId) data['from.id'] = userId;
  if (chatId) data['chat.id'] = chatId;
  if (chatType) data['chat.type'] = chatType;
  if (messageType) data.type = messageType;
  if (messageText) data.$or = [{ text: messageText }, { caption: messageText }];
  if (messageDate) data.date = messageDate;
  if (messageId) data.message_id = messageId;

  const message = await BotsTelegramMessageModel.findOne(data).lean();
  if (message) this.ctx = { ...this.ctx, message };
  return { res: !!message, data: message };
}
