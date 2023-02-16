import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import merge from 'lodash/merge';

import { parseExtra } from '../../utils';
import messageAddExtra from './messageAddExtra';

export default async function messageEditExtra(params) {
  const { extra = [], ctx } = params;
  this.ctx = this.ctx || ctx;

  const message = this.bot.getMessage(this.ctx);

  const keyboard = get(message, 'reply_markup.inline_keyboard', '');

  const parsedButtons = parseExtra(keyboard);
  const groupTypesButtons = groupBy([...parsedButtons, ...extra], 'type');
  const groupButtons = Object.values(groupTypesButtons);
  const mergeButtons = groupButtons.map((value) => merge(...value));

  params.extra = mergeButtons;

  const { data } = await messageAddExtra.call(this, params);
  return { res: true, data };
}
