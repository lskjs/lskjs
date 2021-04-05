/* eslint-disable import/prefer-default-export */
import Bluebird from 'bluebird';
import difference from 'lodash/difference';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';

export async function action({ event, ctx, bot, then, chats }) {
  const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
  const BotsUserDataModel = await this.botsModule.module('models.BotsUserDataModel');
  let delay = false;

  if (!then.delay) return { delay, targetChats: chats };
  const telegramUserId = bot.getUserId(ctx);
  const telegramChatId = bot.getMessageChatId(ctx);
  if (+telegramChatId < 0) return { delay, targetChats: chats };

  const user = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('id').lean();
  if (!user) return { delay, targetChats: chats };
  const userId = user._id;

  const delayCount = 20 * 1000;
  const data = {
    userId,
    plugin: 'bots-plugin-portal',
    type: 'delay',
  };

  // время прохода мута
  const expected = new Date().getTime() - delayCount;
  // чаты в муте
  const expectedChats = await BotsUserDataModel.find({
    ...data,
    telegramChatId: { $in: chats },
    updatedAt: { $gte: new Date(expected) },
  })
    .select(['telegramChatId'])
    .lean();
  const expectedChatsIds = uniqBy(expectedChats, 'telegramChatId').map((c) => c.telegramChatId);

  if (!isEmpty(expectedChatsIds)) delay = true;
  const targetChats = difference(chats, expectedChatsIds); // чаты не в муте

  await Bluebird.map(
    targetChats,
    (chatId) =>
      BotsUserDataModel.findOneAndUpdate(
        { telegramChatId: chatId },
        { ...data, telegramChatId: chatId, count: delayCount },
        {
          new: true,
          upsert: true,
        },
      ),
    { concurrency: 100 },
  );

  return {
    delay,
    targetChats,
  };
}
