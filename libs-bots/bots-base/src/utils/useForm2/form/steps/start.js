export default async ({ req, form }) => {
  const { bot, query, path, ctx } = req;
  const { formName, ...otherQuery } = query;

  const formMessageId = bot.getMessageId(bot.getCallbackMessage(ctx));
  const formMessageChatId = bot.getMessageChatId(bot.getCallbackMessage(ctx));

  return ctx.redirect({
    path,
    query: { ...otherQuery, formMessageId, formMessageChatId, action: 'set', values: form.getValues(), formName },
  });
};
