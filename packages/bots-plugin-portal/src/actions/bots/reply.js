// import Bluebird from 'bluebird';

export default async function reply({ text }) {
  return this.bot.reply(this.ctx, text);
}

// export default async function sendMessage({ bot, to, ...params }) {
//   return bot.reply(params.text || params);
// }
