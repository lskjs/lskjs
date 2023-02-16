import Model from '@lskjs/db/Model';

export default class BotsTelegramUserStorageModel extends Model {
  static schema = {
    telegramChatId: {
      type: String,
      required: true,
    },
    telegramUserId: {
      type: String,
      required: true,
    },
    storage: { type: Object },
    meta: { type: Object },
    info: { type: Object },
    private: { type: Object },
  };

  static options = {
    model: 'BotsTelegramUserStorageModel',
    collection: 'bots_telegram_user_storage',
    timestamps: true,
  };
}
