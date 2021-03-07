import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import get from 'lodash/get';

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

  getRoutes() {
    return [
      {
        path: /^(diss)?like-\d*$/,
        action: async ({ ctx, req, bot }) => {
          ctx.answerCbQuery();
          const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
          const { message_id, reply_markup } = bot.getCallbackMessage(ctx);

          if (!message_id) return;
          const message = await BotsTelegramMessageModel.findOne({ message_id }).select('meta');
          const userId = bot.getMessageUserId(ctx);

          const [action] = req.path.split('-');
          if (action === 'like') await message.setLike(userId);
          if (action === 'disslike') await message.setDissLike(userId);

          const likeCount = get(message, 'meta.likeUserIds', []).length;
          const disslikeCount = get(message, 'meta.disslikeUserIds', []).length;

          const extra = this.editKeyboard({ reply_markup, likeCount, disslikeCount });
          await bot.editMessageReplyMarkup(ctx, extra);
        },
      },
    ];
  }
}
