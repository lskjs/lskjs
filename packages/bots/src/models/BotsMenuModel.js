import MongooseSchema from '@lskjs/db/MongooseSchema';

export default () => {
  const schema = new MongooseSchema(
    {
      key: String,
      content: Object, // { text: String }
      keyboard: Array,
      buttonsLayout: Array,
    },
    {
      model: 'BotsMenu',
      collection: 'bots_menu',
    },
  );

  return schema;
};
