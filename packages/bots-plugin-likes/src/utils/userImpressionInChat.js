export async function userImpressionInChat({
  ctx,
  bot,
  botsModule,
  time = new Date().getTime() - 24 * 60 * 60 * 1000,
}) {
  const BotsTelegramImpressionModel = await botsModule.module('models.BotsTelegramImpressionModel');
  const BotsTelegramChatModel = await botsModule.module('models.BotsTelegramChatModel');
  const BotsTelegramUserModel = await botsModule.module('models.BotsTelegramUserModel');

  const telegramUserId = bot.getMessageUserId(ctx);
  const telegramChatId = bot.getMessageChatId(ctx);
  const user = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('_id').lean();
  const chat = await BotsTelegramChatModel.findOne({ id: telegramChatId }).select('_id').lean();

  if (!user || !chat) return false;
  const impression = await BotsTelegramImpressionModel.findOne({
    userId: user._id,
    chatId: chat._id,
    updatedAt: { $gte: new Date(time) },
  });
  return !!impression;
}

export default userImpressionInChat;
