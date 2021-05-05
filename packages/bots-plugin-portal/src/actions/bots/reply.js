export default async function reply({ text }) {
  return this.bot.reply(this.ctx, text);
}
