import Bluebird from 'bluebird';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

export const defaultGetMediaGroupId = (ctx) => {
  // return ctx.message.media_group_id || null;
  const a = 123;
  return [get(ctx, 'message.from.id'), get(ctx, 'message.chat.id'), get(ctx, 'message.date')].filter(Boolean).join('_');
};

const groups = {};
export const groupMessages = (callback, { groupKey = defaultGetMediaGroupId, delay = 1000 } = {}) => async (ctx) => {
  const mediaGroupId = groupKey(ctx);
  // console.log('[QWE] 11', ctx.message.message_id, mediaGroupId);
  if (!mediaGroupId) {
    callback(ctx);
    return;
  }
  if (!groups[mediaGroupId]) groups[mediaGroupId] = [];
  groups[mediaGroupId].push(ctx);

  // console.log('[QWE] 22', ctx.message.message_id, mediaGroupId, groups[mediaGroupId].length);
  const delayMs = (1 + Math.random()) * delay;
  // console.log('[QWE] 333', ctx.message.message_id, mediaGroupId, groups[mediaGroupId].length, 'delay', delay);
  await Bluebird.delay(delayMs);
  const group = sortBy(groups[mediaGroupId], 'message.message_id');
  // console.log('[QWE] 33', ctx.message.message_id, mediaGroupId, groups[mediaGroupId].length);
  if (!group.length) return;
  if (group.length === 1) {
    callback(ctx);
    return;
  }
  ctx.group = group;
  callback(ctx);
  groups[mediaGroupId] = [];
  // console.log('[QWE] 444', ctx.message.message_id, mediaGroupId, groups[mediaGroupId].length);
};
export default groupMessages;
