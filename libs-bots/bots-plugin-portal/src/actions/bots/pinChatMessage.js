export default async function pinChatMessage() {
  const result = await this.bot.pinChatMessage(this.ctx);
  return { res: !!result, data: result };
}
