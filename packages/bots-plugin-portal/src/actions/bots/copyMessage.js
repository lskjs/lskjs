import Bluebird from 'bluebird';

export default async function copyMessage({ to } = {}) {
  if (!to) throw '!to';
  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => {
    const message = await this.ctx.copyMessage(chat);
    return { res: !!message, data: message };
  });
}
