import Telegraf from 'telegraf';
import get from 'lodash/get';
import session from 'telegraf/session';
import assignProps from '@lskjs/utils/assignProps';
import { IBotProviderMessageCtx } from '../types';
import BaseBotProvider from './BaseBotProvider';

export type TelegramIBotProviderMessageCtx = IBotProviderMessageCtx;

/**
 * Docs: https://telegraf.js.org/#/
 */

type TelegramBotConfigType = {
  token: string;
};

export default class TelegramBotProvider extends BaseBotProvider {
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
  config: TelegramBotConfigType;

  constructor(...props: any[]) {
    super(...props);
    assignProps(this, ...props);
  }

  async init(): Promise<void> {
    await super.init();
    if (!this.config.token) throw 'TelegramBotProvider !config.token';
    this.client = new Telegraf(this.config.token);
    this.client.use(session());
  }
  async run(): Promise<void> {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    await this.client.launch();
    await this.client.startPolling();
  }
  getMessage(ctx: TelegramIBotProviderMessageCtx): TelegramIBotProviderMessageCtx {
    if (get(ctx, 'message')) return get(ctx, 'message');
    return ctx;
  }
  getMessageUserId(ctx: TelegramIBotProviderMessageCtx): number {
    const message = this.getMessage(ctx);
    if (get(message, 'from.id')) return get(message, 'from.id');
    return null;
  }
  getMessageChatId(ctx: TelegramIBotProviderMessageCtx): number {
    const message = this.getMessage(ctx);
    if (get(message, 'chat.id')) return get(message, 'chat.id');
    return null;
  }
  getMessageTargetId(ctx: TelegramIBotProviderMessageCtx): number {
    const message = this.getMessage(ctx);
    if (get(message, 'chat.id')) return get(message, 'chat.id');
    if (get(message, 'from.id')) return get(message, 'from.id');
    return null;
  }
  getReplyMessageId(ctx: TelegramIBotProviderMessageCtx): number {
    const message = this.getMessage(ctx);
    return message.message_id;
  }
  getMessageText(ctx: TelegramIBotProviderMessageCtx): string {
    if (typeof ctx === 'string') return ctx;
    if (get(ctx, 'message.caption')) return get(ctx, 'message.caption');
    if (get(ctx, 'message.text')) return get(ctx, 'message.text');
    return get(ctx, 'text');
  }
  getMessageCallbackData(ctx: TelegramIBotProviderMessageCtx): any {
    return get(ctx, 'update.callback_query.data', null);
  }
  isMessageCallback(ctx: TelegramIBotProviderMessageCtx): boolean {
    return get(ctx, 'updateType') === 'callback_query';
  }
  isMessageCommand(ctx: TelegramIBotProviderMessageCtx, command: RegExp | string): boolean {
    return this.isMessageStartsWith(ctx, `/${command || ''}`);
  }
  getMessageDate(ctx: TelegramIBotProviderMessageCtx): Date {
    const message = this.getMessage(ctx);
    return new Date(message.date * 1000);
  }
  /**
   * Docs: https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
   * @param {object} ctx message or message context
   */
  getMessageType(ctx: TelegramIBotProviderMessageCtx): string | null {
    const message = this.getMessage(ctx);
    if (message.audio) return 'audio';
    if (message.document) return 'document';
    if (message.animation) return 'animation';
    if (message.photo) return 'photo';
    if (message.sticker) return 'sticker';
    if (message.video) return 'video';
    if (message.video_note) return 'video_note';
    if (message.voice) return 'voice';
    if (message.contact) return 'contact';
    if (message.dice) return 'dice';
    if (message.game) return 'game'; // TODO: проверить
    if (message.poll) return 'poll';
    if (message.location) return 'location';
    if (message.venue) return 'venue'; // TODO: проверить
    if (message.text) return 'text';

    // СПОРНО
    if (message.pinned_message) return 'pinned_message';
    if (message.left_chat_member) return 'left_chat_member';
    if (message.new_chat_members) return 'new_chat_members';
    if (message.new_chat_title) return 'new_chat_title';
    if (message.new_chat_photo) return 'new_chat_photo';
    if (message.invoice) return 'invoice'; // TODO: проверить
    if (message.successful_payment) return 'successful_payment'; // TODO: проверить
    if (message.passport_data) return 'passport_data'; // TODO: проверить
    // if (message.reply_markup) return 'reply_markup'; // TODO: проверить
    return null;
  }



  forward(chatId: number|string, ctx: TelegramIBotProviderMessageCtx): Promise<any> {
    const message = this.getMessage(ctx);
    const forwardFrom = this.getForwardFrom(ctx);
    return this.client.forwardMessage(chatId, forwardFrom, message.message_id);
  };

