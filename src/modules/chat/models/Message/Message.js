import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
export function getSchema(ctx) {
  const mongoose = ctx.db;
  const schema = new UniversalSchema({
    subjectId: {
      type: String,
      index: true,
    },
    subjectType: {
      type: String,
      default: 'Chat',
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    content: {
      type: Object,
      default: null,
    },
    attachments: {
      type: [Object],
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });

  schema.post('save', function () {
    // @TODO: Убрать захардкоженный ID
    ctx.modules.notification.notify({
      subjectId: this._id,
      subjectType: 'Message',
      objectId: this.user,
      objectType: 'User',
      action: 'message',
      userId: '590446cd993cd10011d7fde3',
    });
  });

  return schema;
}

export default(ctx) => {
  return ctx.db.model('Message', getSchema(ctx).getMongooseSchema(), 'messages');
};
