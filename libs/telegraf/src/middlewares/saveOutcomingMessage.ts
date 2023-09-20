/* eslint-disable camelcase */

import { Ctx, DbService, Message } from '../types';
import { getLogger } from '../utils/getLogger';

export async function saveOutcomingMessage(
  service: DbService,
  method: string,
  ctx: Ctx,
  args: any[],
  res: Message | Message[],
) {
  const log = getLogger(ctx.botInfo);
  if (Array.isArray(res)) {
    await Promise.all(res.map((msg) => saveOutcomingMessage(service, method, ctx, args, msg)));
    return;
  }
  const { id: botId } = ctx.botInfo;
  const message = res;

  const chatId = message?.chat?.id;
  const messageId = message?.message_id;
  if (!messageId) {
    log.error('!messageId 22', message, ctx);
    return;
  }
  const $set = {
    botId,
    chatId,
    messageId,
    ...message,
  };
  await Promise.all([
    service.upsertMessage({ botId, chatId, messageId }, $set),
    service.upsertChat({ botId, chatId }, { lastMessage: message, updatedAt: new Date() }),
    service.upsertDialog({ botId, chatId }, { lastMessage: message, updatedAt: new Date() }),
  ]);
  service.eventEmitter.emit('dialogUpdated', { botId, chatId, event: 'outcomeMessage', $set });
}
