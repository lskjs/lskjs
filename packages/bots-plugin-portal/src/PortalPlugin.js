import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import uniqBy from 'lodash/uniqBy';

import { groupMessages } from './groupMessages';

const canonizeRule = (rule) => rule;
const canonizeRules = (rules = []) => rules.map(canonizeRule).filter(Boolean);

export default class PortalPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
          portalPlugin: {
            delay: `Братишка, не флуди`,
          },
        },
      };
      return get(table, key, key);
    },
  };
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

  async isDelayed({ bot, ctx, then, chats }) {
    if (!then.delay) return false;
    const telegramUserId = bot.getUserId(ctx);
    const telegramChatId = bot.getMessageChatId(ctx);
    if (+telegramChatId < 0) return false;

    const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
    const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');
    const BotsUserDataModel = await this.botsModule.module('models.BotsUserDataModel');

    const user = await BotsTelegramUserModel.findOne({ id: telegramUserId }).select('id').lean();
    if (!user) return false;
    const userId = user._id;

    const data = {
      userId,
      plugin: 'bots-plugin-portal',
      type: 'delay',
    };
    const userChats = await BotsTelegramChatModel.find({ id: { $in: chats } })
      .select(['_id', 'id'])
      .lean();
    const chatsIds = uniqBy(userChats, 'id').map((c) => c._id);

    let delay = false;
    await Bluebird.all(
      chatsIds.map(async (chatId) => {
        const userData = await BotsUserDataModel.findOne({ ...data, chatId }).select(['count', 'updatedAt']);
        if (userData) {
          const { count, updatedAt } = userData;
          if (new Date().getTime() - count < updatedAt) {
            delay = true;
            return {};
          }
          userData.markModified('updatedAt');
          userData.updatedAt = new Date();
          return userData.save();
        }
        const newUserData = new BotsUserDataModel({
          ...data,
          chatId,
          count: 20 * 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return newUserData.save();
      }),
    );
    return delay;
  }

  createExtraKeyboard({ ctx = {}, then }) {
    const { username, id, first_name: firstName, last_name: lastName } = ctx.from;
    const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
    const value = username ? `https://t.me/${username}` : `tg://user?id=${id}`;
    const buttons = [];

    if (then.like) {
      buttons.push([
        {
          type: 'callback',
          title: this._i18.t('bot.likesPlugin.disslike'),
          value: `disslike-`,
        },
        {
          type: 'callback',
          title: this._i18.t('bot.likesPlugin.like'),
          value: `like-`,
        },
      ]);
    }

    if (then.sender) {
      buttons.push([
        {
          type: 'url',
          title: name,
          value,
        },
      ]);
    }

    return createKeyboard({
      type: 'inline',
      buttons,
    });
  }

  async chatsActions({ chats, ctx, bot, then }) {
    if (isEmpty(chats)) return;
    await Bluebird.each(chats, async (chat) => {
      Object.assign(then, { to: chat });
      await this.thenBotActions({ ctx, bot, then });
    });
    await Bluebird.delay(10);
  }

  async getChatsForActions({ then }) {
    const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
    const params = {};
    if (then.to instanceof Object) Object.assign(params, then.to);
    const chats = await BotsTelegramUserModel.find(params).select('id').lean();
    return chats.map((i) => i.id);
  }

  async thenBotActions({ ctx, bot, then }) {
    if (then.action === 'reply') {
      return bot.reply(ctx, then.text);
    }
    if (then.action === 'sendMessage') {
      return bot.sendMessage(then.to, then.text);
    }
    if (then.action === 'repost') {
      const extra = this.createExtraKeyboard({ ctx, then });
      return bot.repost(then.to, ctx, extra);
    }
    if (then.action === 'remove') {
      await ctx.deleteMessage();
    }
    return false;
  }

  async updateRules({ ctx, bot, rules }) {
    const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
    const fromId = bot.getUserId(ctx);
    const userRules = await BotsTelegramPortalRulesModel.find({ where: fromId })
      .select(['then', 'when', 'where'])
      .lean();
    return [...rules, ...userRules];
  }

  async onEvent({ event, ctx, bot }) {
    const userId = bot.getUserId(ctx);
    const chatId = bot.getMessageChatId(ctx);
    const text = bot.getMessageText(ctx);
    const messageType = bot.getMessageType(ctx);
    const pack = { userId, chatId, text, messageType };

    const rules = await this.updateRules({ ctx, bot, rules: this.rules });
    const activeRules = rules
      .filter((rule) => {
        if (!rule.where) return true;
        if (isFunction(rule.where) && rule.where(pack)) return true;
        if (`${rule.where}` === `${userId}` || `${rule.where}` === `${chatId}`) return true;
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
    if (isEmpty(activeRules)) return;
    let delay = false;
    await Bluebird.map(activeRules, async (rule) => {
      let { then: thens } = rule;
      if (!thens) return null;
      if (!Array.isArray(thens)) thens = [thens];
      if (isEmpty(thens)) return {};
      return Bluebird.map(thens, async (then) => {
        // let users = [then.to].map((i) => ({ id: i }));
        let chats = [then.to];
        if (Array.isArray(then.to)) {
          // to: [1234567890, '0987654321'],
          // const ids = then.to.filter((i) => ['number', 'string'].includes(typeof i));
          // users = ids.map((i) => ({ id: i }));
          chats = then.to.filter((i) => ['number', 'string'].includes(typeof i));
        } else if (then.to instanceof Object || then.to === '*') {
          // to: { id: { $in: ['1234567890', '0987654321'] }, meta: $exists }, // Mongodb config
          // to: '*', // get all users // analog {}
          chats = await this.getChatsForActions({ then });
        }
        if (await this.isDelayed({ bot, ctx, then, chats })) {
          delay = true;
          return {};
        }
        return this.chatsActions({ chats, ctx, bot, then });
      });
    });
    if (delay) await ctx.reply(this._i18.t('bot.portalPlugin.delay'));
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
