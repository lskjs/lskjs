import Twitter from 'twitter-lite';

import BaseBotProvider from './BaseBotProvider';

/**
 * Docs: https://github.com/draftbit/twitter-lite
 */

type TwitterBotConfigType = {
  consumerKey: string | null;
  consumerSecret: string | null;
  accessTokenKey: string | null;
  accessTokenSecret: string | null;
};

export default class TwitterBotProvider extends BaseBotProvider {
  provider = 'twitter';
  Twitter = Twitter;
  config: TwitterBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.consumerKey) throw 'TwitterBotProvider !config.consumerKey';
    if (!this.config.consumerSecret) throw 'TwitterBotProvider !config.consumerSecret';
    if (!this.config.accessTokenKey) throw 'TwitterBotProvider !config.accessTokenKey';
    if (!this.config.accessTokenSecret) throw 'TwitterBotProvider !config.accessTokenSecret';
    this.client = new Twitter({
      consumer_key: this.config.consumerKey,
      consumer_secret: this.config.consumerSecret,
      access_token_key: this.config.accessTokenKey,
      access_token_secret: this.config.accessTokenSecret,
    });
  }
  async run(): Promise<void> {
    if (!this.client) return;
    await super.run();
  }
}
