import MongooseSchema from '@lskjs/db/MongooseSchema';

// https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
export default () => {
  const schema = new MongooseSchema(
    {
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
    },
    {
      model: 'BotsTelegramChat',
      collection: 'bots_telegram_chat',
    },
  );

  return schema;
};
