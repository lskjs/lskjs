import asyncMapValue from '@lskjs/utils/asyncMapValues';
import Plugin from './Plugin';

const getDeathMessage = () => {
  const date = Date.now() + 3600;
  return `Date of death = ${new Date(date).toISOString()}`;
};

export default class PortalPlugin extends Plugin {
  name = 'PortalPlugin';
  providers = ['telegram', 'discord'];

  portals = {
    discord: '753317092178002070',
    telegram: -1001235569763,
  };
  async sendMessage(message, filter = () => true) {
    await asyncMapValue(this.botModule, (bot, name) => {
      if (!filter(bot, name)) return;
      if (!this.portals[name]) return;
      bot.sendMessage(this.portals[name], message);
    });
  }

  async runBot(bot) {
    if (bot.provider === 'telegram') {
      bot.on('message', async ({ message }) => {
        if (message.chat.id === this.portals.telegram) return;
        this.sendMessage(getDeathMessage(message));
      });
    }
    if (bot.provider === 'discord') {
      bot.on('message', async (message) => {
        if (message.chat.id === this.portals.discord) return;
        if (message.author.id === bot.config.id) return;
        this.sendMessage(getDeathMessage(message));
      });
    }
  }
}
