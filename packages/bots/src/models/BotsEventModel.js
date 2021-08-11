import Model from '@lskjs/db/Model';

export default class BotsEventModel extends Model {
  static schema = {
    botId: {
      type: String,
    },
    provider: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
    },
  };
  static options = {
    model: 'BotsEvent',
    collection: 'bots_event',
    timestamps: true,
  };
}
