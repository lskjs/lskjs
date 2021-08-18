import BaseBotProvider from '@lskjs/bots-provider';
import Err from '@lskjs/err';
import Twitter from 'twitter-lite';

/**
 * Docs: https://github.com/draftbit/twitter-lite
 */

type TwitterBotConfigType = {
  consumerKey: string | null;
  consumerSecret: string | null;
  accessTokenKey: string | null;
  accessTokenSecret: string | null;
};

export class TwitterBotProvider extends BaseBotProvider {
  client: any;
  provider = 'twitter';
  Twitter = Twitter;
  config: TwitterBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.consumerKey) throw new Err('!config.consumerKey');
    if (!this.config.consumerSecret) throw new Err('!config.consumerSecret');
    if (!this.config.accessTokenKey) throw new Err('!config.accessTokenKey');
    if (!this.config.accessTokenSecret) throw new Err('!config.accessTokenSecret');
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

export default TwitterBotProvider;
