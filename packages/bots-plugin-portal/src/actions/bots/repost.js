import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export default async function repost({ to }) {
  let chats = to;
  if (!chats) return null;
  if (!Array.isArray(chats)) chats = [chats];
  if (isEmpty(chats)) return null;
  // const extra = this.createExtraKeyboard({ bot, ctx, then });
  return Bluebird.map(chats, async (chat) => {
    const message = await this.bot.repost(chat, this.ctx);
    return { res: !!message, data: message };
  });
}
