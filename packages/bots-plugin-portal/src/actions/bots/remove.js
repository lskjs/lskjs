export default async function remove() {
  return this.bot.deleteMessage(this.ctx);
}
