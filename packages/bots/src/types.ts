/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IModule } from '@lskjs/module/module2/Module2';

export interface BotProviderMessageCtx {
  [name: string]: any;
}
export interface TelegramBotProviderMessageCtx extends BotProviderMessageCtx {
  telegram: string;
}

export interface IBotProvider extends IModule {
  key: string | null;
  provider: string;
  plugins: IBotPlugin[];
  eventTypes: string[];
  client: any;

  initPlugin(bot: IBotPlugin, name: string): void;
  runPlugin(bot: IBotPlugin, name: string): void;
  init(): Promise<void>;
  run(): Promise<void>;

  getMessage(ctx: BotProviderMessageCtx): BotProviderMessageCtx;
  getMessageUserId(ctx: BotProviderMessageCtx): number;
  getMessageChatId(ctx: BotProviderMessageCtx): number;
  getMessageTargetId(ctx: BotProviderMessageCtx): number;
  getReplyMessageId(ctx: BotProviderMessageCtx): number;
  getMessageText(ctx: BotProviderMessageCtx): string;
  getMessageDate(ctx: BotProviderMessageCtx): Date;
  getMessageType(ctx: BotProviderMessageCtx): string;

  isMessageCommand(ctx: BotProviderMessageCtx, command: RegExp | string): boolean;
  isMessageLike(ctx: BotProviderMessageCtx): boolean;

  reply(ctx: BotProviderMessageCtx, payload: object, extra: object): Promise<object>;
  sendMessage(ctx: BotProviderMessageCtx, ...args): Promise<object>;
  sendSticker(ctx: BotProviderMessageCtx, ...args): Promise<object>;
  sendAnimation(ctx: BotProviderMessageCtx, ...args): Promise<object>;
  sendDocument(ctx: BotProviderMessageCtx, ...args): Promise<object>;
  sendPhoto(ctx: BotProviderMessageCtx, ...args): Promise<object>;
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

export type AsyncProvidersType = {
  [key: string]: () => Promise<IBotProvider>;
};
export type AsyncPluginsType = {
  [key: string]: () => Promise<IBotPlugin>;
};
