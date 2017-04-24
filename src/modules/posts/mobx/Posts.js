import { observable, toJS, computed } from 'mobx';

export default (ctx, module) => (

  class PostsStore {

    @observable list = [];
    @observable previousOffset = 0;

    setData(data) {
      this.list = data.map(obj => new module.stores.Post(obj));
    }

    static async getPosts(qs) {
      const { data } = await ctx.api.fetch('/api/module/posts', { qs });
      return data.map(obj => new ctx.modules.posts.stores.Post(obj));
    }

    async fetchPosts(limit = 0, offset = this.list.length) {
      if (offset !== 0 && this.previousOffset === offset) {
        ctx.log.info('Posts with current offset already loaded');
        return false;
      }
      this.previousOffset = offset;
      const posts = await this.constructor.getPosts({ limit, offset });
      if (this.list.length > 0) {
        this.list = this.list.concat(posts);
      } else {
        this.list = posts;
      }
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);
