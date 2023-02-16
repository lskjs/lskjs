import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import Bluebird from 'bluebird';

function createExtraKeyboard({ message_id, chat_id }) {
  return createKeyboard({
    type: 'inline',
    buttons: [
      {
        type: 'callback',
        title: this._i18.t('bot.likesPlugin.disslike'),
        value: `disslike_0/msg_${message_id}/chat_${chat_id}`,
      },
      {
        type: 'callback',
        title: this._i18.t('bot.likesPlugin.like'),
        value: `like_0/msg_${message_id}/chat_${chat_id}`,
      },
    ],
  });
}

function rand(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

export function getRoutes() {
  return [
    {
      path: /^(diss)?like_\d*\/msg_\d*\/chat_-?\d*$/,
      action: async ({ ctx, req, bot }) => {
        const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
        const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
        const BotsUserDataModel = await this.botsModule.module('models.BotsUserDataModel');

        const [act, message, chat] = req.path.split('/');
        const [action] = act.split('_');
        const [, message_id] = message.split('_');
        const [, chat_id] = chat.split('_');

        const { meta } = await BotsTelegramMessageModel.findOne({ message_id, 'chat.id': +chat_id })
          .select(['meta', 'reply_markup'])
          .lean();
        if (!meta.spread) return;

        const userId = bot.getUserId(ctx);
        const data = {
          plugin: 'bots-plugin-portal',
          type: 'spread',
          'info.message_id': message_id,
          telegramChatId: chat_id,
        };
        const updateData = await BotsUserDataModel.findOneAndUpdate(
          data,
          { ...data, telegramUserId: userId, 'info.action': action },
          { new: false, upsert: true },
        );
        if (updateData || action !== 'like') return;

        const usersData = await BotsUserDataModel.find(data).select('telegramUserId').lean();
        const usersDataIds = usersData.map((u) => u.telegramUserId);

        const count = await BotsTelegramUserModel.countDocuments({ is_bot: false });
        const users = await BotsTelegramUserModel.find({ id: { $nin: usersDataIds }, is_bot: false })
          .select('id')
          .skip(rand(0, count - 2))
          .limit(2)
          .lean();

        const extra = createExtraKeyboard.call(this, { message_id, chat_id });
        await Bluebird.map(
          users,
          async (user) => {
            await bot.repost(user.id, ctx, extra);
          },
          { concurrency: 100 },
        );
      },
    },
  ];
}

export function getButtons({ ctx }) {
  // TODO:
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
