import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export default async function sendMessage({ to, ...params }) {
  if (!to && !this.ctx) throw '!to';
  if (!to) {
    to = this.bot.getMessageChatId(this.ctx);
  }
  const { text, parent = {}, markdown = false } = params;
  if (isEmpty(parent)) parent.text = text;

  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, parent, parent.extra, markdown));
}
