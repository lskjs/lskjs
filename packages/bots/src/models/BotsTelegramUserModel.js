import MongooseSchema from '@lskjs/db/MongooseSchema';

// https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
export default () => {
  const schema = new MongooseSchema(
    {
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
    },
    {
      model: 'BotsTelegramUser',
      collection: 'bots_telegram_user',
    },
  );

  return schema;
};
