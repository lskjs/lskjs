import { IBotProvider, IBotProviderMessageCtx } from '@lskjs/bots-base/types';
import { getPrivateLinkToMessage } from '@lskjs/bots-base/utils/private-linker';
import { BaseBotPlugin } from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import Bluebird from 'bluebird';
import chunk from 'lodash/chunk';
import fromPairs from 'lodash/fromPairs';

export class DebugBotPlugin extends BaseBotPlugin {
  async setStartParams(bot: IBotProvider, user: any, ctx: IBotProviderMessageCtx): Promise<void> {
    // link example:
    // https://telegram.me/bot_username?start=startPayload-key1_value_key2_value
    const text = bot.getMessageText(ctx);
    if (!text) return;
    const [command, key, ...props] = text.split(/\s|-|_/);
    if (command !== '/start' || key !== 'startPayload') return;
    const locale = ctx.from.language_code;
    const data = fromPairs(chunk(props, 2));
    user.setRef(data);
    user.setLang(data, locale);
    await user.save();
  }

  async runBot(bot: IBotProvider, name: string): Promise<void> {
    if (!this.app) throw new Err('!app');
    if (this.config?.logger !== false) await this.runLogger(bot, name);
    if (this.config?.ping !== false) await this.runPing(bot);
    if (this.config?.chat !== false) await this.runChatId(bot, name);
    if (this.config?.link !== false) await this.runLink(bot);
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
        if (!this.botsModule) this.log.warn('!botsModule');
        const v = this.botsModule.v || 0;
        const text = `
*BotKit* \`v${v}\` 
Powerful starter kit for bot development on Telegram, Discord, Instagram, Twitter, Facebook, WhatsApp, Vkontakte

Do you want bot? Ask @isuvorov
Можем сделать тебе такого же, пиши 😉

Docs: [@lskjs/lskjs](https://github.com/lskjs/lskjs)
Npm: [@lskjs/bots](https://npmjs.com/package/@lskjs/bots)
Any question: @lskjschat

Made on @LSKjs with ❤️`;
        return bot.reply(ctx, text, { parse_mode: 'MarkdownV2' });
      }
      return null;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async runChatId(bot: IBotProvider, name: string): Promise<void> {
    bot.on('message', (ctx: IBotProviderMessageCtx) => {
      if (!bot.isMessageCommands(ctx, ['id', 'ид', 'chatid', 'чат'])) return;
      if (bot.provider === 'vk') {
        ctx.reply(ctx.message.reply_message ? ctx.message.reply_message.from_id : ctx.message.from_id);
      }
      if (bot.provider === 'telegram') {
        const renderMessage = (message: any) => `id: \`${message.message_id}\` [${bot.getMessageType(message)}]`;
        const renderChat = (chat: any) => `chatId: \`${chat.id}\` ${chat.type === 'supergroup' ? '[supergroup]' : ''}`; // [${chat.title}]
        const renderUser = (from: any) => `userId: \`${from.id}\` ${from.is_bot ? '[bot]' : ''}`;
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
    const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
    const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
    const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
    const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');

    const { provider } = bot;
    bot.eventTypes.forEach((type) => {
      bot.on(type, async (ctx) => {
        let eventData;
        if (provider === 'telegram' && type === 'callback_query') {
          eventData = ctx.update.callback_query;
          this.log.trace(`<${this.name}/${name}> [${type}]`, eventData);
        } else if (provider === 'telegram' && type === 'channel_post') {
          eventData = ctx.update.channel_post;
          this.log.trace(`<${this.name}/${name}> [${type}]`, eventData);
          if (this.config?.save === false) return;
          const messageType = bot.getMessageType(ctx);
          const { sender_chat, chat } = eventData;

          let chatUserId;
          if (chat && chat.id < 0) {
            const { id } = chat;
            ({ _id: chatUserId } = await BotsTelegramChatModel.findOneAndUpdate(
              { id },
              { id },
              {
                new: true,
                upsert: true,
              },
            ));
          }
          await BotsTelegramMessageModel.create({
            botId: bot.getBotId(),
            sender_chat,
            chatUserId,
            type: messageType,
            ...eventData,
          });
        } else if (provider === 'telegram' && type === 'message') {
          eventData = ctx.message;
          this.log.trace(`<${this.name}/${name}> [${type}]`, eventData);
          if (this.config?.save === false) return;
          // Don't wait
          const messageType = bot.getMessageType(ctx);
          const { from, chat } = eventData;
          const user = await BotsTelegramUserModel.findOneAndUpdate({ id: from.id }, from, {
            new: true,
            upsert: true,
          });
          const telegramUserId = user._id;
          await this.setStartParams(bot, user, ctx);
          let chatUserId;
          if (chat && chat.id < 0) {
            const { id } = chat;
            ({ _id: chatUserId } = await BotsTelegramChatModel.findOneAndUpdate(
              { id },
              { from, id },
              {
                new: true,
                upsert: true,
              },
            ));
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
          if (this.debug) this.log.trace('[CTX]', ctx);
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

  /**
   * Вешает обработчик который слушает команды на реплаи к сообщениям.
   *
   * Если команда совпадет со белым списком ('link', 'линк', 'ссылку')
   * то бот пытается сгенерить ссылку на реплайнутое сообщение и удалить
   * сообщение которое его стриггерило.
   *
   * @param bot
   */
  async runLink(bot: IBotProvider): Promise<void> {
    bot.on('message', async (ctx: IBotProviderMessageCtx) => {
      if (!bot.isMessageCommands(ctx, ['link', 'линк', 'ссылку'])) {
        return;
      }
      const chatId = bot.getMessageChatId(ctx);
      let removeMessageId: number | null = bot.getMessageId(ctx);
      if (!chatId) throw new Err('!chatId');
      if (!removeMessageId) throw new Err('!removeMessageId');
      let messageId = bot.getRepliedMessageId(ctx);
      if (!messageId) {
        messageId = removeMessageId;
        removeMessageId = null;
      }
      const text = getPrivateLinkToMessage({ chatId, messageId });
      await bot.reply(ctx, text);

      if (removeMessageId) await ctx.deleteMessage(removeMessageId);
    });
  }
}

export default DebugBotPlugin;
