import { App as SlackApp } from '@slack/bolt';
import BotProvider from './BotProvider';
// https://api.slack.com/bot-users
console.log({ SlackApp });

export default class SlackBotProvider extends BotProvider {
  name = 'SlackBotProvider';
  SlackApp = SlackApp;
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
    await super.run();
    if (!this.client) return;
  }
}
