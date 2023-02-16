export default function () {
  return [
    {
      path: '/portal_answer',
      action: async ({ ctx, req, bot }) => {
        const BotsUserDataModel = await this.botsModule.module('models.BotsUserDataModel');
        const fromId = bot.getUserId(ctx);
        const { id: toId } = req.query;
        if (!toId || !fromId) return;

        const rules = [
          {
            criteria: {
              chatId: fromId,
            },
            action: {
              type: 'createMessage',
              then: {
                type: 'messageEditExtra',
                extra: [
                  {
                    type: 'answer',
                    text: 'Answer @{{username}}',
                  },
                ],
                then: {
                  type: 'sendMessage',
                  to: toId,
                },
              },
            },
          },
        ];

        const data = {
          plugin: 'bots-plugin-portal',
          telegramUserId: fromId,
          type: 'answer',
        };
        await BotsUserDataModel.deleteOne(data).lean();

        data.info = {};
        data.info.rules = rules;
        data.telegramChatId = toId;

        const newRule = new BotsUserDataModel(data);
        await newRule.save();
        ctx.answerCbQuery();
      },
    },
  ];
}
