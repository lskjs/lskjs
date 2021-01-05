/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IModule } from '@lskjs/module/module2';

export type IAnyKeyValue = {
  [key: string]: any;
}

export type IAnyAsyncKeyValue = {
  [key: string]: () => Promise<any> | any;
};

export type IBotProviderMessageCtx = IAnyKeyValue;
export interface TelegramIBotProviderMessageCtx extends IBotProviderMessageCtx {
  telegram: string;
}

export type IBotProviderCommand = RegExp | string;
export type IBotProviderPayload = object | string;
export interface IBotProvider extends IModule {
  key?: string;
  provider: string;
  botsModule?: IModule;
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
  getMessage(ctx: IBotProviderMessageCtx): IBotProviderMessageCtx | null;

  /**
   * Возвращает id сообщение из контекста
   * @param {*} message message or message context
   */
  getMessageId(ctx: IBotProviderMessageCtx): number | null;

  /**
   * Возвращает id пользователя написавшего сообщение
   * @param {*} message message or message context
   */
  getMessageUserId(message: IBotProviderMessageCtx): number | null;

  /**
   * Возвращает id чата в котором написано сообщение
   * @param {*} message message or message context
   */
  getMessageChatId(message: IBotProviderMessageCtx): number | null;

  /**
   * Возвращает id чата или пользователя, которому/куда написано сообщение
   * @param {*} message message or message context
   */
  getMessageTargetId(message: IBotProviderMessageCtx): number | null;

  /**
   * Возвращает сообщения, которое было реплайнуто
   * @param {*} message message or message context
   */
  getRepliedMessage(message: IBotProviderMessageCtx): IBotProviderMessageCtx | null;

  /**
   * Возвращает id сообщения, которое было реплайнуто
   * @param {*} message message or message context
   */
  getRepliedMessageId(message: IBotProviderMessageCtx): number | null;

  /**
   * Возвращает текст сообщения
   * @param {*} message message or message context
   */
  getMessageText(message: IBotProviderMessageCtx): string | null;

  /**
   * Возвращает дату сообщения
   * @param {*} message message or message context
   */
  getMessageDate(message: IBotProviderMessageCtx): Date | null;

  /**
   * Возвращает тип сообщения
   * @param {*} message message or message context
   */
  getMessageType(message: IBotProviderMessageCtx): string | null;

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
   * Начинается ли сообщение со строки или регулярки
   * @param {*} message
   */
  isMessageStartsWithEmoji(message: IBotProviderMessageCtx): boolean;

  /**
   * Начинается ли сообщение со строки или регулярки
   * @param {*} message
   */
  getMessageStartsEmoji(message: IBotProviderMessageCtx): string | null;

  /**
   * Является ли сообщение конкретной командой
   * @param {*} message
   * @param {*} command
   */
  isMessageCommand(message: IBotProviderMessageCtx, command: IBotProviderCommand): boolean;

  /**
   * Получить команду из сообщения
   * @param {*} message
   */
  getMessageCommand(message: IBotProviderMessageCtx): string | null;

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
  botsModule?: IModule;
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

export type IAsyncProviders = IAnyAsyncKeyValue;

export type IAsyncPlugins = IAnyAsyncKeyValue;