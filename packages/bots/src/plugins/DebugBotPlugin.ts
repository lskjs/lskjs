import assignProps from '@lskjs/utils/assignProps';
import Bluebird from 'bluebird';
import { BaseBotPlugin } from './BaseBotPlugin';
import { IBotProvider, IBotProviderMessageCtx } from '../types';

export class DebugBotPlugin extends BaseBotPlugin {
  constructor(...props: any[]) {
    super(...props);
    assignProps(this, ...props);
  }

  async runBot(bot: IBotProvider, name: string): Promise<void> {
    if (this.config?.logger !== false) await this.runLogger(bot, name);
    if (this.config?.ping !== false) await this.runPing(bot);
    if (this.config?.chat !== false) await this.runChatId(bot);
  }
  async runPing(bot: IBotProvider): Promise<void> {
    bot.on('message', async (ctx: IBotProviderMessageCtx) => {
      if (bot.isMessageCommand(ctx, 'kill')) {
        this.log.error('KILL FORM USER', bot.getMessageUserId(ctx));
        bot.reply(ctx, '[ok]');
        await Bluebird.delay(1000);
        process.exit(1);
        return null;
      }
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
      if (!bot.isMessageCommands(ctx, ['id', 'ид', 'chatid', 'чат'])) return;
      if (bot.provider === 'vk') {
        ctx.reply(ctx.message.reply_message ? ctx.message.reply_message.from_id : ctx.message.from_id);
      }
      if (bot.provider === 'telegram') {
        const renderMessage = (message) => `id: \`${message.message_id}\` [${bot.getMessageType(message)}]`;
        const renderChat = (chat) => `chatId: \`${chat.id}\` ${chat.type === 'supergroup' ? '[supergroup]' : ''}`; // [${chat.title}]
        const renderUser = (from) => `userId: \`${from.id}\` ${from.is_bot ? '[bot]' : ''}`;
        const text = [
          '*Message*',
          renderMessage(ctx.message),
          ctx.message.from && renderUser(ctx.message.from),
          ctx.message.chat && renderChat(ctx.message.chat),
          ctx.message.reply_to_message && '\n*Replied message*',
          ctx.message.reply_to_message && renderMessage(ctx.message.reply_to_message),
          ctx.message.reply_to_message &&
            ctx.message.reply_to_message.from &&
            renderUser(ctx.message.reply_to_message.from),
          ctx.message.reply_to_message && ctx.message.reply_to_message.forward_from && '\n*Forwarded user*',
          ctx.message.reply_to_message &&
            ctx.message.reply_to_message.forward_from &&
            renderUser(ctx.message.reply_to_message.forward_from),
        ]
          .filter(Boolean)
          .join('\n');
        bot.reply(ctx, text, { parse_mode: 'MarkdownV2' });
      }
    });
  }
  async runLogger(bot: IBotProvider, name: string): Promise<void> {
    const { BotsEventModel, BotsTelegramMessageModel, BotsTelegramUserModel, BotsTelegramChatModel } = this.app.models;
    const { provider } = bot;
    bot.eventTypes.forEach((type) => {
      bot.on(type, async (ctx) => {
        let eventData;
        if (provider === 'telegram' && type === 'message') {
          eventData = ctx.message;
          this.log.trace(`<${this.name}/${name}> [${type}]`, eventData);
        } else if (provider === 'telegram' && type === 'message') {
          eventData = ctx.message;
          this.log.trace(`<${this.name}/${name}> [${type}]`, eventData);
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
          this.log.warn(`<${this.name}/${name}> [${provider}/${type}] LOGGER NOT IMPLEMENTED`);
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
