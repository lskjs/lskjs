/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBotPlugin, IBotProvider, IBotProviderCommand, IBotProviderMessageCtx } from '@lskjs/bots-base/types';
import Module from '@lskjs/module';
import some from 'lodash/some';

import emojiRegexp from './utils/emojiRegexp';

export abstract class BaseBotProvider extends Module implements IBotProvider {
  // abstract
  key?: string;
  provider: string;
  botsModule: any;
  plugins: Array<IBotPlugin> = [];
  eventTypes: Array<string>;
  client: any;
  config: Record<string, any>;

  async init(): Promise<void> {
    await super.init();
    if (!this.provider) this.log.warn('!provider');
  }

  async initPlugin(): Promise<void> {
     // eslint-disable-line
  }

  async runPlugin(plugin: IBotPlugin): Promise<void> {
    // if (!this.plugins) this.plugins = []
    this.plugins.push(plugin);
  }

  getBotId(): string | null {
    return this.key || null;
  }

  async initEventEmitter(): Promise<void> {
    if (this.eventTypes && Array.isArray(this.eventTypes)) {
      this.eventTypes.forEach((type) => {
        this.client.on(type, (...args: any[]) => this.emit(type, ...args));
      });
    }
  }

  getMessage(ctx: IBotProviderMessageCtx): IBotProviderMessageCtx | null {
    throw new Error(`Method ${this.name}.getMessage not implemented.`);
  }
  getMessageId(ctx: IBotProviderMessageCtx): number | null {
    throw new Error(`Method ${this.name}.getMessageId, not implemented.`);
  }
  getMessageUserId(message: IBotProviderMessageCtx): number | null {
    throw new Error(`Method ${this.name}.getMessageUserId not implemented.`);
  }
  getMessageChatId(message: IBotProviderMessageCtx): number | null {
    throw new Error(`Method ${this.name}.getMessageChatId not implemented.`);
  }
  getMessageTargetId(message: IBotProviderMessageCtx): number | null {
    throw new Error(`Method ${this.name}.getMessageTargetId not implemented.`);
  }
  getRepliedMessage(ctx: IBotProviderMessageCtx): IBotProviderMessageCtx {
    throw new Error(`Method ${this.name}.getRepliedMessage not implemented.`);
  }
  getRepliedMessageId(message: IBotProviderMessageCtx): number | null {
    throw new Error(`Method ${this.name}.getRepliedMessageId not implemented.`);
  }

  // Telegram
  // getCallback(ctx: TelegramIBotProviderMessageCtx): any | null {
  //   throw new Error(`Method ${this.name}.getCallback not implemented.`);
  // }
  // getCallbackMessage(ctx: TelegramIBotProviderMessageCtx): IBotProviderMessageCtx | null {
  //   throw new Error(`Method ${this.name}.getCallbackMessage not implemented.`);
  // }
  // getCallbackMessageId(ctx: getCallbackMessageId): number | null {
  //   throw new Error(`Method ${this.name}.getCallbackMessage not implemented.`);
  // }
  // getMessageCallbackData(ctx: TelegramIBotProviderMessageCtx): any | null {
  //   throw new Error(`Method ${this.name}.getMessageCallbackData not implemented.`);
  // }
  // isMessageCallback(ctx: TelegramIBotProviderMessageCtx): boolean {
  //   throw new Error(`Method ${this.name}.isMessageCallback not implemented.`);
  // }
  isMessageLike(ctx: IBotProviderMessageCtx): boolean {
    throw new Error(`Method ${this.name}.isMessageLike not implemented.`);
  }
  isMessageCommand(message: IBotProviderMessageCtx, command: string): boolean {
    throw new Error(`Method ${this.name}.isMessageCommand not implemented.`);
  }
  getMessageCommand(ctx: IBotProviderMessageCtx): string | null {
    throw new Error(`Method ${this.name}.getMessageCommand not implemented.`);
  }

  getMessageDate(message: IBotProviderMessageCtx): Date | null {
    throw new Error(`Method ${this.name}.getMessageDate not implemented.`);
  }
  getMessageType(message: IBotProviderMessageCtx): string | null {
    throw new Error(`Method ${this.name}.getMessageType not implemented.`);
  }
  getMessageText(message: IBotProviderMessageCtx): string | null {
    throw new Error(`Method ${this.name}.getMessageText not implemented.`);
  }

  sendMessage(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<Record<string, unknown>> {
    throw new Error(`Method ${this.name}.sendMessage not implemented.`);
  }
  sendSticker(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<Record<string, unknown>> {
    throw new Error(`Method ${this.name}.sendSticker not implemented.`);
  }
  sendAnimation(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<Record<string, unknown>> {
    throw new Error(`Method ${this.name}.sendAnimation not implemented.`);
  }
  sendDocument(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<Record<string, unknown>> {
    throw new Error(`Method ${this.name}.sendDocument not implemented.`);
  }
  sendPhoto(ctx: IBotProviderMessageCtx, ...args: any[]): Promise<Record<string, unknown>> {
    throw new Error(`Method ${this.name}.sendPhoto not implemented.`);
  }
  reply(
    ctx: IBotProviderMessageCtx,
    payload: Record<string, unknown>,
    extra: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
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

  isMessageStartsWithEmoji(message: IBotProviderMessageCtx): boolean {
    return this.isMessageStartsWith(message, new RegExp(`^${emojiRegexp}`));
  }
  getMessageStartsEmoji(message: IBotProviderMessageCtx): string | null {
    const messageText = this.getMessageText(message);
    if (!messageText) return null;
    const array = messageText.match(new RegExp(`^${emojiRegexp}+`));
    if (!array) return null;
    return array[0] || null;
  }
  getMessageStartsEmojiArray(message: IBotProviderMessageCtx): string[] {
    const emojies = this.getMessageStartsEmoji(message);
    if (!emojies) return [];
    const array = emojies.match(new RegExp(`${emojiRegexp}`, 'g'));
    return array || [];
  }

  isMessageCommands(message: IBotProviderMessageCtx, commands: IBotProviderCommand[] | IBotProviderCommand): boolean {
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(commands)) commands = [commands];
    return some(commands, (command: string) => this.isMessageCommand(message, command));
  }
  ignoreMd(text: string): string {
    return text;
  }
  formatCode(text: string): string {
    return text;
  }
  formatLink(text: string, link: string): string {
    return `${text} <${link}>`;
  }
}

export default BaseBotProvider;
