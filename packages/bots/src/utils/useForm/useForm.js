import { createForm } from './createForm';
import { renderForm } from './renderForm';

export const useForm = async function ({ i18, req, onSubmit, autoSubmitEnabled, ...formSchema2 }) {
  const { bot, query, path, ctx } = req;
  const { action = 'init', field, values = {}, ...otherQuery } = query;

  req.log.trace(path, query, ctx.session, {
    action,
    field,
    values,
    callback_query: ctx.update && ctx.update.callback_query,
    // ctx,
  });

  const form = createForm({
    ...formSchema2,
    i18,
    initialValues: values,
  });

  if (action === 'cancel') {
    const callbackUserId = bot.getMessageUserId(ctx);
    const callbackMessage = bot.getCallbackMessage(ctx);
    const repliedMessage = bot.getRepliedMessage(callbackMessage);
    const repliedMessageUserId = bot.getMessageUserId(repliedMessage);
    // console.log({ callbackUserId, callbackMessage, repliedMessage, repliedMessageUserId });

    if (repliedMessageUserId !== callbackUserId) {
      req.log.warn('!acl');
      return true;
    }
    // const consol
    // userId
    // if ()
    await ctx.deleteMessage().catch((err) => {
      req.log.error('deleteMessage', err);
    });
    // await bot.deleteMessage(ctx);
    return true;
  }
  if (action === 'init') {
    const repliedMessageId = bot.getRepliedMessageId(ctx) || bot.getMessageId(ctx);
    await bot.reply(ctx, ...renderForm({ path, action, field, form, repliedMessageId }));
    // await ctx.deleteMessage().catch((err) => {
    //   req.log.error('deleteMessage', err);
    // });
    return true;
    // return ctx.redirect({
    //   path,
    //   query: { repliedMessageId,  action: 'set', values: form.getValues() },
    // });
  }
  if (action === 'start') {
    const formMessageId = bot.getMessageId(bot.getCallbackMessage(ctx));
    const formMessageChatId = bot.getMessageChatId(bot.getCallbackMessage(ctx));
    return ctx.redirect({
      path,
      query: { ...otherQuery, formMessageId, formMessageChatId, action: 'set', values: form.getValues() },
    });
  }
  if (action === 'set') {
    const { repliedMessageId, formMessageId, formMessageChatId } = query;
    const nextField = form.fields[form.fields.indexOf(field) + 1];
    const text = bot.getMessageText(ctx);
    if (field) {
      if (!(await form.isValidField(field, text))) {
        const nextControl = form.controls[field];
        await bot.reply(ctx, `Не валидно\n${nextControl && nextControl.placeholder}`);
        return ctx.nextRedirect({
          path,
          query: { ...otherQuery, action: 'set', field, values: form.getValues() },
        });
      }
      form.setFieldValue(field, text);
      await bot.client.telegram.editMessageText(
        formMessageChatId,
        formMessageId,
        null,
        ...renderForm({ path, action, field, form, repliedMessageId }),
      );
    }
    if (!nextField) {
      return ctx.redirect({
        path,
        query: { ...otherQuery, action: 'finish', values: form.getValues() },
      });
    }
    const nextControl = form.controls[nextField];
    await bot.sendMessage(ctx, nextControl.placeholder);

    return ctx.nextRedirect({
      path,
      query: { ...otherQuery, action: 'set', field: nextField, values: form.getValues() },
    });
  }

  if(action === 'finish' && autoSubmitEnabled) {
    const { formMessageId, formMessageChatId } = query;
    await bot.client.telegram.deleteMessage(formMessageChatId, formMessageId);
    return onSubmit(values);
  }

  if (action === 'finish') {
    const { repliedMessageId, formMessageId, formMessageChatId } = query;
    await bot.client.telegram.editMessageText(
      formMessageChatId,
      formMessageId,
      null,
      ...renderForm({ path, action, field, form, repliedMessageId }),
    );

    // const text = map(form.fields, (name) => `${form.controls[name].title}: ${form.getValue(name)}`).join('\n');
    await bot.reply(ctx, 'Если всё верно, подтвердите форму');
  }
  if (action === 'submit') {
    return onSubmit(values);
  }
  req.log.error('!action', action);
  return false;
};

export default useForm;
