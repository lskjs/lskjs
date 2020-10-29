import VkBot from 'node-vk-bot-api';
import get from 'lodash/get';
import BotProvider from './BotProvider';

export default class VkBotProvider extends BotProvider {
  name = 'VkBotProvider';
  provider = 'vk';

  async init() {
    await super.init();
    if (!this.config.token) throw 'VkBotProvider !config.token';
    this.client = new VkBot(this.config.token);
    this.client.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        console.error(e);
      }
    });
  }
  async run() {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    this.client.startPolling((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async initEventEmitter() {
    this.client.on((...args) => {
      this.emit('message', ...args);
    });
  }

  isMessageCommand(ctx, command) {
    return this.isMessageStartsWith(ctx, `/${command}`);
  }

  getMessageText(ctx = {}) {
    if (typeof ctx === 'string') return ctx;
    return get(ctx, 'message.text');
  }

  getMessageType(ctx) {
    const type = get(ctx, 'message.type');
    if (type === 'message_new') return 'text';
    return null;
  }

  sendMessage(ctx, ...args) {
    return this.client.sendMessage(get(ctx, 'message.from_id'), ...args);
  }
}
