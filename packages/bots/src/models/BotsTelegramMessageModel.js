import MongooseSchema from '@lskjs/db/MongooseSchema';
//
export default () => {
  const schema = new MongooseSchema(
    {
      botId: {
        type: MongooseSchema.Types.ObjectId,
      },
      message_id: {
        type: Number,
      },
      from: {
        type: Object,
      },
      chat: {
        type: Object,
      },
      date: {
        type: Number,
      },
      text: {
        type: String,
      },
    },
    {
      model: 'BotsTelegramMessage',
      collection: 'bots_telegram_message',
    },
  );

  return schema;
};
