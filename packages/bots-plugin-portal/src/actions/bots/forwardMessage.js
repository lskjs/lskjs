import Bluebird from 'bluebird';

export default async function forwardMessage({ to } = {}) {
  if (!to) throw '!to';
  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => {
    const message = await this.ctx.forwardMessage(chat);
    return { res: !!message, data: message };
  });
}
