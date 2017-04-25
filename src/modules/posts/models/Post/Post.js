import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import uniq from 'lodash/uniq';

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
    category: {
      type: String,
      default: 'Общее',
    },
  });
  schema.statics = {
    async getById(_id) {
      const post = await this.findOne({ _id }).populate('user');
      return post;
    },
    async getCategories({ short = false }) {
      const raw = await this.find({}).select('-_id category');
      return short ? uniq(raw.map(o => o.category)) : raw;
    },
  };
  return schema;
}

export default (ctx) => {
  return ctx.db.model('Post', getSchema(ctx).getMongooseSchema(), 'post');
};
