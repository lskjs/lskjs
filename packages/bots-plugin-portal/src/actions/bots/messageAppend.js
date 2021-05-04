export default async function messageAppend(params) {
  const { text } = params;

  let messageText = this.bot.getMessageText(this.ctx);
  messageText += text;

  this.ctx = this.bot.setMessageText(this.ctx, messageText);
  return { res: true };
}
