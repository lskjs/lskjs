export default async function checkDelay({ value }) {
  // TODO: Разобраться, как импортировать модели
  // const BotsTelegramMessageModel = await this.actionModule.app.model('models.BotsTelegramMessageModel');

  const BotsTelegramMessageModel = await this.app.module('models.BotsTelegramMessageModel');
  const telegramChatId = this.bot.getMessageChatId(this.ctx);
  const telegramMessage = this.bot.getMessage(this.ctx);
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
