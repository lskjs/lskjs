/* eslint-disable camelcase */

import { Ctx, Message } from '../types';
import { getLogger } from '../utils/getLogger';
import { getMessageInfo } from '../utils/getMessageInfo';
import { getMessageType } from './telegramHelpers';

export async function logOutcomingMessage(method: string, ctx: Ctx, args: any[], message: Message) {
  if (Array.isArray(message)) {
    // TODO: подумать??/
    await Promise.all(message.map((msg) => logOutcomingMessage(method, ctx, args, msg)));
    return;
  }
  const log = getLogger(ctx.botInfo);
  const { action, user, chat, chatType } = getMessageInfo(ctx);
  const { text } = message;
  const userOrUserId = user || args[0];
  // if (!user) console.log('ctx', ctx, args[0]);
  // eslint-disable-next-line no-nested-ternary
  const messageType = getMessageType(message || {});
  const msg = [
    method !== 'sendMessage' ? method : '',
    '=>',
    action !== 'message' ? `${action} ` : '',
    `[${userOrUserId}]`,
    chat && chatType !== 'private' ? `(${chat})` : '',
    messageType,
    text,
  ]
    .filter(Boolean)
    .join(' ');
  log.trace(msg);
}
