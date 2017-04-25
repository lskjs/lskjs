import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';

export function getSchema(ctx) {
  const { db } = ctx;
  const schema = new UniversalSchema({
    user: {
      type: db.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
  });
  schema.statics = {
    async getById(_id) {
      const post = await this.findOne({ _id }).populate('user');
      return post;
    },
  };
  return schema;
}

export default (ctx) => {
  return ctx.db.model('Post', getSchema(ctx).getMongooseSchema(), 'post');
};
