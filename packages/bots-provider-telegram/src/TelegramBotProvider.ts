import { IBotProviderMessageCtx } from '@lskjs/bots-base/types';
import BaseBotProvider from '@lskjs/bots-provider';
import get from 'lodash/get';
import { session, Telegraf } from 'telegraf';

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
    'text',
    'audio',
    'dice',
    'document',
    'photo',
    'sticker',
    'video',
    'voice',
    'contact',
    'location',
    'venue',
    'forward',
    'new_chat_members',
    'left_chat_member',
    'new_chat_title',
    'new_chat_photo',
    'delete_chat_photo',
    'group_chat_created',
    'migrate_to_chat_id',
    'supergroup_chat_created',
    'channel_chat_created',
    'migrate_from_chat_id',
    'pinned_message',
    'game',
    'video_note',
    'invoice',
    'successful_payment',
    'connected_website',
    'passport_data',
    'poll',
  ];
  config: TelegramBotConfigType;
  async init(): Promise<void> {
    await super.init();
    if (!this.config.token) throw 'TelegramBotProvider !config.token';
    const { Telegraf } = this;
    this.client = new Telegraf(this.config.token);
    this.client.use(session());
    // TODO: временный костыль, @volkovpishet починит
    // this.client.use(async (ctx, next) => {
    //   if (!ctx.session) ctx.session = {};
    //   await next();
    // });
  }
  async run(): Promise<void> {
    await super.run();
    if (!this.client) return;
    await this.initEventEmitter();
    await this.client.launch();
  }
  getMessage(ctx: TelegramIBotProviderMessageCtx): TelegramIBotProviderMessageCtx {
    if (get(ctx, 'update.channel_post')) return get(ctx, 'update.channel_post');
    if (get(ctx, 'message')) return get(ctx, 'message');
    return ctx;
  }
  getMessageId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getMessage(ctx);
    return message.message_id || null;
  }
  getMessageUserId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getMessage(ctx);
    if (get(message, 'from.id')) return get(message, 'from.id');
    return null;
  }
  getMessageChatId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getMessage(ctx);
    if (get(message, 'chat.id')) return get(message, 'chat.id');
    return null;
  }
  getMessageTargetId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getMessage(ctx);
    if (get(message, 'chat.id')) return get(message, 'chat.id');
    if (get(message, 'from.id')) return get(message, 'from.id');
    return null;
  }
  getRepliedMessage(ctx: TelegramIBotProviderMessageCtx): IBotProviderMessageCtx {
    const message = this.getMessage(ctx);
    // console.log({message})
    return message.reply_to_message || null;
  }
  getRepliedMessageId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getRepliedMessage(ctx);
    // console.log({getRepliedMessage: message})

    if (!message) return null;
    return message.message_id || null;
  }
  getCallback(ctx: TelegramIBotProviderMessageCtx): any | null {
    return ctx.update && ctx.update.callback_query;
  }
  getCallbackMessage(ctx: TelegramIBotProviderMessageCtx): IBotProviderMessageCtx | null {
    const callback = this.getCallback(ctx);
    if (!callback) return null;
    return callback.message;
  }
  getCallbackMessageId(ctx: TelegramIBotProviderMessageCtx): number | null {
    const message = this.getRepliedMessage(ctx);
    if (!message) return null;
    return message.message_id || null;
  }
  getMessageCallbackData(ctx: TelegramIBotProviderMessageCtx): any | null {
    return get(ctx, 'update.callback_query.data', null);
  }
  getMessageText(ctx: TelegramIBotProviderMessageCtx): string | null {
    if (typeof ctx === 'string') return ctx;
    const message = this.getMessage(ctx);
    if (!message) return null;
    if (message.caption) return message.caption;
    if (message.text) return message.text;
    return null;
  }
  isMessageCallback(ctx: TelegramIBotProviderMessageCtx): boolean {
    return get(ctx, 'updateType') === 'callback_query';
  }
  isMessageCommand(ctx: TelegramIBotProviderMessageCtx, command: RegExp | string): boolean {
    return this.isMessageStartsWith(ctx, `/${command || ''}`);
  }
  getMessageCommand(ctx: TelegramIBotProviderMessageCtx): string | null {
    const messageText = this.getMessageText(ctx);
    if (messageText[0] !== '/') return null;
    return messageText.split('@')[0].split(' ')[0];
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

  // forward(chatId: number|string, ctx: TelegramIBotProviderMessageCtx): Promise<any> {
  //   const message = this.getMessage(ctx);
  //   const forwardFrom = this.getForwardFrom(ctx);
  //   return this.client.forwardMessage(chatId, forwardFrom, message.message_id);
  // };

  /**
   * Function for resend content
   * Docs: https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
   *
   * @param {int|string} chatId repost target
   * @param {object} ctx message or message context
   */
  async repost(chatId: number | string, ctx: TelegramIBotProviderMessageCtx): Promise<any> {
    const type = this.getMessageType(ctx);
    const message = this.getMessage(ctx);
    console.log({ ctx, type, message });
    this.log.trace('repost', type);

    let method: string;
    let args: any[];
    const extra: any = {};
    if (type === 'audio') {
      method = 'sendAudio';
      args = [message.audio.file_id];
    } else if (type === 'document') {
      method = 'sendDocument';
      args = [message.document.file_id];
    } else if (type === 'animation') {
      method = 'sendAnimation'; // TODO: проверить
      args = [message.document.file_id];
    } else if (type === 'photo') {
      method = 'sendPhoto';
      // text = message.caption || '';// TODO: проверить
      args = [message.photo[0].file_id];
    } else if (type === 'sticker') {
      method = 'sendSticker';
      args = [message.sticker.file_id];
    } else if (type === 'video') {
      method = 'sendVideo';
      args = [message.video.file_id];
    } else if (type === 'video_note') {
      method = 'sendVideoNote';
      args = [message.video_note.file_id];
    } else if (type === 'voice') {
      method = 'sendVoice';
      args = [message.voice.file_id];
    } else if (type === 'contact') {
      method = 'sendContact';
      args = [message.contact]; // TODO: xz
    } else if (type === 'dice') {
      method = 'sendDice';
      args = [message.dice]; // TODO: xz
    } else if (type === 'game') {
      method = 'sendGame';
      args = [message.game]; // TODO: xz
    } else if (type === 'poll') {
      if (message.poll.type === 'quiz') {
        method = 'sendQuiz';
      } else {
        method = 'sendPoll';
      }
      // console.log(message.poll.options);
      args = [message.poll.question, message.poll.options.map((option: any) => option.text)]; // TODO: xz
    } else if (type === 'location') {
      method = 'sendLocation';
      args = [message.location.latitude, message.location.longitude]; // TODO: xz
      // args = [message.location.latitude;
      // opt = message.location.longitude;
    } else if (type === 'venue') {
      method = 'sendVenue';
      args = [message.venue]; // TODO: xz
      // args = [message.location.latitude;
      // opt = message.location.longitude;
    } else if (type === 'text') {
      method = 'sendMessage';
      args = [message.text];
    } else {
      method = 'sendMessage';
      args = [`НАТА РЕАЛИЗУЙ МЕНЯ!!! [${type}] ${message.message_id}`];
    }

    /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
    if (type && ['animation', 'audio', 'document', 'photo', 'video', 'voice'].includes(type)) {
      extra.caption = message.caption;
    }
    if (!this.client.telegram[method]) {
      this.log.error(`!telegram.${method}`);
      return null;
    }
    const telegramArgs = [chatId, ...args, extra];
    this.log.trace(`telegram.${method}`, ...telegramArgs);
    return this.client.telegram[method](...telegramArgs);
  }

  async sendContent(ctx: TelegramIBotProviderMessageCtx, content: any, extra = {}): Promise<any> {
    this.log.trace('sendContent');
    let type: string;
    let payload: any;
    if (typeof content === 'string') {
      type = 'text';
      payload = content;
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
    // this.log.trace('ctx', method)
    await this[method](ctx, payload, extra);
  }

  async replyContent(ctx: TelegramIBotProviderMessageCtx, content: any, extra = {}): Promise<any> {
    this.log.trace('replyContent');
    // console.log({ content });
    let type: string;
    let payload: any;
    if (typeof content === 'string') {
      type = 'text';
      payload = content;
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
  reply(ctx: TelegramIBotProviderMessageCtx, payload: any, initExtra = {}) {
    this.log.trace('reply');
    const extra = {
      reply_to_message_id: this.getRepliedMessageId(ctx) || this.getMessageId(ctx),  //eslint-disable-line
      ...initExtra,
    };
    // console.log({extra})
    return this.client.telegram.sendMessage(this.getMessageTargetId(ctx), payload, extra).catch((err: any) => {
      this.log.error(err);
      throw err;
    });
  }
  editMessage(ctx: TelegramIBotProviderMessageCtx, payload: any, extra = {}) {
    this.log.trace('editMessage');
    // console.log({extra})
    return this.client.telegram.editMessage(this.getMessageId(ctx), payload, extra).catch((err: any) => {
      this.log.error(err);
      throw err;
    });
  }
  deleteMessage(ctx: TelegramIBotProviderMessageCtx): any {
    this.log.trace('deleteMessage');
    const chatId = this.getMessageChatId(ctx);
    const messageId = this.getMessageTargetId(ctx);
    // console.log({chatId, messageId})
    return this.client.telegram.deleteMessage(chatId, messageId);
  }
  sendMessage(ctx: any, ...args: any[]) {
    this.log.trace('sendMessage');
    return this.client.telegram.sendMessage(this.getMessageTargetId(ctx), ...args);
  }
  sendSticker(ctx: any, ...args: any[]) {
    this.log.trace('sendSticker');
    return this.client.telegram.sendSticker(this.getMessageTargetId(ctx), ...args);
  }
  sendAnimation(ctx: any, ...args: any[]) {
    this.log.trace('sendAnimation');
    return this.client.telegram.sendAnimation(this.getMessageTargetId(ctx), ...args);
  }
  sendDocument(ctx: any, ...args: any[]) {
    this.log.trace('sendDocument');
    return this.client.telegram.sendDocument(this.getMessageTargetId(ctx), ...args);
  }
  sendPhoto(ctx: any, ...args: any[]) {
    this.log.trace('sendPhoto');
    return this.client.telegram.sendPhoto(this.getMessageTargetId(ctx), ...args);
  }

  isMessageLike(ctx: any) {
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
