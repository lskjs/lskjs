export default async function remove() {
  const message = await this.bot.deleteMessage(this.ctx);
  return { res: !!message, data: message };
}
