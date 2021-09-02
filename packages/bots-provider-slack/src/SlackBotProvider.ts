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

  async sendMessage(to: string, text: string, ...props): Promise<any> {
    try {
      const res = await axios.post(to, {
        text,
      });
      return res;
    } catch (error) {
      this.log.error(error);
      return null;
    }
  }
}

export default SlackBotProvider;
