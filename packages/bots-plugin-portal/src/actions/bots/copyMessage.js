import Bluebird from 'bluebird';

export default async function copyMessage({ ctx, to }) {
  if (!to) throw '!to';
  const chats = Array.isArray(to) ? to : [to];
  return Bluebird.map(chats, async (chat) => ctx.copyMessage(chat));
}
