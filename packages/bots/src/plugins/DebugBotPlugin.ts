import assignProps from '@lskjs/utils/assignProps';
import { BaseBotPlugin } from './BaseBotPlugin';
import { IBotProvider, IBotProviderMessageCtx } from '../types';

export class DebugBotPlugin extends BaseBotPlugin {
  constructor(...props: any[]) {
    super(...props);
    assignProps(this, ...props);
  }

  async runBot(bot: IBotProvider): Promise<void> {
    await this.runLogger(bot);
    await this.runPing(bot);
    await this.runChatId(bot);
  }
  async runPing(bot: IBotProvider): Promise<void> {
    bot.on('message', (ctx: IBotProviderMessageCtx) => {
      if (!bot.isMessageCommand(ctx, 'ping')) return null;
      return bot.reply(ctx, `pong`);
    });
  }
  async runChatId(bot: IBotProvider): Promise<void> {
    bot.on('message', (ctx: IBotProviderMessageCtx) => {
      if (!bot.isMessageCommands(ctx, ['id', 'ид', 'chatid', 'чат'])) return;
      if (bot.provider === 'vk') {
        ctx.reply(ctx.message.reply_message ? ctx.message.reply_message.from_id : ctx.message.from_id);
      }
      if (bot.provider === 'telegram') {
        bot.reply(
          ctx,
          [ctx.message.from && `UserId: ${ctx.message.from.id}`, ctx.message.chat && `ChatId: ${ctx.message.chat.id}`]
            .filter(Boolean)
            .join('\n'),
        );
      }
    });
  }
  async runLogger(bot: IBotProvider): Promise<void> {
    const { BotsEventModel, BotsTelegramMessageModel, BotsTelegramUserModel, BotsTelegramChatModel } = this.app.models;
    const { provider } = bot;
    bot.eventTypes.forEach((type) => {
      bot.on(type, async (ctx) => {
        let eventData;
        if (provider === 'telegram' && type === 'message') {
          eventData = ctx.message;
          this.log.trace(`<${this.name}/${bot.name}> [${type}]`, eventData);
          // Don't wait
          const messageType = bot.getMessageType(ctx);
          console.log({ messageType });

          const { from, chat } = ctx.message;

          const { _id: telegramUserId } = await BotsTelegramUserModel.findOneAndUpdate({ id: from.id }, from, {
            new: true,
            upsert: true,
          });
          let chatUserId;

          if (chat && chat.id < 0) {
            ({ _id: chatUserId } = await BotsTelegramChatModel.findOneAndUpdate({ id: chat.id }, from, {
              new: true,
              upsert: true,
            }));
          }

          await BotsTelegramMessageModel.create({
            botId: bot.getBotId(),
            telegramUserId,
            chatUserId,
            type: messageType,
            ...eventData,
          });
          // } else if (provider === 'discord') {
          //   console.log(ctx);
        } else {
          this.log.warn(`<${this.name}/${bot.name}> [${type}] LOGGER NOT IMPLEMENTED`);
        }
        await BotsEventModel.create({
          botId: bot.getBotId(),
          provider: bot.provider,
          type,
          data: eventData,
        });
      });
    });
  }
}

export default DebugBotPlugin;
