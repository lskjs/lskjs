import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export default async function repost({ to }) {
  let chats = to;
  if (!chats) chats = this.bot.getMessageChatId(this.ctx);
  if (!Array.isArray(chats)) chats = [chats];
  if (isEmpty(chats)) return null;
  if (this.ctx.message && this.ctx.update) this.ctx.update.message = this.ctx.message;
  // const extra = this.createExtraKeyboard({ bot, ctx, then });
  return Bluebird.map(chats, async (chat) => this.bot.repost(chat, this.ctx));
}
