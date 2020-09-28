import Slack from '@slack/bolt';
// https://api.slack.com/bot-users

export default class SlackBotProvider {
  name = 'SlackBotProvider';
  Slack = Slack;
  async init() {
    await super.init();
    if (!this.config.token) throw '!config.token';
    if (!this.config.signingSecret) throw '!config.signingSecret';
    this.client = new Slack.App({
      signingSecret: this.config.signingSecret
      token: this.config.token
    });
  }
  async run() {
    await super.run();
    if (!this.client) return;
  }
}
