/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IModule } from '@lskjs/module/module2';

export interface IBotProviderMessageCtx {
  [name: string]: any;
}
export interface TelegramIBotProviderMessageCtx extends IBotProviderMessageCtx {
  telegram: string;
}

export type IBotProviderCommand = RegExp | string;
export type IBotProviderPayload = object | string;
export interface IBotProvider extends IModule {
  key: string | null;
  provider: string;
  plugins: IBotPlugin[];
  eventTypes: string[];
  client: any;
  config: {
    log?: any;
    [key: string]: any;
  };
  /**
   * инициализируем плагин для провадера
   */
  initPlugin(bot: IBotPlugin, name: string): void;

  /**
   * стартуем плагин для провадера
   */
  runPlugin(bot: IBotPlugin, name: string): void;

  /**
   * Получить идентификатор текущего бота
   */
  getBotId(): string | null;

  /**
   * Возвращает сырое сообщение из контекста
   * @param {*} message message or message context
   */
  getMessage(ctx: IBotProviderMessageCtx): IBotProviderMessageCtx;

  /**
   * Возвращает id пользователя написавшего сообщение
   * @param {*} message message or message context
   */
  getMessageUserId(message: IBotProviderMessageCtx): number;

  /**
   * Возвращает id чата в котором написано сообщение
   * @param {*} message message or message context
   */
  getMessageChatId(message: IBotProviderMessageCtx): number;

  /**
   * Возвращает id чата или пользователя, которому/куда написано сообщение
   * @param {*} message message or message context
   */
  getMessageTargetId(message: IBotProviderMessageCtx): number;

  /**
   * Возвращает id чата или пользователя, которому/куда написано сообщение
   * @param {*} message message or message context
   */
  getReplyMessageId(message: IBotProviderMessageCtx): number;

  /**
   * Возвращает текст сообщения
   * @param {*} message message or message context
   */
  getMessageText(message: IBotProviderMessageCtx): string;

  /**
   * Возвращает дату сообщения
   * @param {*} message message or message context
   */
  getMessageDate(message: IBotProviderMessageCtx): Date;

  /**
   * Возвращает тип сообщения
   * @param {*} message message or message context
   */
  getMessageType(message: IBotProviderMessageCtx): string;

  /**
   * Содержит ли сообщение подстроку или регулярку
   * @param {*} message
   * @param {*} substr
   */
  isMessageContains(message: IBotProviderMessageCtx, substr: IBotProviderCommand): boolean;

  /**
   * Начинается ли сообщение со строки или регулярки
   * @param {*} message
   * @param {*} substr
   */
  isMessageStartsWith(message: IBotProviderMessageCtx, substr: IBotProviderCommand): boolean;

  /**
   * Является ли сообщение конкретной командой
   * @param {*} message
   * @param {*} command
   */
  isMessageCommand(message: IBotProviderMessageCtx, command: IBotProviderCommand): boolean;

  /**
   * Является ли сообщение одной из командой
   * @param {*} message
   * @param {*} commands массив комманд или одна команда
   */
  isMessageCommands(message: IBotProviderMessageCtx, commands: IBotProviderCommand[] | IBotProviderCommand): boolean;

  isMessageLike(ctx: IBotProviderMessageCtx): boolean;

  /**
   * Ответить на сообщение
   * @param {*} ctx
   * @param {*} payload
   * @param {*} extra
   */
  reply(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
  sendMessage(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
  sendSticker(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
  sendAnimation(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
  sendDocument(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
  sendPhoto(ctx: IBotProviderMessageCtx, payload: IBotProviderPayload, extra?: object): Promise<object>;
}

export interface IBotPlugin extends IModule {
  providers: string[];
  bots: {
    [name: string]: IBotProvider;
  };
  canRunBot(bot: IBotProvider): boolean;
  initBot(bot: IBotProvider, name: string): Promise<void>;
  initBots(): Promise<void>;
  runBot(bot: IBotProvider, name: string): Promise<void>;
  runBots(): Promise<void>;
}

// export type AsyncProvidersType = {
//   [key: string]: () => Promise<{ default: IBotProvider }>;
// };
// export type AsyncPluginsType = {
//   [key: string]: () => Promise<{default: IBotPlugin }>;
// };

export type AsyncProvidersType = {
  [key: string]: () => Promise<any>;
};
export type AsyncPluginsType = {
  [key: string]: () => Promise<any>;
};
