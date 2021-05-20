export default function () {
  return [
    {
      path: '/portal_answer',
      action: async ({ ctx, req, bot }) => {
        // TODO: реализация answer-роута

        // const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
        // const { id } = req.query;
        // const fromId = bot.getUserId(ctx);
        // if (!id) return;
        // // const toId = data.split('-')[2];
        // await BotsTelegramPortalRulesModel.deleteOne({ where: fromId }).lean();
        // const newRule = new BotsTelegramPortalRulesModel({
        //   where: fromId,
        //   then: {
        //     answer: 1,
        //     action: 'repost',
        //     to: id,
        //   },
        // });
        // await newRule.save();
        ctx.answerCbQuery();
      },
    },
  ];
}
