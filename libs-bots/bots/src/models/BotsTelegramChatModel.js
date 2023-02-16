import Model from '@lskjs/db/Model';

// https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
export default class BotsTelegramChatModel extends Model {
  static schema = {
    /** Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
    id: {
      type: Number,
    },
    /** Type of chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: {
      type: String,
    },
    /** Username, for private chats, supergroups and channels if available */
    username: {
      type: String,
    },
    /** Title, for supergroups, channels and group chats */
    title: {
      type: String,
    },

    // Объект, в котрый можно складировать мета-информацию
    meta: {
      type: Object,
    },
  };
  static options = {
    model: 'BotsTelegramChatModel',
    collection: 'bots_telegram_chat',
    timestamps: true,
  };
}
