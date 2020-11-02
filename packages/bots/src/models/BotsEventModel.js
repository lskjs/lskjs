import MongooseSchema from '@lskjs/db/MongooseSchema';
//
export default () => {
  const schema = new MongooseSchema(
    {
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
    },
    {
      model: 'BotsEvent',
      collection: 'bots_event',
    },
  );

  return schema;
};
