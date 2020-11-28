import assignProps from '@lskjs/utils/assignProps';
import { BaseBotPlugin } from './BaseBotPlugin';
import { IBotProvider, IBotProviderMessageCtx } from '../types';

export class DebugBotPlugin extends BaseBotPlugin {
  constructor(...props: any[]) {
    super(...props);
    assignProps(this, ...props);
  }

  async runBot(bot: IBotProvider): Promise<void> {
    if (this.config?.logger !== false) await this.runLogger(bot);
    if (this.config?.ping !== false) await this.runPing(bot);
    if (this.config?.chat !== false) await this.runChatId(bot);
  }
  async runPing(bot: IBotProvider): Promise<void> {
    bot.on('message', (ctx: IBotProviderMessageCtx) => {
      if (bot.isMessageCommand(ctx, 'ping')) {
        const ms = Math.floor((Date.now() / 1000 - ctx.message.date) * 1000);
        return bot.reply(ctx, `[pong] ${ms}ms`);
      }
      if (bot.isMessageCommands(ctx, ['v', 'powered', 'poweredby'])) {
        const text = `
*BotKit* \`v${this.botsModule.v}\` 
Powerful starter kit for bot development on Telegram, Discord, Instagram, Twitter, Facebook, WhatsApp, Vkontakte

Do you want bot? Ask @isuvorov
Можем сделать тебе такого же, пиши 😉

Docs: [@lskjs/lskjs](https://github.com/lskjs/lskjs)
Npm: [@lskjs/bots](https://npmjs.com/package/@lskjs/bots)
Any question: @lskjschat

Made on @LSKjs with ❤️`;
        return bot.reply(ctx, text, { parse_mode: 'MarkdownV2' });
      }
    });
  }
  async runChatId(bot: IBotProvider, name: string): Promise<void> {
    bot.on('message', (ctx: IBotProviderMessageCtx) => {
      if (this.debug)
        this.log.trace('bot.isMessageCommands', name, bot.isMessageCommands(ctx, ['id', 'ид', 'chatid', 'чат']));
      if (!bot.isMessageCommands(ctx, ['id', 'ид', 'chatid', 'чат'])) return;
      if (bot.provider === 'vk') {
        ctx.reply(ctx.message.reply_message ? ctx.message.reply_message.from_id : ctx.message.from_id);
      }
      if (bot.provider === 'telegram') {
        const text = [
          '*Message*',
          `id: \`${ctx.message.id}\``,
          ctx.message.from && `userId: \`${ctx.message.from.id}\``,
          ctx.message.chat && `chatId: \`${ctx.message.chat.id}\``,
          ctx.message.reply_to_message && '\n*REPLIED MESSAGE*',
          ctx.message.reply_to_message && `messageId: \`${ctx.message.reply_to_message.message_id}\``,
          ctx.message.reply_to_message &&
            ctx.message.reply_to_message.from &&
            `userId: \`${ctx.message.reply_to_message.from.id}\``,
          ctx.message.reply_to_message &&
            ctx.message.reply_to_message.from.is_bot &&
            `isBot: \`${ctx.message.reply_to_message.from.is_bot}\``,
        ]
          .filter(Boolean)
          .join('\n');
        bot.reply(ctx, text, { parse_mode: 'MarkdownV2' });
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
          if (this.config?.save === false) return;
          // Don't wait
          const messageType = bot.getMessageType(ctx);
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
