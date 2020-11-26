/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import some from 'lodash/some';
import Module from '@lskjs/module/2';
import assignProps from '@lskjs/utils/assignProps';
import { IBotPlugin, IBotProvider, IBotProviderMessageCtx, IBotProviderCommand } from '../types';

export abstract class BaseBotProvider extends Module implements IBotProvider {
  // abstract
  key: string | null = null;
  provider: string;
  plugins: Array<IBotPlugin> = [];
  eventTypes: Array<string>;
  client: any;
  config;

  constructor(...props: any[]) {
    super(...props)
    assignProps(this, ...props);
  }

  async init(): Promise<void> {
    await super.init();
    if (!this.provider) this.log.warn('!provider');
    if (!this.config) {
      this.log.warn('!config');
      this.config = {};
    }
  }

  async initPlugin(): Promise<void> {
     // eslint-disable-line
  }

  async runPlugin(plugin: IBotPlugin): Promise<void> {
    // if (!this.plugins) this.plugins = []
    this.plugins.push(plugin);
  }

  getBotId(): string | null {
    return this.key;
  }

  async initEventEmitter(): Promise<void> {
    if (this.eventTypes && Array.isArray(this.eventTypes)) {
      this.eventTypes.forEach((type) => {
        this.client.on(type, (...args: any[]) => this.emit(type, ...args));
      });
    }
  }

  getMessage(ctx: IBotProviderMessageCtx): IBotProviderMessageCtx {
    throw new Error(`Method ${this.name}.getMessage not implemented.`);
  }
  getMessageUserId(message: IBotProviderMessageCtx): number {
    throw new Error(`Method ${this.name}.getMessageUserId not implemented.`);
  }
  getMessageChatId(message: IBotProviderMessageCtx): number {
    throw new Error(`Method ${this.name}.getMessageChatId not implemented.`);
  }
  getMessageTargetId(message: IBotProviderMessageCtx): number {
    throw new Error(`Method ${this.name}.getMessageTargetId not implemented.`);
  }
  getReplyMessageId(message: IBotProviderMessageCtx): number {
    throw new Error(`Method ${this.name}.getReplyMessageId not implemented.`);
  }

  isMessageLike(ctx: IBotProviderMessageCtx): boolean {
    throw new Error(`Method ${this.name}.isMessageLike not implemented.`);
  }
  isMessageCommand(message: IBotProviderMessageCtx, command: string): boolean {
    throw new Error(`Method ${this.name}.isMessageCommand not implemented.`);
  }

  getMessageDate(message: IBotProviderMessageCtx): Date {
    throw new Error(`Method ${this.name}.getMessageDate not implemented.`);
  }
  getMessageType(message: IBotProviderMessageCtx): string {
    throw new Error(`Method ${this.name}.getMessageType not implemented.`);
  }
  getMessageText(message: IBotProviderMessageCtx): string {
    throw new Error(`Method ${this.name}.getMessageText not implemented.`);
  }
  sendMessage(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<object> {
    throw new Error(`Method ${this.name}.sendMessage not implemented.`);
  }
  sendSticker(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<object> {
    throw new Error(`Method ${this.name}.sendSticker not implemented.`);
  }
  sendAnimation(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<object> {
    throw new Error(`Method ${this.name}.sendAnimation not implemented.`);
  }
  sendDocument(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<object> {
    throw new Error(`Method ${this.name}.sendDocument not implemented.`);
  }
  sendPhoto(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<object> {
    throw new Error(`Method ${this.name}.sendPhoto not implemented.`);
  }
  reply(ctx: IBotProviderMessageCtx, payload: object, extra: object): Promise<object> {
    throw new Error(`Method ${this.name}.reply not implemented.`);
  }

  isMessageContains(message: IBotProviderMessageCtx, regExp: RegExp | string): boolean {
    let text = this.getMessageText(message);
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.indexOf(regExp) !== -1;
  }

  isMessageStartsWith(message: IBotProviderMessageCtx, regExp: RegExp | string): boolean {
    let text = this.getMessageText(message);
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.startsWith(regExp);
  }

  isMessageCommands(message: IBotProviderMessageCtx, commands: IBotProviderCommand[] | IBotProviderCommand): boolean {
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(commands)) commands = [commands];
    return some(commands, (command: string) => this.isMessageCommand(message, command));
  }
}

export default BaseBotProvider;
