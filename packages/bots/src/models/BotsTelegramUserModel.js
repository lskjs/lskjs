// ts-ignore
import Model from '@lskjs/db/Model';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import set from 'lodash/set';

// https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
export default class BotsTelegramUserModel extends Model {
  static schema = {
    /** Unique identifier for this user or bot */
    id: {
      type: Number,
    },
    /** True, if this user is a bot */
    is_bot: {
      type: Boolean,
    },
    /** User's or bot's first name */
    first_name: {
      type: String,
    },
    /** User's or bot's last name */
    last_name: {
      type: String,
    },
    /** User's or bot's username */
    username: {
      type: String,
    },
    /** IETF language tag of the user's language */
    language_code: {
      type: String,
    },

    // Объект, в котрый можно складировать мета-информацию
    meta: {
      type: Object,
    },
  };
  static options = {
    model: 'BotsTelegramUserModel',
    collection: 'bots_telegram_user',
    timestamps: true,
  };

  setState(state = {}) {
    forEach(state, (value, key) => {
      set(this, key, value);
      // ts-ignore
      this.markModified(key);
    });
  }

  setRef(data) {
    const refUserLink = get(this, 'meta.start.ref');
    const refLink = get(data, 'ref');

    if (refUserLink || !refLink) return;
    set(this, 'meta.start.ref', refLink);

    this.markModified('meta');
  }

  setLang(data, telegramLocale) {
    const locale = get(data, 'locale', telegramLocale);
    set(this, 'meta.locale', locale);

    this.markModified('meta');
  }
}
