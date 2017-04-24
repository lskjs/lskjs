import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';

export function getSchema(ctx) {
  const { db } = ctx;
  const schema = new UniversalSchema({
    user: {
      type: db.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    post: {
      type: db.Schema.Types.ObjectId,
      ref: 'Post',
      index: true,
      required: true,
    },
  });

  schema.statics = {
    async getById(_id) {
      const like = await this
        .find({ _id })
        .populate('post user');

      return like;
    },
    async getByUser(user) {
      const posts = await this
        .find({ user })
        .populate('post')
        .exec()
        .map(i => i.post);

      ctx.log.info(posts);
      return posts;
    },
    async getByPost(post) {
      const users = await this
        .find({ post })
        .populate('user')
        .exec()
        .map(i => i.user);

      ctx.log.info(users);
      return users;
    },
    async getLikesByPost(post) {
      const count = await this.count({ post });
      return count;
    },
    async getLikesByUser(user) {
      const count = await this.count({ user });
      return count;
    },
  };

  return schema;
}

export default (ctx) => {
  return ctx.db.model('Like', getSchema(ctx).getMongooseSchema(), 'like');
};
