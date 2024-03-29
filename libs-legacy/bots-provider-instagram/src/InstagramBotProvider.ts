import { IgApiClient } from '@buzzguru/instagram-private-api';
import BaseBotProvider from '@lskjs/bots-provider';
import Err from '@lskjs/err';
import Bluebird from 'bluebird';

/**
 * Docs: https://github.com/dilame/instagram-private-api
 */
type InstagramBotConfigType = {
  username: string;
  password: string;
};

export class InstagramBotProvider extends BaseBotProvider {
  client: any;
  provider = 'instagram';
  IgApiClient = IgApiClient;
  eventTypes = [];
  config: InstagramBotConfigType;
  async init() {
    await super.init();
    if (!this.config.username) throw new Err('!config.username');
    if (!this.config.password) throw new Err('!config.password');
    this.client = new this.IgApiClient();
  }
  async run() {
    if (!this.client) return;
    await super.run();
    const { username, password } = this.config;
    await this.client.state.generateDevice(username);
    await this.client.account.login(username, password);
    await this.client.simulate.preLoginFlow();
    await Bluebird.delay(1);
    await this.client.simulate.postLoginFlow();
  }
}

export default InstagramBotProvider;
