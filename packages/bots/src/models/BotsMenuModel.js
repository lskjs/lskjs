import Model from '@lskjs/db/Model';

export default class BotsMenuModel extends Model {
  static schema = {
    key: String,
    content: Object, // { text: String }
    keyboard: Array,
    buttonsLayout: Array,
  };
  static options = {
    model: 'BotsMenu',
    collection: 'bots_menu',
    timestamps: true,
  };
}
