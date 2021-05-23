import Bluebird from 'bluebird';

export default async function sendMessage({ to, ...params }) {
  if (!to) throw '!to';
  const { parent = {}, text, extra } = params;

  const messageText = text || parent.text || 'undefined';
  const messageExtra = extra || parent.extra || {};
  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, messageText, messageExtra));
}
