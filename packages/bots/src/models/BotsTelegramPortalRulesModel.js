import Model from '@lskjs/db/Model';

export default class BotsTelegramPortalRulesModel extends Model {
  static schema = {
    when: { type: Object },
    where: { type: String },
    then: { type: Object },
    meta: { type: Object },
    info: { type: Object },
    private: { type: Object },
  };

  static options = {
    model: 'BotsTelegramPortalRules',
    collection: 'bots_telegram_portal_rules',
    timestamps: true,
  };
}
