import some from 'lodash/some';
import Module from '../module2';

export interface BotPlugin {}

export interface IBotProvider {
  key: string | null;
  provider: string;
  plugins: Array<BotPlugin>;
  eventTypes: Array<string>;
  client: any;
  config: {};
}

export interface BotProviderMessageCtx {}

abstract class BotProvider extends Module implements IBotProvider{
  key: string | null = null;
  provider: string;
  plugins: Array<BotPlugin> = [];
  eventTypes: Array<string> = [];
  client: any;
  config: {};

  async init(): Promise<void> {
    await super.init();
    if (!this.provider) this.log.warn('!provider');
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

  /**
   * Возвращает дату сообщения
   * @param message
   */
  abstract getMessageDate(message: BotProviderMessageCtx): Date;

  /**
   * Возвращает тип сообщения
   * @param {*} message
   */
  abstract getMessageType(message: BotProviderMessageCtx): string;

  /**
   * Возвращает текст сообщения
   * @param {*} ctx
   */
  abstract getMessageText(message: BotProviderMessageCtx): string;

  /**
   * Содержит ли сообщение подстроку или регулярку
   * @param {*} message
   * @param {*} regExp
   */
  isMessageContains(message: BotProviderMessageCtx, regExp: RegExp | string): boolean {
    let text = this.getMessageText(message);
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.indexOf(regExp) !== -1;
  }

  /**
   * Начинается ли сообщение со строки или регулярки
   * @param {*} message
   * @param {*} regExp
   */
  isMessageStartsWith(message: BotProviderMessageCtx, regExp: RegExp | string): boolean {
    let text = this.getMessageText(message);
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.startsWith(regExp);
  }

  /**
   * Является ли сообщение конкретной командой
   * @param {*} message
   * @param {*} command
   */
  abstract isMessageCommand(message: BotProviderMessageCtx, command: string): boolean;

  /**
   * reply
   * @param {*} who
   * @param {*} message
   */
  abstract reply(who: any, message: BotProviderMessageCtx): void;

  /**
   * Является ли сообщение одной из командой
   * @param {*} message
   * @param {*} commands
   */
  isMessageCommands(message: BotProviderMessageCtx, commands: string | Array<string>): boolean {
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(commands)) commands = [commands];
    return some(commands, (command: string) => this.isMessageCommand(message, command));
  }

  initPlugin(): void {
    // plugin: BotPlugin
    //  nothing yet
  }

  runPlugin(plugin: BotPlugin): void {
    this.plugins.push(plugin);
  }
}

export default BotProvider;
