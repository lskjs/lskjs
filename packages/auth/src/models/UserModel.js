import MongooseSchema from '@lskjs/db/MongooseSchema';

export default () => {
  const schema = new MongooseSchema(
    {
      role: {
        type: String,
      },
      email: {
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
      profile: {
        type: Object,
      },
      info: {
        type: Object,
      },
      private: {
        type: Object,
      },
      statuses: {
        signinAt: {
          type: Date,
        },
        editAt: {
          type: Date,
        },
        activityAt: {
          type: Date,
        },
        passwordAt: {
          type: Date,
        },
      },
    },
    {
      model: 'User',
      collection: 'user',
    },
  );
  schema.methods.setStatus = async function (statusName) {
    if (!this.statuses) this.statuses = {};
    this.statuses[statusName] = new Date();
    this.markModified(`statuses.${statusName}`);
  };

  schema.statics.views = {};
  schema.statics.views.tiny = ['_id', 'role', 'name', 'avatar'];
  schema.statics.views.default = [...schema.statics.views.tiny];
  // schema.statics.views.owner = [...schema.statics.views.default, 'email', 'phone', 'info', 'meta'];

  return schema;
};