  /**
   * Function for resend content
   * Docs: https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
   *
   * @param {int|string} chatId repost target
   * @param {object} ctx message or message context
   */
  repost(chatId: number | string, ctx: TelegramIBotProviderMessageCtx): Promise<any> {
    const type = this.getMessageType(ctx);
    const message = this.getMessage(ctx);
    const data = {};

    /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */

    if (type === 'audio') {
      data.method = 'sendAudio';
      data.args = [message.audio.file_id];
    } else if (type === 'document') {
      data.method = 'sendDocument';
      data.args = [message.document.file_id];
    } else if (type === 'animation') {
      data.method = 'sendAnimation'; // TODO: проверить
      data.args = [message.document.file_id];
    } else if (type === 'photo') {
      data.method = 'sendPhoto';
      // data.text = message.caption || '';// TODO: проверить
      data.args = [message.photo[0].file_id];
    } else if (type === 'sticker') {
      data.method = 'sendSticker';
      data.args = [message.sticker.file_id];
    } else if (type === 'video') {
      data.method = 'sendVideo';
      data.args = [message.video.file_id];
    } else if (type === 'video_note') {
      data.method = 'sendVideoNote';
      data.args = [message.video_note.file_id];
    } else if (type === 'voice') {
      data.method = 'sendVoice';
      data.args = [message.voice.file_id];
    } else if (type === 'contact') {
      data.method = 'sendContact';
      data.args = [message.contact]; // TODO: xz
    } else if (type === 'dice') {
      data.method = 'sendDice';
      data.args = [message.dice]; // TODO: xz
    } else if (type === 'game') {
      data.method = 'sendGame';
      data.args = [message.game]; // TODO: xz
    } else if (type === 'poll') {
      if (message.poll.type === 'quiz') {
        data.method = 'sendQuiz';
      } else {
        data.method = 'sendPoll';
      }
      console.log(message.poll.options);
      data.args = [message.poll.question, message.poll.options.map((option) => option.text)]; // TODO: xz
    } else if (type === 'location') {
      data.method = 'sendLocation';
      data.args = [message.location.latitude, message.location.longitude]; // TODO: xz
      // data.args = [message.location.latitude;
      // data.opt = message.location.longitude;
    } else if (type === 'venue') {
      data.method = 'sendVenue';
      data.args = [message.venue]; // TODO: xz
      // data.args = [message.location.latitude;
      // data.opt = message.location.longitude;
    } else if (type === 'text') {
      data.method = 'sendMessage';
      data.args = [message.text];
    } else {
      data.method = 'sendMessage';
      data.args = [`НАТА РЕАЛИЗУЙ МЕНЯ!!! [${type}] ${message.message_id}`];
    }
    if (['animation', 'audio', 'document', 'photo', 'video', 'voice'].includes(type)) {
      if (!data.extra) data.extra = {};
      data.extra.caption = message.caption;
    }
    if (!this.client.telegram[data.method]) {
      this.log.error(`!telegram.${data.method}`);
      return false;
    }
    const args = [chatId, ...data.args, data.extra || {}];
    this.log.trace(`telegram.${data.method}`, ...args);
    return this.client.telegram[data.method](...args);
  }
  async sendContent(ctx, content, extra = {}) {
    let type;
    let payload;
    if (typeof content === 'string') {
      type = 'text';
      payload = content
    } else {
      ({ type, ...payload } = content);
      if (type === 'text') {
        payload = payload.text;
      }
    }
    let method;
    if (type === 'document') {
      method = 'sendDocument';
    } else if (type === 'photo') {
      method = 'sendPhoto';
    } else {
      method = 'sendMessage';
    } 
    // this.log?.trace('ctx', method)
    await this[method](ctx, payload, extra);
  }
  async replyContent(ctx, content, extra = {}) {
    let type;
    let payload;
    if (typeof content === 'string') {
      type = 'text';
      payload = content
    } else {
      ({ type, ...payload } = content);
    }
    let method;
    if (type === 'document') {
      method = 'replyWithDocument';
    } else if (type === 'photo') {
      method = 'replyWithText';
    } else {
      method = 'reply';
    } 
    await ctx[method](payload, extra);
  }
  reply(ctx, payload, extra = {}) {
    return this.client.telegram
      .sendMessage(this.getMessageTargetId(ctx), payload, {
        ...extra,
        reply_to_message_id: this.getReplyMessageId(ctx),
      })
      .catch((err) => {
        this.log?.error(err);
        throw err;
      });
  }
  sendMessage(ctx, ...args) {
    return this.client.telegram.sendMessage(this.getMessageTargetId(ctx), ...args);
  }
  sendSticker(ctx, ...args) {
    return this.client.telegram.sendSticker(this.getMessageTargetId(ctx), ...args);
  }
  sendAnimation(ctx, ...args) {
    return this.client.telegram.sendAnimation(this.getMessageTargetId(ctx), ...args);
  }
  sendDocument(ctx, ...args) {
    return this.client.telegram.sendDocument(this.getMessageTargetId(ctx), ...args);
  }
  sendPhoto(ctx, ...args) {
    return this.client.telegram.sendPhoto(this.getMessageTargetId(ctx), ...args);
  }

  isMessageLike(ctx) {
    const message = this.getMessage(ctx);
    const likes = ['+', '👍', '➕'].map((a) => a.codePointAt(0));

    let firstSign;
    if (message && message.text && message.text.codePointAt) {
      firstSign = message.text.codePointAt(0);
    } else if (message && message.sticker && message.sticker.emoji) {
      firstSign = message.sticker.emoji.codePointAt(0);
    }
    return firstSign && likes.includes(firstSign);
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
