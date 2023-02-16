import Err from '@lskjs/err';
import Bluebird from 'bluebird';

export default async function sendMessage({ to, ...params }) {
  if (!to && !this.ctx) throw new Err('!to');
  if (!to) {
    // eslint-disable-next-line no-param-reassign
    to = this.bot.getMessageChatId(this.ctx);
  }
  let { parent = [] } = params;

  const chats = Array.isArray(to) ? to : [to];
  if (!Array.isArray(parent)) parent = [parent];

  const data = await Bluebird.map(chats, async (chat) => this.bot.sendMediaGroup(chat, parent));
  return { res: true, data };
}
