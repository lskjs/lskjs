export default async function reply(params) {
  const { parent = {}, text, extra } = params;

  const messageExtra = extra || parent.extra || {};
  const messageText = text || parent.text || '';

  return this.bot.reply(this.ctx, messageText, messageExtra);
}
