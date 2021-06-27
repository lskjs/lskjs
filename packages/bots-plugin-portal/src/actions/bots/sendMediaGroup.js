import Bluebird from 'bluebird';

export default async function sendMessage({ to, ...params }) {
  if (!to && !this.ctx) throw '!to';
  if (!to) {
    to = this.bot.getMessageChatId(this.ctx);
  }
  let { parent = [] } = params;

  const chats = Array.isArray(to) ? to : [to];
  if (!Array.isArray(parent)) parent = [parent];

  const data = await Bluebird.map(chats, async (chat) => this.bot.sendMediaGroup(chat, parent));
  return { res: true, data };
}
