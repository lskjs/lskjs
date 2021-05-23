export default async function editMessage(params) {
  const { parent = {}, text = '', extra } = params;
  const messageExtra = extra || parent.extra || {};
  const messageText = text || parent.text || '';
  const data = messageText
    ? this.bot.editMessage(this.ctx, messageText, messageExtra)
    : this.bot.editMessageReplyMarkup(this.ctx, messageExtra);
  return { res: true, data };
}
