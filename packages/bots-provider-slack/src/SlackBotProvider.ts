import BaseBotProvider from '@lskjs/bots-provider';
import Err from '@lskjs/err';
import { App as SlackApp } from '@slack/bolt';
import axios from 'axios';

/**
 * Docs: https://api.slack.com/bot-users
 */

type SlackBotConfigType = {
  token: string;
  signingSecret: string;
};

export class SlackBotProvider extends BaseBotProvider {
  client: any;
  provider = 'slack';
  SlackApp = SlackApp;
  eventTypes = [
    // events-api
    'message',
    'reaction_added',

    // rtm-api
    'user_typing',
    'member_joined_channel',
    'presence_change',
  ];
  config: SlackBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.token) throw new Err('!config.token');
    if (!this.config.signingSecret) throw new Err('!config.signingSecret');
    this.client = new SlackApp({
      signingSecret: this.config.signingSecret,
      token: this.config.token,
    });
  }
  async run(): Promise<void> {
    if (!this.client) return;
    await super.run();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendMessage(ctx: any, content: any, options: any): Promise<any> {
    return axios.post(ctx, { text: content });
  }
  ignoreMd(text: string, isMd = true): string {
    if (!text) return '';
    if (!isMd) return text;

    return text;
  }
  formatCode(text: string, isMd = true): string {
    if (!text) return '';
    if (!isMd) return text;

    return `\`\`\`${text}\`\`\``;
  }
  formatBold(text: string, isMd = true): string {
    if (!text) return '';
    if (!isMd) return text;

    return `*${text}*`;
  }
  formatItalics(text: string, isMd = true): string {
    if (!text) return '';
    if (!isMd) return text;

    return `_${text}_`;
  }
  formatLink(text: string, link: string, isMd = true): string {
    if (!text || !link) return '';
    if (!isMd) return link || text || '';

    return `<${link}|${text}>`;
  }
}

export default SlackBotProvider;
