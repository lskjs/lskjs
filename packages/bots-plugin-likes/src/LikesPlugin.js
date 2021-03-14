import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default class LikesPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
        },
      };
      return get(table, key, key);
    },
  };
  editKeyboard({ reply_markup, likeCount, disslikeCount }) {
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
          button.title = this._i18.t('bot.likesPlugin.like', { count: likeCount });
          button.value = `like-${likeCount}`;
        }
        if (/^disslike/.test(btn.callback_data)) {
          button.title = this._i18.t('bot.likesPlugin.disslike', { count: disslikeCount });
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

  async updateData({ Model, data, update = true, save = true, ...props }) {
    const obj = await Model.findOne(data).select('_id').lean();
    if (obj && update) {
      return Model.updateOne({ _id: obj._id }, { ...data, ...props, updatedAt: new Date() });
    }
    if (!obj && save) {
      const newObj = new Model({ ...data, ...props, createdAt: new Date(), updatedAt: new Date() });
      return newObj.save();
    }
    return {};
  }

  async setAction({ ctx, bot, action }) {
    const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
    const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');
    const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');

    const type = action;
    const telegramUserId = bot.getMessageUserId(ctx);
    const telegramChatId = bot.getMessageChatId(ctx);
    const { message_id } = bot.getCallbackMessage(ctx);
    const { _id: userId } = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('_id').lean();
    const { _id: chatId } = await BotsTelegramChatModel.findOne({ id: telegramChatId }).select('_id').lean();

    const data = { userId, chatId, message_id };
    return this.updateData({ Model: BotsTelegramImpressionModel, data, type });
  }

  async getImpressionCount({ message_id, type }) {
    const BotsTelegramImpressionModel = await this.botsModule.module('models.BotsTelegramImpressionModel');
    const impressions = await BotsTelegramImpressionModel.find({ message_id, type }).select('_id').lean();
    if (isEmpty(impressions)) return 0;
    return impressions.length;
  }

  getRoutes() {
    return [
      {
        path: /^(diss)?like-\d*$/,
        action: async ({ ctx, req, bot }) => {
          ctx.answerCbQuery();
          const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
          const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
          const { message_id, reply_markup } = bot.getCallbackMessage(ctx);
          const { from: userData } = bot.getCallback(ctx);

          if (!message_id) return;
          const [action] = req.path.split('-');

          await this.updateData({ Model: BotsTelegramUserModel, data: userData, update: false });
          await this.setAction({ ctx, bot, action });

          const likeCount = await this.getImpressionCount({ message_id, type: 'like' });
          const disslikeCount = await this.getImpressionCount({ message_id, type: 'disslike' });

          const extra = this.editKeyboard({ reply_markup, likeCount, disslikeCount });
          await bot.editMessageReplyMarkup(ctx, extra);
        },
      },
    ];
  }
}
