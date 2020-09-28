import Twitter from 'twitter-lite';
import BotProvider from './BotProvider';
// https://github.com/draftbit/twitter-lite

export default class TwitterBotProvider extends BotProvider {
  name = 'TwitterBotProvider';
  Twitter = Twitter;
  async init() {
    await super.init();
    if (!this.config.consumerKey) throw 'TwitterBotProvider !config.consumerKey';
    if (!this.config.consumerSecret) throw 'TwitterBotProvider !config.consumerSecret';
    if (!this.config.accessTokenKey) throw 'TwitterBotProvider !config.accessTokenKey';
    if (!this.config.accessTokenSecret) throw 'TwitterBotProvider !config.accessTokenSecret';
    this.client = new Twitter({
      consumer_key: this.consumerKey,
      consumer_secret: this.consumerSecret,
      access_token_key: this.accessTokenKey,
      access_token_secret: this.accessTokenSecret,
    })
  }
  async run() {
    await super.run();
    if (!this.client) return;
  }
}
