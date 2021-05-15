import { renderForm } from '../renderForm';

export default async ({ req, form, onChange, preview }) => {
  const { bot, query, path, ctx } = req;
  const { action, field, formName, ...otherQuery } = query;
  const { repliedMessageId, formMessageId, formMessageChatId } = query;

  const nextField = form.fields[form.fields.indexOf(field) + 1];
  const text = bot.getMessageText(ctx);

  if (field) {
    if (!(await form.isValidField(field, text))) {
      const nextControl = form.controls[field];
      await bot.reply(ctx, `Не валидно\n${nextControl && nextControl.placeholder}`);
      return ctx.nextRedirect({
        path,
        query: { ...otherQuery, action: 'set', field, values: form.getValues(), formName },
      });
    }
    form.setFieldValue(field, text);

    const onChangeResult = await onChange({
      field,
      rawValue: text,
      values: form.getValues(),
      formName,
    });
    if (onChangeResult === 'error') return false;

    if (preview) {
      await bot.client.telegram.editMessageText(
        formMessageChatId,
        formMessageId,
        null,
        ...renderForm({ path, action, field, form, repliedMessageId, formName }),
      );
    }
  }
  if (!nextField) {
    return ctx.redirect({
      path,
      query: { ...otherQuery, action: 'finish', values: form.getValues(), formName },
    });
  }
  const nextControl = form.controls[nextField];
  await bot.sendMessage(ctx, nextControl.placeholder);

  return ctx.nextRedirect({
    path,
    query: { ...otherQuery, action: 'set', field: nextField, values: form.getValues(), formName },
  });
};
