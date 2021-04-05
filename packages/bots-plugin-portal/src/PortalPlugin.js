import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import extensions from './extensions';
import { groupMessages } from './groupMessages';
import { canonizeChatIds, getActiveRules } from './utils';

const canonizeRule = (rule) => rule;
const canonizeRules = (rules = []) => rules.map(canonizeRule).filter(Boolean);

export default class PortalPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '', name = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
          portalPlugin: {
            rules: {
              answer: `Ответить ${name}`,
            },
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
  // TODO: перенести в provider-telegram и логику вынуть в middleware-debounce
  // async addPrefix({ ctx, bot, then }) {
  //   const message = bot.getMessage(ctx);
  //   const { username, id, first_name: firstName, last_name: lastName } = ctx.from;
  //   const { to } = then;

  //   const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
  //   const prefix = `${name} [tg://user?id=${id}]\n\n`;

  //   if (message.media_group_id) {
  //     if (this.media_group_id !== message.media_group_id) {
  //       message.caption = `${prefix}`;
  //     }
  //     this.media_group_id = message.media_group_id;
  //   } else if (message.caption) {
  //     message.caption = `${prefix}${message.caption}`;
  //   } else if (message.text) {
  //     message.text = `${prefix}${message.text}`;
  //   } else {
  //     await bot.sendMessage(to, `${prefix}`);
  //   }
  //   return { ...ctx, message };
  // }

  createExtraKeyboard({ ctx = {}, then }) {
    const buttons = [];

    Object.keys(extensions).forEach((key) => {
      const { getButtons } = extensions[key];
      if (!then[key] || !getButtons) return;
      buttons.push(getButtons.call(this, { ctx }));
    });

    return createKeyboard({
      type: 'inline',
      buttons,
    });
  }

  async getActions({ chats, ctx, bot, then }) {
    if (isEmpty(chats)) return;
    await Bluebird.each(chats, async (chat) => {
      Object.assign(then, { to: chat });
      await this.botActions({ ctx, bot, then });
    });
    await Bluebird.delay(10);
  }

  async botActions({ ctx, bot, then }) {
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

  async onEvent({ event, ctx, bot }) {
    const activeRules = await getActiveRules.call(this, { ctx, bot });
    // this.log.trace({ activeRules });
    if (isEmpty(activeRules)) return;
    let Delay = false;
    await Bluebird.map(activeRules, async (rule) => {
      let { then: thens } = rule;
      if (!thens) return null;
      if (!Array.isArray(thens)) thens = [thens];
      if (isEmpty(thens)) return {};
      return Bluebird.map(thens, async (then) => {
        let chats = await canonizeChatIds.call(this, then.to);
        const { action } = extensions.delay;
        const isDelayed = await action.call(this, { bot, ctx, then, chats });

        if (isDelayed.delay) Delay = true;
        chats = isDelayed.targetChats;

        return this.getActions({ chats, ctx, bot, then });
      });
    });
    if (Delay) await ctx.reply(this._i18.t('bot.portalPlugin.delay'));
  }

  getRoutes() {
    return [
      {
        path: /portal-toId-\d*/,
        action: async ({ ctx, req, bot }) => {
          const BotsTelegramPortalRulesModel = await this.botsModule.module('models.BotsTelegramPortalRulesModel');
          const data = bot.getMessageCallbackData(ctx);
          const fromId = bot.getUserId(ctx);
          if (!data) return;
          const toId = data.split('-')[2];
          await BotsTelegramPortalRulesModel.deleteOne({ where: fromId }).lean();
          const newRule = new BotsTelegramPortalRulesModel({
            where: fromId,
            then: {
              answer: 1,
              action: 'repost',
              to: toId,
            },
          });
          await newRule.save();
          ctx.answerCbQuery();
        },
      },
    ];
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
