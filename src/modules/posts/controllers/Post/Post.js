import merge from 'lodash/merge';
import pick from 'lodash/pick';

export default (ctx) => {
  const { Post } = ctx.modules.posts.models;
  const { e500, e404 } = ctx.errors;

  const controller = {};

  controller.all = async (req) => {
    const params = req.allParams();
    const { field = null, order = null } = params;
    let { filters, limit = 0, offset = 0 } = params;
    const sort = (field && order) ? { [field]: order } : {};
    if (offset) offset = parseInt(offset, 10);
    if (limit) limit = parseInt(limit, 10);
    filters = JSON.parse(filters);
    const query = {};
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        query[key] = key === 'user'
          ? filters[key]
          : { $regex: filters[key], $options: 'i' };
      }
    }
    const posts = await Post
      .find(query)
      .sort(sort)
      .limit(limit)
      .skip(offset)
      .populate('user');
    return posts;
  };

  controller.categories = async (req) => {
    const params = req.allParams();
    const categories = await Post.getCategories({ short: params.short });
    return categories;
  };

  controller.create = async (req) => {
    const params = req.allParams();
    const userId = req.user._id;
    params.user = userId;

    const post = new Post(params);
    try {
      await post.save();
      await Post.populate(post, 'user');
    } catch (e) {
      throw e500(e);
    }
    return post;
  };

  controller.get = async (req) => {
    const params = req.allParams();
    const post = await Post.getById(params.id);
    return post;
  };

  controller.edit = async (req) => {
    const params = req.allParams();
    const post = await Post.findById(params.id);
    if (!post) throw e404('Post not found!');
    merge(post, pick(params, ['content']));
    return post.save();
  };

  controller.delete = async (req) => {
    const params = req.allParams();
    const post = await Post.findById(params.id);
    if (!post) throw e404('Post not found!');
    return post.remove();
  }

  return controller;
};
