export default async ({ req }) => {
  const { bot, ctx } = req;
  const callbackUserId = bot.getUserId(ctx);
  const callbackMessage = bot.getCallbackMessage(ctx);
  const repliedMessage = bot.getRepliedMessage(callbackMessage);
  const repliedMessageUserId = bot.getMessageUserId(repliedMessage);

  if (repliedMessageUserId !== callbackUserId) {
    req.log.warn('!acl');
    return true;
  }
  return ctx.deleteMessage().catch((err) => {
    req.log.error('deleteMessage', err);
  });
};
