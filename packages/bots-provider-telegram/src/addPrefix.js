// TODO from PortalPlugin: перенести в provider-telegram и логику вынуть в middleware-debounce
// async addPrefix({ ctx, bot, then }) {
//   const message = bot.getMessage(ctx);
//   const { username, id, first_name: firstName, last_name: lastName } = ctx.from;
//   const { to } = then;

//   const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
//   const prefix = `${name} [tg://user?id=${id}]\n\n`;

//   if (message.media_group_id) {
//     if (this.media_group_id !== message.media_group_id) {
//       message.caption = `${prefix}`;
//     }
//     this.media_group_id = message.media_group_id;
//   } else if (message.caption) {
//     message.caption = `${prefix}${message.caption}`;
//   } else if (message.text) {
//     message.text = `${prefix}${message.text}`;
//   } else {
//     await bot.sendMessage(to, `${prefix}`);
//   }
//   return { ...ctx, message };
// }
