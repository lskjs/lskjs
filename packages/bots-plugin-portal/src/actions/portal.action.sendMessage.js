import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export default async function sendMessage({ bot, to, text }) {
  let chats = to;
  if (!chats) return null;
  if (!Array.isArray(chats)) chats = [chats];
  if (isEmpty(chats)) return null;
  return Bluebird.map(chats, async (chat) => bot.sendMessage(chat, text));
}
