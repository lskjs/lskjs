import Discord from 'discord.js';
import BaseBotProvider from './BaseBotProvider';

/**
 * Docs: https://discord.js.org/#/docs/main/stable/general/welcome
 */

type DiscordBotConfigType = {
  token: string;
};

export default class DiscordBotProvider extends BaseBotProvider {
  provider = 'discord';
  Discord = Discord;
  eventTypes = ['message', 'guildMemberAdd']; // 'ready'
  config: DiscordBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.token) throw 'DiscordBotProvider !config.token';
    this.client = new Discord.Client();
  }
  async run(): Promise<void> {
    if (!this.client) return;
    await super.run();
    await this.client.login(this.config.token);
  }

  getMessageText(message: any): string {
    return message.content;
  }

  isMessageCommand(message: any, command: string | RegExp): boolean {
    return this.isMessageContains(message, `/${command}`) || this.isMessageContains(message, `!${command}`);
  }
}
