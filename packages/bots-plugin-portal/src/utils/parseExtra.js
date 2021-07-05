import flattenDeep from 'lodash/flattenDeep';
import isEmpty from 'lodash/isEmpty';

const parseButton = (button) => {
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

export default function parseExtra(keyboard) {
  const parsedButtons = [];
  const likes = { type: 'like', buttons: {} };

  flattenDeep(keyboard).forEach((button) => {
    const parsedButton = parseButton(button);
    const { disslike, like, type } = parsedButton;

    if (like) likes.buttons.like = parsedButton.like;
    if (disslike) likes.buttons.disslike = parsedButton.disslike;
    if (type) parsedButtons.push(parsedButton);
  });

  if (!isEmpty(likes.buttons)) parsedButtons.unshift(likes);
  return parsedButtons;
}
