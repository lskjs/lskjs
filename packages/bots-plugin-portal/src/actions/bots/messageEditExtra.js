import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

const parseExtra = (button) => {
  const { text, callback_data: callbackData, url } = button;
  if (url) {
    return {
      type: 'sender',
      text,
    };
  }
  const { pathname, searchParams = {} } = new URL(`www://test.ru${callbackData}`);
  const params = {};
  new URLSearchParams(searchParams).forEach((value, key) => {
    params[key] = value;
  });

  if (pathname === '/portal_answer') {
    return {
      type: 'answer',
      text,
    };
  }
  if (pathname === '/portal_sender') {
    return {
      type: 'sender',
      text,
    };
  }
  if (pathname === '/portal_like') {
    const { type } = params;
    return {
      [type]: {
        title: text.replace(/ \d*$/, ''),
        value: text.match(/\d*$/),
      },
    };
  }
  return {};
};

export default async function messageEditExtra(params) {
  const { parent = {}, extra = [], ctx, then = {} } = params;
  this.ctx = this.ctx || ctx;
  const data = {};

  const message = this.bot.getMessage(this.ctx);

  const keyboard = get(message, 'reply_markup.inline_keyboard', undefined);
  data.text = parent.text || '';

  const parsedButtons = [];
  const likes = { type: 'like', buttons: {} };

  flattenDeep(keyboard).forEach((button) => {
    const parsedButton = parseExtra(button);
    const { disslike, like, type } = parsedButton;

    if (like) likes.buttons.like = parsedButton.like;
    if (disslike) likes.buttons.disslike = parsedButton.disslike;
    if (type) parsedButtons.push(parsedButton);
  });
  if (!isEmpty(likes.buttons)) parsedButtons.unshift(likes);

  if (!keyboard) return { res: true };

  if (this.ctx.reply_to_message) this.bot.setMessage(this.ctx, '', this.ctx.reply_to_message);

  const groupTypesButtons = groupBy([...parsedButtons, ...extra], 'type');
  const groupButtons = Object.values(groupTypesButtons);
  const mergeButtons = groupButtons.map((value) => merge(...value));

  const action = {
    type: 'messageAddExtra',
    extra: mergeButtons,
    then,
  };
  return this.runAction(action);
}
