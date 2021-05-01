import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export default async function checkChallenge(params) {
  const BotsTelegramMessageModel = await this.actionModule.module('models.BotsTelegramMessageModel');
  const { challenges } = params;
  const day = 24 * 60 * 60 * 1000;
  const dayAgo = new Date().getTime() - day;

  if (!challenges || isEmpty(challenges)) return false;

  return Bluebird.map(challenges, async (challenge) => {
    const data = {
      createdAt: {},
    };
    const { chatId, userId, chatType, messageType, messageText, challengeStart, challengeFinish } = challenge;

    if (userId) data['from.id'] = userId;
    if (chatId) data['chat.id'] = chatId;
    if (chatType) data['chat.type'] = chatType;
    if (messageType) data.type = messageType;
    if (messageText) data.text = messageText;
    if (challengeStart) data.createdAt.$gte = new Date(dayAgo + challengeStart);
    if (challengeFinish) data.createdAt.$lte = new Date(dayAgo + challengeFinish);

    const messageDayAgo = await BotsTelegramMessageModel.findOne(data).select('_id').lean();
    if (challengeStart) data.createdAt.$gte = new Date(dayAgo - day + challengeStart);
    if (challengeFinish) data.createdAt.$lte = new Date(dayAgo - day + challengeFinish);
    const message2DaysAgo = await BotsTelegramMessageModel.findOne(data).select('_id').lean();

    return { res: !!messageDayAgo, data: messageDayAgo, messageDayAgo, message2DaysAgo };
  });
}
