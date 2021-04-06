import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

function editKeyboard({ reply_markup, likeCount, disslikeCount }) {
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
        button.value = `like-${likeCount}`;
      }
      if (/^disslike/.test(btn.callback_data)) {
        button.title = this._i18.t('bot.likesPlugin.disslike', { count: disslikeCount || '' });
        button.value = `disslike-${disslikeCount}`;
      }
      return button;
    }),
  );
  return createKeyboard({
    type: 'inline',
    buttons,
  });
}

async function setAction({ ctx, bot, action }) {
  const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
  const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');
  const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');

  const type = action;
  const telegramUserId = bot.getUserId(ctx);
  const telegramChatId = bot.getMessageChatId(ctx);
  const { message_id } = bot.getCallbackMessage(ctx);
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
      path: /^(diss)?like-\d*$/,
      action: async ({ ctx, req, bot }) => {
        ctx.answerCbQuery();
        const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
        const { message_id, reply_markup } = bot.getCallbackMessage(ctx);
        const { from: userData } = bot.getCallback(ctx);

        if (!message_id) return;
        const [action] = req.path.split('-');

        await BotsTelegramUserModel.findOneAndUpdate(userData, userData, {
          upsert: true,
        });
        await setAction.call(this, { ctx, bot, action });

        const likeCount = await getImpressionCount.call(this, { message_id, type: 'like' });
        const disslikeCount = await getImpressionCount.call(this, { message_id, type: 'disslike' });

        const extra = editKeyboard.call(this, { reply_markup, likeCount, disslikeCount });
        await bot.editMessageReplyMarkup(ctx, extra);
      },
    },
  ];
}

export function getButtons({ ctx }) {
  return [
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.disslike'),
      value: `disslike-`,
    },
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.like'),
      value: `like-`,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
