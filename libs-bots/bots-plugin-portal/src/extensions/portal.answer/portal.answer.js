export function getRoutes() {
  return [
    {
      path: /portal-toId-\d*/,
      action: async ({ ctx, req, bot }) => {
        const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
        const data = bot.getMessageCallbackData(ctx);
        const fromId = bot.getUserId(ctx);
        if (!data) return;
        const toId = data.split('-')[2];
        await BotsTelegramPortalRulesModel.deleteOne({ where: fromId }).lean();
        const newRule = new BotsTelegramPortalRulesModel({
          where: fromId,
          then: {
            answer: 1,
            action: 'repost',
            to: toId,
          },
        });
        await newRule.save();
        ctx.answerCbQuery();
      },
    },
  ];
}

export function getButtons({ ctx }) {
  const { username, id: fromId, first_name: firstName, last_name: lastName } = ctx.from;
  const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;

  return [
    {
      type: 'callback',
      title: this._i18.t('bot.portalPlugin.rules.answer', { name }),
      value: `portal-toId-${fromId}`,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
