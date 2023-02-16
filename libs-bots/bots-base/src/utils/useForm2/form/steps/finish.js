import { renderForm } from '../renderForm';

const getAutosumbitFinish = async ({ query, bot, form, onSubmit }) => {
  const { formMessageId, formMessageChatId } = query;
  await bot.client.telegram.deleteMessage(formMessageChatId, formMessageId);
  return onSubmit(form.getValues());
};

const getFinish = async ({ req, form }) => {
  const { bot, query, path, ctx } = req;
  const { repliedMessageId, formMessageId, formMessageChatId } = query;
  const { action, field, formName } = query;

  await bot.client.telegram.editMessageText(
    formMessageChatId,
    formMessageId,
    null,
    ...renderForm({ path, action, field, form, repliedMessageId, formName }),
  );
  return bot.reply(ctx, 'Если всё верно, подтвердите форму');
};

export default async ({ req, form, onSubmit, autosubmit }) => {
  const { bot, query } = req;
  if (autosubmit) {
    return getAutosumbitFinish({ query, bot, form, onSubmit });
  }
  return getFinish({ req, form });
};
