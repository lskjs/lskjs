import MongooseSchema from '@lskjs/db/MongooseSchema';

export default () => {
  const schema = new MongooseSchema(
    {
      _type: {
        type: String,
      },
      email: {
        // index: true,
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        // index: true,
        type: String,
        trim: true,
        lowercase: true,
      },
      password: {
        type: 'String',
        default: null,
      },
      name: {
        type: String,
        trim: true,
      },
      info: {
        type: Object,
      },
    },
    {
      model: 'User',
      collection: 'user',
    },
  );

  schema.statics.views = {};
  schema.statics.views.tiny = ['_id', 'name', 'info.avatar'];
  schema.statics.views.default = [...schema.statics.views.tiny];

  return schema;
};
