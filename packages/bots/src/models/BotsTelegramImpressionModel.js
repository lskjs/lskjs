import Model from '@lskjs/db/Model';

export default class BotsTelegramImpressionModel extends Model {
  static schema = {
    type: {
      type: String,
      required: true,
      enum: ['like', 'disslike'],
    },
    chatId: {
      type: Model.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Model.Types.ObjectId,
      required: true,
    },
    message_id: {
      type: String,
      required: true,
    },
    meta: { type: Object },
    info: { type: Object },
    private: { type: Object },
  };

  static options = {
    model: 'BotsTelegramImpression',
    collection: 'bots_telegram_impression',
    timestamps: true,
  };
}
