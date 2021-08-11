export default async function remove() {
  const result = await this.bot.deleteMessage(this.ctx);
  return { res: !!result, data: result };
}
