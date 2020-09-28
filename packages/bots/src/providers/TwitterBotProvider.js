import Twitter from 'twitter-lite';
// https://github.com/draftbit/twitter-lite

export default class TwitterBotProvider {
  name = 'TwitterBotProvider';
  Twitter = Twitter;
  async init() {
    await super.init();
    if (!this.config.consumerKey) throw '!config.consumerKey';
    if (!this.config.consumerSecret) throw '!config.consumerSecret';
    if (!this.config.accessTokenKey) throw '!config.accessTokenKey';
    if (!this.config.accessTokenSecret) throw '!config.accessTokenSecret';
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
