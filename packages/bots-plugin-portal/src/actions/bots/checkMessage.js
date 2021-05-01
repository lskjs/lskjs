import isEmpty from 'lodash/isEmpty';

export default async function checkMessage(params) {
  const BotsTelegramMessageModel = await this.actionModule.module('models.BotsTelegramMessageModel');
  const { mongo, criteria } = params;

  if (mongo && !isEmpty(mongo)) {
    const message = await BotsTelegramMessageModel.findOne(mongo).select('_id').lean();
    return { res: !!message, data: message };
  }

  if (criteria && !isEmpty(criteria)) {
    const data = {};
    const { chatId, userId, chatType, messageType, messageText, messageDate, messageId } = criteria;

    if (userId) data['from.id'] = userId;
    if (chatId) data['chat.id'] = chatId;
    if (chatType) data['chat.type'] = chatType;
    if (messageType) data.type = messageType;
    if (messageText) data.text = messageText;
    if (messageDate) data.date = messageDate;
    if (messageId) data.date = messageId;

    const message = await BotsTelegramMessageModel.findOne(data).select('_id').lean();
    return { res: !!message, data: message };
  }

  return { res: false, data: undefined };
}
