export async function userImpressionInChat({
  telegramUserId,
  telegramChatId,
  botsModule,
  type,
  time = new Date().getTime() - 24 * 60 * 60 * 1000,
}) {
  const BotsTelegramImpressionModel = await botsModule.module('models.BotsTelegramImpressionModel');
  const BotsTelegramChatModel = await botsModule.module('models.BotsTelegramChatModel');
  const BotsTelegramUserModel = await botsModule.module('models.BotsTelegramUserModel');

  const user = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('_id').lean();
  const chat = await BotsTelegramChatModel.findOne({ id: telegramChatId }).select('_id').lean();

  if (!user || !chat) return false;
  const data = {
    userId: user._id,
    chatId: chat._id,
    updatedAt: { $gte: new Date(time) },
  };
  if (type) data.type = type;
  const impression = await BotsTelegramImpressionModel.findOne(data);
  return !!impression;
}

export default userImpressionInChat;
