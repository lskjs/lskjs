// import { Message as TelegrafMessage } from 'telegraf/types';

export type Message = any; // TelegrafMessage.CommonMessage;
export type Ctx = any;

export type DbService = {
  hasUser: (filter: { botId: string; userId: string }) => Promise<boolean>;
  upsertUser: (filter: { botId: string; userId: string }, $set: any) => Promise<any>;
  hasChat: (filter: { botId: string; chatId: string }) => Promise<boolean>;
  upsertChat: (filter: { botId: string; chatId: string }, $set: any) => Promise<any>;
  upsertMessage: (
    filter: { botId: string; chatId: string; messageId: string },
    $set: any,
  ) => Promise<any>;
  upsertDialog: (filter: { botId: string; chatId: string }, $set: any) => Promise<any>;
  eventEmitter: any;
};
