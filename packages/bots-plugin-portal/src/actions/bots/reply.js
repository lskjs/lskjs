// import Bluebird from 'bluebird';

export default async function reply({ ctx, bot, text }) {
  return bot.reply(ctx, text);
}

// export default async function sendMessage({ bot, to, ...params }) {
//   return bot.reply(params.text || params);
// }
