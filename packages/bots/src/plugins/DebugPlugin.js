import sample from 'lodash/sample';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Plugin from './Plugin';

// 1. console.log
// 2. event.emit
// 3. db

const schema = new MongooseSchema({
  botId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  customerId: {
    type: Object,
  },
});

const schema = new MongooseSchema({
  botId: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventData: {
    type: Object,
  },
});

export default class DebugPlugin extends Plugin {
  name = 'DebugPlugin';
  providers = ['telegram', 'discord'];


  sendMessage() {}

  // ==============================

  test(message) {
    // this.reply
    return this.testMessageRegExp(message, /^\/chatid/i);
  }

  async doAction(message) {
    this.sendMessage(message, `user: ${message.from && message.from.id}\nchaitid: ${message.chat && message.chat.id}`);
  }

  init() {
    // this.botsModule.bots[]
  }
  run() {
    const { telegram, telegram2 } = this.botsModule.bots;
    const { adminPlugin } = this.botsModule.plugins;
    // telegram.sendMessage('dkfjklsdjf');

    await asyncMapValues(this.bots, (bot, name) => this.runBot(bot, name));
  }

  async runBot(bot, name) {
    if (Array.isArray(this.providers) && !this.providers.includes(bot.provider)) return;

    const types = ['message', 'guildMemberAdd'];
    types.forEach((type) => {
      bot.on(type, (ctx) => {
        console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
      });
    });
  
  }


  async runBot(bot, name) {
    if (Array.isArray(this.providers) && !this.providers.includes(bot.provider)) return;

    if (bot.provider === 'discord') {
      const types = ['message', 'guildMemberAdd'];
      types.forEach((type) => {
        bot.on(type, (ctx) => {
          console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
        });
      });
    }

    if (bot.provider === 'slack') {
      const types = [
        // events-api
        'message',
        'reaction_added',

        // rtm-api
        'user_typing',
        'member_joined_channel',
        'presence_change',
      ];

      types.forEach((type) => {
        bot.getSlackEvents().on(type, (ctx) => {
          console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
        });
      });
    }
    if (bot.provider === 'telegram') {
      const types = [
        'message',
        'edited_message',
        'callback_query',
        'inline_query',
        'shipping_query',
        'pre_checkout_query',
        'chosen_inline_result',
        'channel_post',
        'edited_channel_post',
      ];
      types.forEach((type) => {
        bot.on(type, (ctx) => {
          new MessageModel({
            botId: bot.getBotId(),
            eventType: type,
            eventData: ctx.message,
          });

          console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
        });
      });
    }
  }
}
