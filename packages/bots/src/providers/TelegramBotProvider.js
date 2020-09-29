import Telegraf from 'telegraf';
import some from 'lodash/some';
import BotProvider from './BotProvider';

/**
 * Docs: https://telegraf.js.org/#/
 */

export default class TelegramBotProvider extends BotProvider {
  name = 'TelegramBotProvider';
  provider = 'telegram';
  Telegraf = Telegraf;
  eventTypes = [
    'message',
    'edited_message',
    'callback_query',
    'inline_query',
    'shipping_query',
    'pre_checkout_query',
    'chosen_inline_result',
    'channel_post',
    'edited_channel_post',
  ];
  async init() {
    await super.init();
    if (!this.config.token) throw 'TelegramBotProvider !config.token';
    this.client = new Telegraf(this.config.token);
    await this.initEventEmitter();
  }
  async run() {
    await super.run();
    if (!this.client) return;
    await this.client.launch();
    await this.client.startPolling();
  }

  getMessageText(ctxOrMessage = {}) {
    if (ctxOrMessage.message) return ctxOrMessage.message.text;
    return ctxOrMessage.text;
  }

  isMessageCommand(message, command) {
    // console.log('isMessageCommand', message, command);
    return this.isMessageStartsWith(message, `/${command}`);
  }

  reply(ctxOrMessage, payload, extra) {
    // if (ctxOrMessage.reply) { // хз почему
    //   ctxOrMessage.reply(payload);
    // } else {
    const message = ctxOrMessage.message || ctxOrMessage;
    if (!extra) extra = {};
    extra.reply_to_message_id = message.message_id;
    this.client.telegram.sendMessage(message.chat ? message.chat.id : message.from.id, payload, extra);
    // }
  }

  // async repost({message, chatId, forwardFrom}) {
  //   const data = { };
  //   if (message.sticker) {
  //     data.type = 'sticker';
  //     data.method = 'sendSticker';
  //     data.path = message.sticker.file_id;
  //   }
  //   if (message.photo) {
  //     data.type = 'photo';
  //     data.method = 'sendPhoto';
  //     data.text = message.caption || '';
  //     data.path = message.photo[0].file_id;
  //     data.opt = {
  //       caption: message.caption,
  //     };
  //   }
  //   if (message.voice) {
  //     data.type = 'voice';
  //     data.method = 'sendVoice';
  //     data.path = message.voice.file_id;
  //   }
  //   if (message.video_note) {
  //     data.type = 'video_note';
  //     data.method = 'sendVideoNote';
  //     data.path = message.video_note.file_id;
  //   }
  //   if (message.video) {
  //     data.type = 'video';
  //     data.method = 'sendVideo';
  //     data.path = message.video.file_id;
  //   }
  //   if (message.location) {
  //     data.type = 'location';
  //     data.method = 'sendLocation';
  //     data.path = message.location.latitude;
  //     data.opt = message.location.longitude;
  //   }
  //   if (message.document) {
  //     data.type = 'document';
  //     data.method = 'sendDocument';
  //     data.path = message.document.file_id;
  //     data.opt = {
  //       caption: message.caption,
  //     };
  //   }
  //   if (message.text) {
  //     data.type = 'text';
  //     data.method = 'sendMessage';
  //     data.path = message.text;
  //   }
  //   if (message.audio) {
  //     data.type = 'audio';
  //     data.method = 'sendAudio';
  //     data.path = message.audio.file_id;
  //   }
  //   if (forwardFrom) {
  //     return this.bot.forwardMessage(chatId, forwardFrom, message.message_id);
  //   } else if (data.method) {
  //     return this.bot[data.method](chatId, data.path, data.opt || {});
  //   } else {
  //     console.error('НАТА РЕАЛИЗУЙ МЕНЯ', message);
  //     return null;
  //   }
  // }

  // testGroupId(message, id) {
  //   const chatId = message.chat.id || message.from.id;
  //   return chatId == id;
  // }

  // letter = '[a-zA-Zа-яА-ЯёЁ0-9]';
  // nonLetter = '[^a-zA-Zа-яА-ЯёЁ0-9]';

  // wordBoundary(text, word) {
  //   text.toLowerCase();
  //   const regExp = new RegExp(`\\s${word}\\s`, 'g');
  //   text = text.replace(new RegExp(this.nonLetter, 'g'), ' ');
  //   text = ` ${text} `;
  //   return text.match(regExp);
  // }

  // randomInteger(min, max) {
  //   return random(min, max);
  // }

  // percentProbability(percent) {
  //   const r = random(0, 100);
  //   return r < percent;
  // }

  // send(msg, text, params) {
  //   let {
  //     delay = random(0, 5, 1),
  //     reply = 50,
  //     method = 'sendMessage',
  //   } = params;
  //   const chatId = msg.chat.id || msg.from.id;
  //   const bot = this.bot;
  //   const opt = this.percentProbability(reply) ? {
  //     reply_to_message_id: msg.message_id
  //   } : {};

  //   setTimeout(function () {
  //     bot[method](chatId, text, opt);
  //   }, delay);
  // }
  // sendSticker(msg, text, params = {}) {
  //   this.send(msg, text, {
  //     ...params,
  //     method: 'sendSticker',
  //   })
  // }
  // sendMessage(msg, text, params = {}) {
  //   this.send(msg, text, {
  //     ...params,
  //     method: 'sendMessage',
  //   })
  // }
  // sendPhoto(msg, text, params = {}) {
  //   this.send(msg, text, {
  //     ...params,
  //     method: 'sendPhoto',
  //   })
  // }

  // editMessage(msg, text) {
  //   msg.then((sended) => {
  //     const chatId = sended.chat.id;
  //     const messageId = sended.message_id;
  //     this.bot.editMessageText(text, { chat_id: chatId, message_id: messageId });
  //   });
  // }

  // deleteMessage(chat_id, message_id, params = {}) {
  //   this.bot.deleteMessage(chat_id, message_id, params);
  // }
}
