import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

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

async function getImpressionCount({ message_id, type }) {
  const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');
  const impressions = await BotsTelegramImpressionModel.find({ message_id, type }).select('_id').lean();
  if (isEmpty(impressions)) return 0;
  return impressions.length;
}

export function getRoutes() {
  return [
    {
      path: /^(diss)?like_\d*\/msg_\d*\/chat_-?\d*$/,
      action: async ({ ctx, req, bot }) => {
        const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
        const { reply_markup } = bot.getCallbackMessage(ctx);
        const { from: userData } = bot.getCallback(ctx);

        const [act, msg, chat] = req.path.split('/');
        const [action] = act.split('_');
        const [,message_id] = msg.split('_');
        const [,chat_id] = chat.split('_');

        await BotsTelegramUserModel.findOneAndUpdate(userData, userData, {
          upsert: true,
        });
        await setAction.call(this, { message_id, ctx, bot, action });

        const likeCount = await getImpressionCount.call(this, { message_id, type: 'like' });
        const disslikeCount = await getImpressionCount.call(this, { message_id, type: 'disslike' });

        const extra = editKeyboard.call(this, { message_id, chat_id, reply_markup, likeCount, disslikeCount });
        await bot.editMessageReplyMarkup(ctx, extra);
        ctx.answerCbQuery(this._i18.t(`bot.likesPlugin.${action}`), { show_alert: false });
      },
    },
  ];
}

export function getButtons({ bot, ctx }) {
  const { message_id, chat } = bot.getMessage(ctx);
  return [
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.disslike'),
      value: `disslike_0/msg_${message_id}/chat_${chat.id}`,
    },
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.like'),
      value: `like_0/msg_${message_id}/chat_${chat.id}`,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
