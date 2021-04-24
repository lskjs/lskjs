export default async function checkDelay({ ctx, bot, value }) {
  const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');

  const telegramChatId = bot.getMessageChatId(ctx);
  const telegramMessage = bot.getMessage(ctx);
  const { from, chat, message_id } = telegramMessage;

  if (+telegramChatId < 0) return true;

  const expected = new Date().getTime() - value;
  const expectedMessage = await BotsTelegramMessageModel.findOne({
    message_id: { $ne: message_id },
    from,
    chat,
    updatedAt: { $gte: new Date(expected) },
  })
    .select('_id')
    .lean();
  if (!expectedMessage) return true;

  return false;
}
