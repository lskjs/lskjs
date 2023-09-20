/* eslint-disable camelcase */

import { Ctx } from '../types';
import { getLogger } from '../utils/getLogger';
import { getMessageInfo } from '../utils/getMessageInfo';

type Callback = () => Promise<void>;

export const logIncomingMessage = (ctx: Ctx, next: Callback) => {
  const log = getLogger(ctx.botInfo);
  const { user, chat, chatType, action, text, messageType } = getMessageInfo(ctx);
  const msg = [
    '=>',
    action !== 'message' ? `${action} ` : '',
    `[${user}]`,
    chat && chatType !== 'private' ? `(${chat})` : '',
    messageType,
    text,
  ]
    .filter(Boolean)
    .join(' ');
  log.trace(msg);
  return next();
};
