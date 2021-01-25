import { Markup } from 'telegraf';

export const createButtons = (button, keyboardType) => {
  if (!button) return [];
  if (Array.isArray(button)) return button.map((b) => createButtons(b, keyboardType));
  let type;
  let value;
  let text;
  if (typeof button === 'string') {
    type = 'text';
    text = button;
  } else {
    let title;
    ({ type = 'text', value, title, text } = button);
    if (!text && title) text = title;
  }
  if (!value) value = text;
  if (keyboardType === 'inline' && type === 'text') type = 'callback';
  if (type === 'text') {
    return Markup.button(text);
  }
  if (type === 'callback') {
    return Markup.callbackButton(text, value);
  }
  if (type === 'url') {
    return Markup.urlButton(text, value);
  }
  if (type === 'poll') {
    return Markup.pollRequestButton(text, value);
  }
  if (type === 'location') {
    return Markup.locationRequestButton(text);
  }
  if (type === 'contact') {
    return Markup.contactRequestButton(text);
  }
  if (type === 'chat') {
    return Markup.switchToChatButton(text, value);
  }
  if (type === 'currentChat') {
    return Markup.switchToCurrentChatButton(text, value);
  }
  if (type === 'login') {
    return Markup.loginButton(text, value);
  }
  if (type === 'pay') {
    return Markup.payButton(text);
  }
  if (type === 'game') {
    return Markup.gameButton(text);
  }
};

export const createKeyboard = (keyboard) => {
  const layout = keyboard.layout || keyboard.buttons;
  const buttons = createButtons(layout, keyboard.type);
  if (keyboard.type === 'inline') {
    return Markup.inlineKeyboard(buttons);
  }
  return Markup.keyboard(buttons);
};

export default createKeyboard;
