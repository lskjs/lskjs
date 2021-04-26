import Bluebird from 'bluebird';

export default async function copyMessage({ to } = {}) {
  if (!to) throw '!to';
  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => this.ctx.copyMessage(chat));
}
