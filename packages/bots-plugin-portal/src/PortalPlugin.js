import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import isFunction from 'lodash/isFunction';

import { groupMessages } from './groupMessages';

const canonizeRule = (rule) => rule;
const canonizeRules = (rules = []) => rules.map(canonizeRule).filter(Boolean);

export default class PortalPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  async init() {
    await super.init();
    this.rules = canonizeRules(this.config.rules);
  }
  // Иного варианта, чтобы ловить медиагруппы не придумал.
  // Медиа отправляются в одном мгновение с точностью до миллисекунды
  media_group_id = 0;
  // TODO: перенести в provider-telegram и логику вынуть в middleware-debounce
  async addPrefix({ ctx, bot, then }) {
    const message = bot.getMessage(ctx);
    const { username, id, first_name: firstName, last_name: lastName } = ctx.from;
    const { to } = then;

    const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
    const prefix = `${name} [tg://user?id=${id}]\n\n`;

    if (message.media_group_id) {
      if (this.media_group_id !== message.media_group_id) {
        message.caption = `${prefix}`;
      }
      this.media_group_id = message.media_group_id;
    } else if (message.caption) {
      message.caption = `${prefix}${message.caption}`;
    } else if (message.text) {
      message.text = `${prefix}${message.text}`;
    } else {
      await bot.sendMessage(to, `${prefix}`);
    }
    return { ...ctx, message };
  }

  createSenderKeyboard(ctx = {}) {
    const { username, id, first_name: firstName, last_name: lastName } = ctx.from;
    const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
    const value = username ? `https://t.me/${username}` : `tg://user?id=${id}`;

    return createKeyboard({
      type: 'inline',
      buttons: [
        {
          type: 'url',
          title: name,
          value,
        },
      ],
    });
  }

  async onEvent({ event, ctx, bot }) {
    // const userId = bot.getMessageUserId(ctx);
    const userId = bot.getMessageChatId(ctx);
    const chatId = bot.getMessageChatId(ctx);
    const text = bot.getMessageText(ctx);
    const messageType = bot.getMessageType(ctx);
    const pack = { userId, chatId, text, messageType };
    // console.log(pack);
    const { rules } = this;
    const activeRules = rules
      .filter((rule) => {
        if (!rule.where) return true;
        if (isFunction(rule.where) && rule.where(pack)) return true;
        if (rule.where === userId || rule.where === chatId) return true;
        return false;
      })
      .filter((rule) => {
        if (!rule.when) return true;
        if (rule.when.text && rule.when.text === text) return true;

        const type = bot.getMessageType(ctx);
        if (rule.when.type && rule.when.type === type) return true;
        if (rule.when.types && rule.when.types.includes(type)) return true;

        return false;
      });

    // this.log.trace({ activeRules });
    await Bluebird.map(activeRules, async (rule) => {
      let { then: thens } = rule;
      if (!thens) return null;
      if (!Array.isArray(thens)) thens = [thens];
      return Bluebird.map(thens, async (then) => {
        if (then.action === 'reply') {
          return bot.reply(ctx, then.text);
        }
        if (then.action === 'sendMessage') {
          return bot.sendMessage(then.to, then.text);
        }
        if (then.action === 'repost') {
          let extra = {};
          if (then.sender) {
            const keyboard = this.createSenderKeyboard(ctx);
            extra = keyboard;
          }
          ctx.copyMessage(then.to, extra);
          return bot.repost(then.to, ctx, extra);
        }
        if (then.action === 'remove') {
          await ctx.deleteMessage();
        }
        return false;
      });
    });
  }

  runBot(bot) {
    const group = this.config.group ? groupMessages : (a) => a;

    bot.on(
      'message',
      group((ctx) => this.onEvent({ ctx, bot, event: 'message' })),
    );
    bot.on(
      'channel_post',
      group((ctx) => this.onEvent({ ctx, bot, event: 'channel_post' })),
    );
  }
}
