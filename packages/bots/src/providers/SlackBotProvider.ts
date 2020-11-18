import { App as SlackApp } from '@slack/bolt';
import BotProvider from './BotProvider';

/**
 * Docs: https://api.slack.com/bot-users
 */


type SlackBotConfigType = {
  token: string;
  signingSecret: string;
};

export default class SlackBotProvider extends BotProvider {
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
    if (!this.config.token) throw 'SlackBotProvider !config.token';
    if (!this.config.signingSecret) throw 'SlackBotProvider !config.signingSecret';
    this.client = new SlackApp({
      signingSecret: this.config.signingSecret,
      token: this.config.token,
    });
  }
  async run(): Promise<void> {
    if (!this.client) return;
    await super.run();
  }
}
