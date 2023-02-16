import { renderForm } from '../renderForm';

export default async ({ req, form }) => {
  const { bot, query, path, ctx } = req;
  const { action = 'init', field, formName } = query;
  const repliedMessageId = bot.getRepliedMessageId(ctx) || bot.getMessageId(ctx);
  return bot.reply(ctx, ...renderForm({ path, action, field, form, repliedMessageId, formName }));
};
