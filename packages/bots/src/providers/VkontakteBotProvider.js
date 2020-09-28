import VkBot from 'node-vk-bot-api';
// https://www.npmjs.com/package/node-vk-bot-api

export default class VkontakteBotProvider {
  name = 'VkontakteBotProvider';
  VkBot = VkBot;
  async init() {
    await super.init();
    if (!this.config.token) throw '!config.token';
    this.client = new VkBot(this.config.token);
  }
  async run() {
    await super.run();
    if (!this.client) return;
  }
}
