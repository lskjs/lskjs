import MongooseSchema from '@lskjs/db/MongooseSchema';

export default () => {
  const schema = new MongooseSchema(
    {
      _type: {
        type: String,
      },
      role: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      password: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      info: {
        type: Object,
      },
      meta: {
        type: Object,
      },
    },
    {
      model: 'User',
      collection: 'user',
    },
  );

  schema.statics.views = {};
  schema.statics.views.tiny = ['_id', 'role', 'name', 'avatar'];
  schema.statics.views.default = [...schema.statics.views.tiny];
  // schema.statics.views.owner = [...schema.statics.views.default, 'email', 'phone', 'info', 'meta'];

  return schema;
};
