import { IgApiClient } from '@buzzguru/instagram-private-api';
import Bluebird from 'bluebird';

import BaseBotProvider from './BaseBotProvider';

/**
 * Docs: https://github.com/dilame/instagram-private-api
 */
type InstagramBotConfigType = {
  username: string;
  password: string;
};

export default class InstagramBotProvider extends BaseBotProvider {
  provider = 'instagram';
  IgApiClient = IgApiClient;
  eventTypes = [];
  config: InstagramBotConfigType;
  async init() {
    await super.init();
    if (!this.config.username) throw 'InstagramBotProvider !config.username';
    if (!this.config.password) throw 'InstagramBotProvider !config.password';
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
