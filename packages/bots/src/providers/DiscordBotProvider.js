import Discord from 'discord.js';
import BotProvider from './BotProvider';

/**
 * Docs: https://discord.js.org/#/docs/main/stable/general/welcome
 */

export default class DiscordBotProvider extends BotProvider {
  name = 'DiscordBotProvider';
  provider = 'discord';
  Discord = Discord;
  eventTypes = ['message', 'guildMemberAdd']; // 'ready'
  async init() {
    await super.init();
    if (!this.config.token) throw 'DiscordBotProvider !config.token';
    this.client = new Discord.Client();
  }
  async run() {
    if (!this.client) return;
    await super.run();
    await this.client.login(this.config.token);
    // this.bot.on('ready', async () => {
    //   console.log(`Logged in as ${this.bot.user.tag}!`);
    // });
  }

  getMessageText(message) {
    return message.content;
  }

  isMessageCommand(message, command) {
    return this.isMessageContains(message, `/${command}`) || this.isMessageContains(message, `!${command}`);
  }
}
