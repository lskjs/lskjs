import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import extensions from './extensions';
import { groupMessages } from './groupMessages';
import { canonizeChatIds, getActiveRules, setCrons } from './utils';

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
    this.crons = setCrons.call(this);
  }

  createExtraKeyboard({ bot, ctx = {}, then }) {
    const buttons = [];

    Object.keys(extensions).forEach((key) => {
      const { getButtons } = extensions[key];
      if (!then[key] || !getButtons) return;
      const extensionButtons = getButtons.call(this, { bot, ctx });
      if (!Array.isArray(extensionButtons)) return;
      buttons.push(extensionButtons);
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
      const extra = this.createExtraKeyboard({ bot, ctx, then });
      return bot.repost(then.to, ctx, extra);
    }
    if (then.action === 'remove') {
      await ctx.deleteMessage();
    }
    return false;
  }

  async addMetaToMessage({ bot, ctx, then }) {
    const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
    const message = bot.getMessage(ctx);
    const meta = {};
    Object.keys(extensions).forEach((key) => {
      meta[key] = !!then[key];
    });
    return BotsTelegramMessageModel.findOneAndUpdate(message, { meta });
  }

  async onEvent({ event, ctx, bot }) {
    const activeRules = await getActiveRules.call(this, { ctx, bot });
    this.log.trace('activeRules:', activeRules);
    if (isEmpty(activeRules)) return;
    await Bluebird.map(activeRules, async (rule) => {
      const { criteria } = rule;
      console.log(criteria);
    });

    // let delay = false;
    // await Bluebird.map(activeRules, async (rule) => {
    //   let { then: thens } = rule;
    //   if (!thens) return null;
    //   if (!Array.isArray(thens)) thens = [thens];
    //   if (isEmpty(thens)) return {};
    //   return Bluebird.map(thens, async (then) => {
    //     this.addMetaToMessage({ bot, ctx, then });
    //     let chats = await canonizeChatIds.call(this, then.to);
    //     const { action } = extensions.delay;
    //     const isDelayed = await action.call(this, { bot, ctx, then, chats });

    //     if (isDelayed.delay) delay = true;
    //     chats = isDelayed.targetChats;

    //     return this.getActions({ chats, ctx, bot, then });
    //   });
    // });
    // if (delay) await ctx.reply(this._i18.t('bot.portalPlugin.delay'));
  }

  getRoutes() {
    const routes = [];
    Object.keys(extensions).forEach((key) => {
      const { getRoutes } = extensions[key];
      if (!getRoutes) return;
      const extensionRoutes = getRoutes.call(this);
      if (!Array.isArray(extensionRoutes)) return;
      routes.push(...extensionRoutes);
    });
    return routes;
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
