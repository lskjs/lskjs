import asyncMapValue from '@lskjs/utils/asyncMapValues';
import Plugin from './Plugin';

const getDeathMessage = () => {
  const date = Date.now() + 3600;
  return `Date of death = ${new Date(date).toISOString()}`;
};

export default class DeathLetterPlugin extends Plugin {
  name = 'DeathLetterPlugin';
  providers = ['telegram', 'discord'];
  async sendMessage(message, filter = () => true) {
    await asyncMapValue(this.botModule, (bot, name) => {
      if (!filter(bot, name)) return;
      bot.sendMessage(message);
    });
  }
  async runBot(bot) {
    bot.on('message', async (ctx) => {
      if (!bot.isMessageCommands(ctx, ['смерть', 'death'])) return;
      bot.reply(ctx, getDeathMessage());
    });
  }
}
