import Model from '@lskjs/db/Model';

export default class BotsUserDataModel extends Model {
  static schema = {
    userId: Model.Types.ObjectId,
    telegramChatId: String,
    telegramUserId: String,
    plugin: String,
    type: {
      type: String,
      required: true,
    },
    count: Number,
    meta: { type: Object },
    info: { type: Object },
    private: { type: Object },
  };

  static options = {
    model: 'BotsUserDataModel',
    collection: 'bots_user_data',
    timestamps: true,
  };
}
