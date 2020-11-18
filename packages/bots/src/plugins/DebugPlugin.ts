import BotPlugin from './BotPlugin';

export class DebugPlugin extends BotPlugin {
  async runBot(bot: IBotProvider, name: string): Promise<void> {
    await this.runLogger(bot, name);
    await this.runPing(bot, name);
    await this.runChatId(bot, name);
  }
  async runPing(bot: IBotProvider, name: string): Promise<void> {
    bot.on('message', (ctx) => {
      if (!bot.isMessageCommand(ctx, 'ping')) return null;
      return bot.reply(ctx, `pong`);
    });
  }
  async runChatId(bot: IBotProvider, name: string): Promise<void> {
    bot.on('message', (ctx) => {
      if (bot.provider === 'telegram' && bot.isMessageCommands(ctx, ['id', 'ид'])) {
        bot.reply(ctx, ctx.message.reply_to_message ? ctx.message.reply_to_message.from.id : ctx.message.from.id);
        return;
      }
      if (bot.provider === 'vk' && bot.isMessageCommands(ctx, ['id', 'ид'])) {
        ctx.reply(ctx.message.reply_message ? ctx.message.reply_message.from_id : ctx.message.from_id);
        return;
      }
      if (bot.provider === 'telegram' && bot.isMessageCommands(ctx, ['chatid', 'чат'])) {
        bot.reply(
          ctx,
          [ctx.message.from && `UserId: ${ctx.message.from.id}`, ctx.message.chat && `ChatId: ${ctx.message.chat.id}`]
            .filter(Boolean)
            .join('\n'),
        );
      }
    });
  }
  async runLogger(bot: IBotProvider, botName: string): Promise<void> {
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
            botId: bot.getBotId() || botName,
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

export default DebugPlugin;