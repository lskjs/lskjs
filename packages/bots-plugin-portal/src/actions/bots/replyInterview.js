import set from 'lodash/set';

const updateUserStorage = async ({ bot, ctx, actionModule, storage }) => {
  const BotsTelegramUserStorageModel = await actionModule.module('models.BotsTelegramUserStorageModel');
  const telegramUserId = bot.getUserId(ctx);
  const telegramChatId = bot.getMessageChatId(ctx);
  const { field, data } = storage;
  const store = {};
  set(store, field, data);
  return BotsTelegramUserStorageModel.findOneAndUpdate({ telegramUserId, telegramChatId }, store, {
    new: true,
    upsert: true,
  });
};

export default async function replyInterview(params) {
  await updateUserStorage({
    ...this,
    storage: {
      field: 'storage.then',
      data: params.then,
    },
  });
  const data = await this.ctx.redirect({ path: '/interview', query: params });
  return { res: false, data };
}
