import MongooseSchema from '@lskjs/db/MongooseSchema';
//
export default () => {
  const schema = new MongooseSchema(
    {
      customerId: {
        type: MongooseSchema.Types.ObjectId,
      },
      provider: {
        type: String,
        required: true,
      },
      creds: {
        type: Object,
      },
    },
    {
      model: 'BotsBot',
      collection: 'bots_bot',
    },
  );

  return schema;
};
