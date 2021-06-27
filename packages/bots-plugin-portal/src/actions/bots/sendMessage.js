import Bluebird from 'bluebird';

export default async function sendMessage({ to, ...params }) {
  if (!to && !this.ctx) throw '!to';
  if (!to) {
    to = this.bot.getMessageChatId(this.ctx);
  }
  let { parent = [] } = params;
  const { text, extra } = params;

  const chats = Array.isArray(to) ? to : [to];
  if (!Array.isArray(parent)) parent = [parent];

  const data = [];

  if (text && extra) {
    const messageText = text;
    const messageExtra = extra || {};
    const result = await Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, messageText, messageExtra));
    data.push(...result);
  }
  await Bluebird.map(parent, async (file) => {
    const result = await Bluebird.map(chats, async (chat) => this.bot.sendFile(chat, file));
    data.push(...result);
  });

  return data;
}
