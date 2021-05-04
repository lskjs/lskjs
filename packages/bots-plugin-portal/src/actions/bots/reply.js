export default async function reply({ text }) {
  const message = await this.bot.reply(this.ctx, text);
  return { res: !!message, data: message };
}
