import { IBotProviderMessageCtx } from '@lskjs/bots-base/types';
import BaseBotProvider from '@lskjs/bots-provider';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
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
    if (get(ctx, 'update.callback_query.message')) return get(ctx, 'update.callback_query.message');
    if (get(ctx, 'update.channel_post')) return get(ctx, 'update.channel_post');
    if (get(ctx, 'update.message')) return get(ctx, 'update.message');
    if (get(ctx, 'message')) return get(ctx, 'message');
    return ctx;
  }
  getUser(ctx: TelegramIBotProviderMessageCtx): TelegramIBotProviderMessageCtx {
    if (get(ctx, 'update.callback_query.from')) return get(ctx, 'update.callback_query.from');
    if (get(ctx, 'update.channel_post.from')) return get(ctx, 'update.channel_post.from');
    if (get(ctx, 'update.message.from')) return get(ctx, 'update.message.from');
    return ctx;
  }
  getUserId(ctx: TelegramIBotProviderMessageCtx): number | null {
    return this.getUser(ctx).id;
  }
  getMessageId(ctx: TelegramIBotProviderMessageCtx): number | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getMessage(ctx);
    return message.message_id || null;
  }
  getMessageUserId(ctx: TelegramIBotProviderMessageCtx): number | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getMessage(ctx);
    if (get(message, 'from.id')) return get(message, 'from.id');
    return null;
  }
  getMessageChatId(ctx: TelegramIBotProviderMessageCtx): number | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getMessage(ctx);
    if (get(message, 'chat.id')) return get(message, 'chat.id');
    return null;
  }
  getMessageTargetId(ctx: TelegramIBotProviderMessageCtx): number | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getMessage(ctx);
    return get(message, 'message_id', null);
  }
  getRepliedMessage(ctx: TelegramIBotProviderMessageCtx): IBotProviderMessageCtx {
    const message = this.getMessage(ctx);
    return message.reply_to_message || null;
  }
  getRepliedMessageId(ctx: TelegramIBotProviderMessageCtx): number | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getRepliedMessage(ctx);
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
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getRepliedMessage(ctx);
    if (!message) return null;
    return message.message_id || null;
  }
  getMessageCallbackData(ctx: TelegramIBotProviderMessageCtx): any | null {
    return get(ctx, 'update.callback_query.data', null);
  }
  getNextRoute(ctx: TelegramIBotProviderMessageCtx): string | null {
    if (['number', 'string'].includes(typeof ctx)) return null;
    return get(ctx, 'session.nextRoute.path', null);
  }
  getMessageText(ctx: TelegramIBotProviderMessageCtx): string | null {
    if (typeof ctx === 'string') return ctx;
    const message = this.getMessage(ctx);
    if (!message) return null;
    if (message.caption) return message.caption;
    if (message.text) return message.text;
    return null;
  }
  setMessageText(ctx: TelegramIBotProviderMessageCtx, text = ''): string | null {
    if (typeof ctx === 'string') return null;
    if (get(ctx, 'update.callback_query.message.caption'))
      return set(ctx, 'update.callback_query.message.caption', text);
    if (get(ctx, 'update.callback_query.message.text')) return set(ctx, 'update.callback_query.message.text', text);
    if (get(ctx, 'update.channel_post.caption')) return set(ctx, 'update.channel_post.caption', text);
    if (get(ctx, 'update.channel_post.text')) return set(ctx, 'update.channel_post.text', text);
    if (get(ctx, 'update.message.caption')) return set(ctx, 'update.message.caption', text);
    if (get(ctx, 'update.message.text')) return set(ctx, 'update.message.text', text);
    if (get(ctx, 'message.caption')) return set(ctx, 'message.caption', text);
    if (get(ctx, 'message.text')) return set(ctx, 'message.text', text);

    if (get(ctx, 'update.callback_query.message')) {
      ctx = set(ctx, 'update.callback_query.message.text', text);
      return set(ctx, 'update.callback_query.message.caption', text);
    }
    if (get(ctx, 'update.channel_post')) {
      ctx = set(ctx, 'update.channel_post.text', text);
      return set(ctx, 'update.channel_post.caption', text);
    }
    if (get(ctx, 'update.message')) {
      ctx = set(ctx, 'update.message.text', text);
      return set(ctx, 'update.message.caption', text);
    }
    if (get(ctx, 'message')) {
      ctx = set(ctx, 'message.text', text);
      return set(ctx, 'message.caption', text);
    }
    return ctx;
  }
  setMessage(ctx: TelegramIBotProviderMessageCtx, path: string, value: any): any | null {
    if (typeof ctx === 'string') return null;
    const msgPath = (path && `.${path}`) || '';
    if (get(ctx, `update.callback_query${msgPath}`)) return set(ctx, `update.callback_query${msgPath}`, value);
    if (get(ctx, `update.channel_post${msgPath}`)) return set(ctx, `update.channel_post${msgPath}`, value);
    if (get(ctx, `update.message${msgPath}`)) return set(ctx, `update.message${msgPath}`, value);
    if (get(ctx, `message${msgPath}`)) return set(ctx, `message${msgPath}`, value);
    return null;
  }
  async getChatMember(chatId: string | number, userId: string | number): any {
    try {
      const chatMember = await this.client.telegram.getChatMember(chatId, userId);
      return chatMember;
    } catch (error) {
      return {};
    }
  }
  async userInChat(chatId: string | number, userId: string | number): boolean | undefined {
    const chatMember = await this.getChatMember(chatId, userId);
    if (isEmpty(chatMember)) return undefined;
    if (chatMember.status === 'left') return false;
    return true;
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
  getMessageChatType(ctx: TelegramIBotProviderMessageCtx): string | null {
    if (['number', 'string'].includes(typeof ctx)) return ctx;
    const message = this.getMessage(ctx);
    if (get(message, 'chat.type')) return get(message, 'chat.type');
    return null;
  }
  isMediaGroup(ctx: TelegramIBotProviderMessageCtx): boolean {
    const message = this.getMessage(ctx);
    return !!message.media_group_id;
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

  async saveEvent(ctx: TelegramIBotProviderMessageCtx, data = {}): Promise<any> {
    const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
    const botId = this.getBotId();
    const eventData = this.getMessage(ctx);
    const { chat, message_id: messageId } = eventData;

    return BotsEventModel.findOneAndUpdate(
      { botId, provider: this.provider, 'data.chat': chat, 'data.message_id': messageId },
      { ...data },
      {
        new: true,
        upsert: true,
      },
    );
  }

  async saveMessage(ctx: TelegramIBotProviderMessageCtx, parentCtx: TelegramIBotProviderMessageCtx): Promise<any> {
    const BotsEventModel = await this.botsModule.module('models.BotsEventModel');
    const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
    const BotsTelegramUserModel = await this.botsModule.module('models.BotsTelegramUserModel');
    const BotsTelegramChatModel = await this.botsModule.module('models.BotsTelegramChatModel');
    const botId = this.getBotId();
    const type = this.getMessageType(ctx);
    const eventData = this.getMessage(ctx);
    const { from, chat } = eventData;
    let telegramUserId;
    let chatUserId;
    if (from) {
      const { id } = from;
      ({ _id: telegramUserId } = await BotsTelegramUserModel.findOneAndUpdate(
        { id },
        { ...from, id },
        {
          new: true,
          upsert: true,
        },
      ));
    }
    if (chat) {
      const { id } = chat;
      ({ _id: chatUserId } = await BotsTelegramChatModel.findOneAndUpdate(
        {
          id,
        },
        { ...from, id, username: chat.username || chat.title },
        {
          new: true,
          upsert: true,
        },
      ));
    }
    const data = {
      botId,
      telegramUserId,
      chatUserId,
      type,
      meta: { parent: this.getMessage(parentCtx) },
      ...eventData,
    };
    await BotsTelegramMessageModel.create(data);
    await BotsEventModel.create({
      botId,
      provider: this.provider,
      type: 'message',
      data: eventData,
    });
    this.log.trace('[message]: ', eventData);
    return ctx;
  }

  /**
   * Function for resend content
   * Docs: https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
   *
   * @param {int|string} chatId repost target
   * @param {object} ctx message or message context
   */
  async repost(
    chatId: number | string,
    ctx: TelegramIBotProviderMessageCtx,
    initExtra?: Record<string, unknown>,
  ): Promise<any> {
    const type = this.getMessageType(ctx);
    const message = this.getMessage(ctx);

    this.log.trace('repost', type);

    let method: string;
    let args: any[];
    const extra: any = {
      ...(initExtra || {}),
    };
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
    const msg = await this.client.telegram[method](...telegramArgs);
    return this.saveMessage(msg);
  }

  async sendMessage(ctx: any, content: any, extra = {}, markdown = false): Promise<any> {
    let to = this.getMessageChatId(ctx);
    let method = 'sendMessage';
    let args = [content.text || content];

    if (ctx && ['number', 'string'].includes(typeof ctx)) to = ctx;

    const { type } = content;
    if (type === 'mediaGroup') {
      method = 'sendMediaGroup';
      args = [content.media];
    } else if (type === 'audio') {
      method = 'sendAudio';
      args = [content.media.file_id];
    } else if (type === 'document') {
      method = 'sendDocument';
      args = [content.media.file_id];
    } else if (type === 'animation') {
      method = 'sendAnimation';
      args = [content.media.file_id];
    } else if (type === 'photo') {
      method = 'sendPhoto';
      args = [content.media.file_id];
    } else if (type === 'sticker') {
      method = 'sendSticker';
      args = [content.media.file_id];
    } else if (type === 'video') {
      method = 'sendVideo';
      args = [content.media.file_id];
    } else if (type === 'video_note') {
      method = 'sendVideoNote';
      args = [content.media.file_id];
    } else if (type === 'voice') {
      method = 'sendVoice';
      args = [content.media.file_id];
    } else if (type === 'contact') {
      method = 'sendContact';
      args = [content.media];
    } else if (type === 'dice') {
      method = 'sendDice';
      args = [content.media];
    } else if (type === 'game') {
      method = 'sendGame';
      args = [content.media];
    } else if (type === 'poll') {
      if (content.type === 'quiz') {
        method = 'sendQuiz';
      } else {
        method = 'sendPoll';
      }
      args = [content.media.question, content.media.options.map((option: any) => option.text)];
    } else if (type === 'location') {
      method = 'sendLocation';
      args = [content.media.latitude, content.media.longitude];
    } else if (type === 'venue') {
      method = 'sendVenue';
      args = [content.media];
    } else if (type === 'text') {
      method = 'sendMessage';
      args = [content.text];
    }
    const telegramArgs = [
      to,
      ...args,
      {
        caption: content.text || content.caption,
        parse_mode: markdown ? 'Markdown' : '',
        reply_markup: extra.reply_markup,
      },
    ];
    this.log.trace(`telegram.${method}`, ...telegramArgs);
    const msg = await this.client.telegram[method](...telegramArgs);
    if (type === 'mediaGroup') {
      const msgExtra = await this.client.telegram.sendMessage(to, '_________', extra);
      return this.saveMessage(msgExtra);
    }
    return this.saveMessage(msg);
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
    const msg = await this[method](ctx, payload, extra);
    return this.saveMessage(msg, ctx);
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
    const msg = await ctx[method](payload, extra);
    return this.saveMessage(msg, ctx);
  }
  async reply(ctx: TelegramIBotProviderMessageCtx, payload: any, initExtra = {}) {
    this.log.trace('reply');
    const extra = {
      reply_to_message_id: this.getRepliedMessageId(ctx) || this.getMessageId(ctx),  //eslint-disable-line
      ...initExtra,
    };
    // console.log({extra})
    const msg = await this.client.telegram.sendMessage(this.getMessageChatId(ctx), payload, extra).catch((err: any) => {
      this.log.error(err);
      throw err;
    });
    return this.saveMessage(msg, ctx);
  }
  async editMessage(ctx: TelegramIBotProviderMessageCtx, payload: any, extra = {}) {
    this.log.trace('editMessage');
    try {
      const msg = await this.client.telegram.editMessageText(
        this.getMessageChatId(ctx),
        this.getMessageId(ctx),
        null,
        payload,
        extra,
      );
      return this.saveMessage(msg, ctx);
    } catch (err: any) {
      this.log.error(err);
      return err;
    }
  }
  async editMessageReplyMarkup(ctx: TelegramIBotProviderMessageCtx, extra = {}) {
    this.log.trace('editMessage');
    try {
      const msg = await this.client.telegram.editMessageReplyMarkup(
        this.getMessageChatId(ctx),
        this.getMessageId(ctx),
        null,
        extra.reply_markup,
      );
      return this.saveMessage(msg, ctx);
    } catch (err: any) {
      this.log.error(err);
      return err;
    }
  }
  async deleteMessage(ctx: TelegramIBotProviderMessageCtx): any {
    const BotsTelegramMessageModel = await this.botsModule.module('models.BotsTelegramMessageModel');
    this.log.trace('deleteMessage');
    const chatId = this.getMessageChatId(ctx);
    const messageId = this.getMessageTargetId(ctx);

    await BotsTelegramMessageModel.updateOne(
      {
        'chat.id': chatId,
        message_id: messageId,
      },
      { 'meta.status': 'deleted' },
    );
    return this.client.telegram.deleteMessage(chatId, messageId);
  }
  async sendSticker(ctx: any, ...args: any[]) {
    this.log.trace('sendSticker');
    const msg = await this.client.telegram.sendSticker(this.getMessageChatId(ctx), ...args);
    return this.saveMessage(msg, ctx);
  }
  async sendAnimation(ctx: any, ...args: any[]) {
    this.log.trace('sendAnimation');
    const msg = await this.client.telegram.sendAnimation(this.getMessageChatId(ctx), ...args);
    return this.saveMessage(msg, ctx);
  }
  async sendDocument(ctx: any, ...args: any[]) {
    this.log.trace('sendDocument');
    const msg = this.client.telegram.sendDocument(this.getMessageChatId(ctx), ...args);
    return this.saveMessage(msg, ctx);
  }
  async sendPhoto(ctx: any, ...args: any[]) {
    this.log.trace('sendPhoto');
    const msg = await this.client.telegram.sendPhoto(this.getMessageChatId(ctx), ...args);
    return this.saveMessage(msg, ctx);
  }
  async sendMediaGroup(ctx: any, ...args: any[]) {
    this.log.trace('sendMediaGroup');
    const msg = await this.client.telegram.sendMediaGroup(this.getMessageChatId(ctx), ...args);
    return this.saveMessage(msg, ctx);
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
