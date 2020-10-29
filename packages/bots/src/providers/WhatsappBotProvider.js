import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import get from 'lodash/get';
import BotProvider from './BotProvider';

export default class WhatsappBotProvider extends BotProvider {
  name = 'WhatsappBotProvider';
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

  async init() {
    await super.init();
    this.client = new Client({ session: this.config.session });
  }

  async run() {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    this.client.initialize();

    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.on('authenticated', (session) => {
      console.log('session', session);
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

  getMessageType(ctx) {
    return ctx.type;
  }

  sendMessage(ctx, ...args) {
    return this.client.sendMessage(ctx.from, ...args);
  }
}
