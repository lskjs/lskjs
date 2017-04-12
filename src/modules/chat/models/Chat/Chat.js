import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
export function getSchema(ctx) {
  const mongoose = ctx.db;
  const schema = new UniversalSchema({
    type: {
      type: String,
      enum: ['ME', 'PRIVATE', 'GROUP'],
      index: true,
    },
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    status: {
      type: String,
    },
  }, {
    timestamps: true,
  });

  return schema;
}

export default(ctx) => {
  return ctx.db.model('Chat', getSchema(ctx).getMongooseSchema(), 'chats');
};
