import useForm from '@lskjs/bots-base/utils/useForm2';
import BaseBotPlugin from '@lskjs/bots-plugin';
import set from 'lodash/set';

export default class InterviewBotPlugin extends BaseBotPlugin {
  providers = ['telegram'];

  async getUserStorage({ bot, ctx }) {
    const BotsTelegramUserStorageModel = await this.botsModule.module('models.BotsTelegramUserStorageModel');
    const telegramUserId = bot.getUserId(ctx);
    const telegramChatId = bot.getMessageChatId(ctx);
    return BotsTelegramUserStorageModel.findOne({ telegramUserId, telegramChatId });
  }

  getRoutes() {
    return [
      {
        path: '/interview',
        action: async ({ ctx, req, bot }) => {
          const { formName, mode, preview = false, autosubmit = false } = req.query;
          const schema = this.config.forms[formName];
          return useForm({
            req,
            preview,
            autosubmit,
            ...schema,
            formName,
            mode,
            // onChange: async ({ field, values }) => {
            //   if (field === 'code' && values.code !== 1234) {
            //     await ctx.reply('Авторизация не удалась. Попробуйте позднее');
            //     return 'error';
            //   }
            // },
            onSubmit: async (params) => {
              const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
              const interview = {};
              set(interview, `meta.interview.${formName}`, params);
              await BotsTelegramUserModel.updateOne(bot.getUser(ctx), interview);

              const { storage } = await this.getUserStorage({ bot, ctx });
              await bot.reply(ctx, 'Форма заполнена.');
              const actionModule = await this.module('action');
              return actionModule.runAction(storage.then, { ctx, bot, action: storage.then });
            },
          });
        },
      },
      {
        path: '/interview_healthcheck',
        action: async ({ ctx, bot }) => bot.reply(ctx, 'Интервью!'),
      },
    ];
  }
}
