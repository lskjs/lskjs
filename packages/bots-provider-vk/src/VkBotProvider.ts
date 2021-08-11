import BaseBotProvider from '@lskjs/bots-provider';
import get from 'lodash/get';
// @ts-ignore
import VkBot from 'node-vk-bot-api';

/**
 * Docs: ????
 */

type VkBotConfigType = {
  token: string;
};

export default class VkBotProvider extends BaseBotProvider {
  provider = 'vk';
  config: VkBotConfigType;
  async init() {
    await super.init();
    if (!this.config.token) throw 'VkBotProvider !config.token';
    this.client = new VkBot(this.config.token);
    // this.client.use(async (ctx, next) => {
    //   try {
    //     await next();
    //   } catch (err) {
    //     this.log.error(err);
    //   }
    // });
  }
  async run() {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    await new Promise((resolve, reject) => {
      this.client.startPolling((err: any) => {
        this.log.error(err);
        if (err) return reject();
        return resolve(this.client);
      });
    });
  }

  async initEventEmitter() {
    this.client.on((...args: any[]) => {
      this.emit('message', ...args);
    });
  }

  isMessageCommand(ctx: any, command: string) {
    return this.isMessageStartsWith(ctx, `/${command}`);
  }

  getMessageText(ctx = {}) {
    if (typeof ctx === 'string') return ctx;
    return get(ctx, 'message.text');
  }

  getMessageType(ctx: any) {
    const type = get(ctx, 'message.type');
    if (type === 'message_new') return 'text';
    return null;
  }

  sendMessage(ctx: any, ...args: any[]) {
    return this.client.sendMessage(get(ctx, 'message.from_id'), ...args);
  }
}
