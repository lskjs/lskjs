export default async function canonizeChatIds(chats) {
  const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
  const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');

  // to: [1234567890, '0987654321'],
  if (Array.isArray(chats)) {
    return chats.filter(Number).filter(String);
  }
  // to: { id: { $in: ['1234567890', '0987654321'] }, meta: $exists }, // Mongodb config by users model
  if (chats instanceof Object) {
    const to = await BotsTelegramUserModel.find(chats).select('id').lean();
    return to.map((i) => i.id);
  }
  // to: '*', // get all chats // analog {}
  if (chats === '*') {
    const to = await BotsTelegramChatModel.find().select('id').lean();
    return to.map((i) => i.id);
  }
  // to: 1234567890
  if (['string', 'number'].includes(typeof chats)) {
    return [chats];
  }
  return [];
}
