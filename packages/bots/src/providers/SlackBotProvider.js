import { App as SlackApp } from '@slack/bolt';
import BotProvider from './BotProvider';

/**
 * Docs: https://api.slack.com/bot-users
 */

export default class SlackBotProvider extends BotProvider {
  name = 'SlackBotProvider';
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
  async init() {
    await super.init();
    if (!this.config.token) throw 'SlackBotProvider !config.token';
    if (!this.config.signingSecret) throw 'SlackBotProvider !config.signingSecret';
    this.client = new SlackApp({
      signingSecret: this.config.signingSecret,
      token: this.config.token,
    });
  }
  async run() {
    if (!this.client) return;
    await super.run();
  }
}
