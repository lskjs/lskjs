import Bluebird from 'bluebird';

export default async function copyMessage({ to } = {}) {
  if (!to) throw '!to';
  const chats = Array.isArray(to) ? to : [to];
  const result = await Bluebird.map(chats, async (chat) => this.ctx.copyMessage(chat));
  return { res: true, data: result };
}
