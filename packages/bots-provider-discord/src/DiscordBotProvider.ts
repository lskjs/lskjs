import BaseBotProvider from '@lskjs/bots-provider';
import Err from '@lskjs/err';
import Discord from 'discord.js';

/**
 * Docs: https://discord.js.org/#/docs/main/stable/general/welcome
 */

type DiscordBotConfigType = {
  token: string;
};

export class DiscordBotProvider extends BaseBotProvider {
  provider = 'discord';
  Discord = Discord;
  eventTypes = ['message', 'guildMemberAdd']; // 'ready'
  config: DiscordBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.token) throw new Err('!config.token');
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

export default DiscordBotProvider;
