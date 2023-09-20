/* eslint-disable camelcase */

import { getMessageType } from '../middlewares/telegramHelpers';

export const getMessageInfo = (ctx: any) => {
  const { botInfo } = ctx;

  const message = ctx?.update?.message;
  const callback_query = ctx?.update?.callback_query;
  const my_chat_member = ctx?.my_chat_member;

  const from = message?.from || callback_query?.from || my_chat_member?.from;
  const chat = message?.chat || callback_query?.chat || my_chat_member?.chat;

  const chatType = chat?.type || chat?.message?.type;

  let action = null;
  if (my_chat_member) {
    action = my_chat_member?.new_chat_member?.status;
  } else if (callback_query) {
    action = 'callback';
  } else {
    action = 'message';
  }
  const text = message?.text || callback_query?.data || '';
  const messageType = getMessageType(message || {});
  return {
    user: from?.username || from?.id,
    chatType,
    chat: chat?.username || chat?.title || chat?.id,
    botInfo,
    botId: botInfo?.id,
    action,
    messageType,
    message,
    text,
  };
};
