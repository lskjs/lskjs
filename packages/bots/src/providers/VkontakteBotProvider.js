import VkBot from 'node-vk-bot-api';
import BotProvider from './BotProvider';

/**
 * Docs: https://www.npmjs.com/package/node-vk-bot-api
 */

export default class VkontakteBotProvider extends BotProvider {
  name = 'VkontakteBotProvider';
  provider = 'vkontakte';
  VkBot = VkBot;
  async init() {
    await super.init();
    if (!this.config.token) throw 'VkontakteBotProvider !config.token';
    this.client = new VkBot(this.config.token);
  }
  async run() {
    if (!this.client) return;
    await super.run();
  }
}
