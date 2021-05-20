import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

function editKeyboard({ message_id, chat_id, reply_markup, likeCount, disslikeCount }) {
  const inlineKeyboard = get(reply_markup, 'inline_keyboard', '');
  if (!inlineKeyboard) return {};
  const buttons = inlineKeyboard.map((array) =>
    array.map((btn) => {
      const button = {};
      if (btn.callback_data) {
        button.type = 'callback';
        button.title = btn.text;
        button.value = btn.callback_data;
      }
      if (btn.url) {
        button.type = 'url';
        button.title = btn.text;
        button.value = btn.url;
      }
      if (/^like/.test(btn.callback_data)) {
        button.title = this._i18.t('bot.likesPlugin.like', { count: likeCount || '' });
        button.value = `like_${likeCount}/msg_${message_id}/chat_${chat_id}`;
      }
      if (/^disslike/.test(btn.callback_data)) {
        button.title = this._i18.t('bot.likesPlugin.disslike', { count: disslikeCount || '' });
        button.value = `disslike_${disslikeCount}/msg_${message_id}/chat_${chat_id}`;
      }
      return button;
    }),
  );
  return createKeyboard({
    type: 'inline',
    buttons,
  });
}

async function setAction({ message_id, ctx, bot, action }) {
  const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
  const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');
  const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');

  const type = action;
  const telegramUserId = bot.getUserId(ctx);
  const telegramChatId = bot.getMessageChatId(ctx);

  const { _id: userId } = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('_id').lean();
  const { _id: chatId } = await BotsTelegramChatModel.findOne({ id: telegramChatId }).select('_id').lean();

  const data = { userId, chatId, message_id };

  return BotsTelegramImpressionModel.findOneAndUpdate(
    data,
    { ...data, type },
    {
      new: true,
      upsert: true,
    },
  );
}

async function getEventCount({ bot, ctx, type }) {
  // const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');
  const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
  const botId = bot.getBotId();
  const eventData = bot.getMessage(ctx);
  // const findData = pick(ctx, ['message_id', 'chat']);
  const findData = pick(eventData, ['message_id', 'chat']);
  // const findData = pick(ctx, ['chat']);
  // console.log('typeof ctx.message_id', typeof ctx.message_id);
  // console.log('typeof ctx.chat.id', typeof ctx.chat.id);
  // console.log('ctx', ctx);
  // console.log('deleteData', deleteData);
  console.log('>>>>>> findData', { type, data: findData });
  // const deleteEvent = await BotsEventModel.deleteOne(deleteData);
  // console.log('deleteEvent', deleteEvent);
  const events = await BotsEventModel.find({ type, data: findData }).select('_id').lean();
  console.log('<<<< events: ', events);
  if (isEmpty(events)) return 0;
  return events.length;
}

export default function () {
  return [
    {
      path: '/portal_like',
      action: async ({ ctx, req, bot }) => {
        // const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
        const { type, msg: messageId, chat } = req.query;
        const { reply_markup } = bot.getCallbackMessage(ctx);
        const { from: userData } = bot.getCallback(ctx);
        // console.log('req:', req);
        // console.log('getUser: ', bot.getUser(ctx));
        // console.log('getMessage: ', bot.getMessage(ctx));
        // console.log('JSON.stringify(req.query)', JSON.stringify(req.query));
        // const data = `${req.path}?${Object.entries(req.query)
        //   .map((e) => e.join('='))
        //   .join('&')}`;
        // const likeData = `/portal_like?type=like&msg=${messageId}&chat=${chat.id}`;
        // const disslikeData = `/portal_like?type=disslike&msg=${messageId}&chat=${chat.id}`;
        // console.log('data', data);
        // const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
        // const deleteData = pick(bot.getMessage(ctx), ['message_id', 'from', 'chat']);
        // const deleteEvent = await BotsEventModel.deleteOne(deleteData);
        // console.log('deleteEvent', deleteEvent);
        const event = await bot.saveEvent(ctx, { type });
        console.log('<<< event >>>', event);
        const likeCount = await getEventCount.call(this, { bot, ctx, type: 'like' });
        const disslikeCount = await getEventCount.call(this, { bot, ctx, type: 'disslike' });

        // console.log(await BotsEventModel.find().lean())
        // const [act, msg, chat] = req.path.split('/');
        // const [action] = act.split('_');
        // const [,message_id] = msg.split('_');
        // const [,chat_id] = chat.split('_');

        // await BotsTelegramUserModel.findOneAndUpdate(userData, userData, {
        //   upsert: true,
        // });
        // await setAction.call(this, { message_id, ctx, bot, action });

        // const likeCount = await getImpressionCount.call(this, { message_id, type: 'like' });
        // const disslikeCount = await getImpressionCount.call(this, { message_id, type: 'disslike' });

        // const extra = editKeyboard.call(this, { message_id, chat_id, reply_markup, likeCount, disslikeCount });
        // await bot.editMessageReplyMarkup(ctx, extra);
        // ctx.answerCbQuery(this._i18.t(`bot.likesPlugin.${action}`), { show_alert: false });
        ctx.answerCbQuery(`${disslikeCount}:${likeCount}`, { show_alert: false });
      },
    },
  ];
}
