// @ts-ignore
import { Markup } from 'telegraf';

export const createButtons = (button: any, keyboardType: any): any => {
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
    return Markup.button.text(text);
  }
  if (type === 'callback') {
    return Markup.button.callback(text, value);
  }
  if (type === 'url') {
    return Markup.button.url(text, value);
  }
  if (type === 'poll') {
    return Markup.button.pollRequest(text, value);
  }
  if (type === 'location') {
    return Markup.button.locationRequest(text);
  }
  if (type === 'contact') {
    return Markup.button.contactRequest(text);
  }
  if (type === 'chat') {
    return Markup.button.switchToChat(text, value);
  }
  if (type === 'currentChat') {
    return Markup.button.switchToCurrentChat(text, value);
  }
  if (type === 'login') {
    return Markup.button.login(text, value);
  }
  if (type === 'pay') {
    return Markup.button.pay(text);
  }
  if (type === 'game') {
    return Markup.button.game(text);
  }
};

export const createKeyboard = (keyboard: any): any => {
  const layout = keyboard.layout || keyboard.buttons;
  const buttons = createButtons(layout, keyboard.type);
  if (keyboard.type === 'inline') {
    return Markup.inlineKeyboard(buttons);
  }
  return Markup.keyboard(buttons);
};

export default createKeyboard;
