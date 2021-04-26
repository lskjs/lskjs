// import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import actions from './actions';
import extensions from './extensions';
// import { runAction } from './utils';
import { getActiveRules, groupMessages, runCron } from './utils';

export default class PortalPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  getActiveRules = getActiveRules;
  runCron = runCron;
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
  getModules() {
    return {
      action: [
        import('./ActionModule'),
        {
          actions,
        },
      ],
    };
  }
  async init() {
    await super.init();
    this.rules = this.config.rules;
  }
  // TODO: Удалить только ПОСЛЕ переписывания extensions
  // createExtraKeyboard({ bot, ctx = {}, then }) {
  //   const buttons = [];

  //   Object.keys(extensions).forEach((key) => {
  //     const { getButtons } = extensions[key];
  //     if (!then[key] || !getButtons) return;
  //     const extensionButtons = getButtons.call(this, { bot, ctx });
  //     if (!Array.isArray(extensionButtons)) return;
  //     buttons.push(extensionButtons);
  //   });

  //   return createKeyboard({
  //     type: 'inline',
  //     buttons,
  //   });
  // }

  // async addMetaToMessage({ bot, ctx, then }) {
  //   const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
  //   const message = bot.getMessage(ctx);
  //   const meta = {};
  //   Object.keys(extensions).forEach((key) => {
  //     meta[key] = !!then[key];
  //   });
  //   return BotsTelegramMessageModel.findOneAndUpdate(message, { meta });
  // }

  // async runAction(props) {
  //   return runAction.call(this, props);
  // }

  async onEvent({ event, ctx, bot }) {
    const activeRules = await this.getActiveRules({ ctx, bot });
    if (isEmpty(activeRules)) return null;
    return Bluebird.map(activeRules, async (rule) => {
      const { action } = rule;
      if (!action) return null;
      this.log.debug('rule:', rule);
      const actionModule = await this.module('action');
      return actionModule.runAction(action, { event, ctx, bot, ...rule });
      // return runAction.call(this, { event, ctx, bot, ...rule });
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
    this.crons = this.runCron({ bot });
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
