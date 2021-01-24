import get from 'lodash/get';
// @ts-ignore
import qrcode from 'qrcode-terminal';
import { Client, ClientOptions } from 'whatsapp-web.js';

import BaseBotProvider from './BaseBotProvider';

/**
 * Docs: ????
 */

export type WhatsappBotConfigType = ClientOptions;
// export type WhatsappBotConfigType: = {
//   session: string;
// };

export default class WhatsappBotProvider extends BaseBotProvider {
  provider = 'whatsapp';
  eventTypes = [
    'qr',
    'authenticated',
    'auth_failure',
    'ready',
    'message',
    'message_create',
    'message_revoke_everyone',
    'message_revoke_me',
    'message_ack',
    'group_join',
    'group_leave',
    'group_update',
    'change_battery',
    'disconnected',
  ];
  config: WhatsappBotConfigType;

  async init(): Promise<void> {
    await super.init();
    this.client = new Client(this.config);
  }

  async run(): Promise<void> {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    this.client.initialize();

    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.on('authenticated', (session) => {
      this.log.trace('session', session);
    });

    this.on('auth_failure', () => {
      // Fired if session restore was unsuccessfull
      throw 'WhatsappBotProvider auth_failure';
    });
  }

  getMessageText(ctx = {}) {
    if (typeof ctx === 'string') return ctx;
    return get(ctx, 'body');
  }

  getMessageType(ctx: any) {
    return ctx.type;
  }

  sendMessage(ctx: any, ...args: any[]): Promise<any> {
    return this.client.sendMessage(ctx.from, ...args);
  }
}
