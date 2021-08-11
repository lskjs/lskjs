import get from 'lodash/get';

import { parseExtra } from '../../utils';
import messageAddExtra from './messageAddExtra';
import messagesJoin from './messagesJoin';

export default async function createMessage({ text, to }) {
  let data = {};

  if (!this.ctx) {
    data.type = 'text';
    data.text = text;
    data.to = to;
    return { res: true, data };
  }

  const messageText = this.bot.getMessageText(this.ctx);
  const chatId = this.bot.getMessageChatId(this.ctx);
  const type = this.bot.getMessageType(this.ctx);
  const isMediaGroup = this.bot.isMediaGroup(this.ctx);
  const message = this.bot.getMessage(this.ctx);
  const keyboard = get(message, 'reply_markup.inline_keyboard', '');

  data.to = to || chatId;
  data.type = type;
  data.media = message[type];

  data.text = text || messageText;
  data.caption = text || messageText;

  if (type === 'photo') {
    data.media = message.photo[message.photo.length - 1];
  }

  if (isMediaGroup) {
    const mediaGroupText = this.bot.getMessageText(this.ctx.group[0]);
    const { data: media } = await messagesJoin.call(this, { ctx: this.ctx, caption: text || mediaGroupText });
    data.type = 'mediaGroup';
    data.media = media;
  }

  if (keyboard) {
    const buttons = parseExtra(keyboard);
    const params = { parent: data, extra: buttons };

    ({ data } = await messageAddExtra.call(this, params));
  }
  return { res: true, data };
}
