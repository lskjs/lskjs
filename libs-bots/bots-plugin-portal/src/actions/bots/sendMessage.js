import Err from '@lskjs/err';
import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';

export default async function sendMessage({ to, ...params }) {
  if (!to && !this.ctx) throw new Err('!to');
  if (!to) {
    // eslint-disable-next-line no-param-reassign
    to = this.bot.getMessageChatId(this.ctx);
  }
  const { text, parent = {}, parseMode = '' } = params;
  if (isEmpty(parent)) parent.text = text;
  if (parseMode) set(parent, 'extra.parse_mode', parseMode);

  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, parent, parent.extra));
}
