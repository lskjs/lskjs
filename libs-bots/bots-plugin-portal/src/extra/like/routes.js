import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

async function getEventCount({ bot, ctx, type }) {
  const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
  const botId = bot.getBotId();
  const eventData = bot.getMessage(ctx);
  const data = pick(eventData, ['message_id', 'chat']);
  const { chat, message_id: messageId } = data;
  const events = await BotsEventModel.find({ botId, type, 'data.chat': chat, 'data.message_id': messageId })
    .select('_id')
    .lean();
  if (isEmpty(events)) return 0;
  return events.length;
}

export default function () {
  return [
    {
      path: '/portal_like',
      action: async ({ ctx, req, bot }) => {
        const { type } = req.query;
        await bot.saveEvent(ctx, { type });
        const likeCount = await getEventCount.call(this, { bot, ctx, type: 'like' });
        const disslikeCount = await getEventCount.call(this, { bot, ctx, type: 'disslike' });

        const actionModule = await this.module('action');
        const action = {
          type: 'messageEditExtra',
          extra: [
            {
              type: 'like',
              buttons: {
                like: {
                  value: likeCount,
                },
                disslike: {
                  value: disslikeCount,
                },
              },
            },
          ],
          then: {
            type: 'editMessage',
          },
          ctx,
        };
        await actionModule.runAction(action, { bot, action });
        const alertText = type === 'like' ? '❤️' : '💔';
        return ctx.answerCbQuery(alertText, { show_alert: false });
      },
    },
  ];
}
