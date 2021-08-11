import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import isObjectLike from 'lodash/isObjectLike';

import portalActions from '../actions';

export default async function runAction({ event, ctx, bot, ...props }) {
  let { action: actions } = props;
  if (!actions) return null;
  if (!Array.isArray(actions)) actions = [actions];
  if (isEmpty(actions)) return null;
  return Bluebird.each(actions, async (action) => {
    const { type } = action;
    let result = null;
    if (portalActions[action]) result = await portalActions[action].call(this, { event, ctx, bot, ...action });
    if (portalActions[type]) result = await portalActions[type].call(this, { event, ctx, bot, ...action });

    const isNotNull =
      (['number', 'string', 'boolean'].includes(typeof result) && !!result) ||
      (isObjectLike(result) && !isEmpty(result));

    if (action.then && !isEmpty(action.then) && isNotNull) {
      await this.runAction({ event, ctx, bot, action: action.then });
    }
    if (action.else && !isEmpty(action.else) && !isNotNull) {
      await this.runAction({ event, ctx, bot, action: action.else });
    }

    await Bluebird.delay(10);
    return result;
  });
}
