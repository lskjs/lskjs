import Model from '@lskjs/db/Model';

export default class BotsBotModel extends Model {
  static schema = {
    customerId: {
      type: Model.Types.ObjectId,
    },
    provider: {
      type: String,
      required: true,
    },
    creds: {
      type: Object,
    },
  };
  static options = {
    model: 'BotsBotModel',
    collection: 'bots_bot',
    timestamps: true,
  };
}
