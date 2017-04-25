import { observable, toJS, computed } from 'mobx';

export default (ctx, module) => (

  class PostsStore {

    @observable list = [];
    @observable previousOffset = 0;
    @observable sortField = '';
    @observable sortOrder = '';
    @observable filters = {};
    @observable loading = false;

    setData(data) {
      this.list = data.map(obj => new module.stores.Post(obj));
    }

    static async getPosts(qs) {
      const { data } = await ctx.api.fetch('/api/module/posts', { qs });
      return data.map(obj => new ctx.modules.posts.stores.Post(obj));
    }

    static async getCategories() {
      const { data } = await ctx.api.fetch('/api/module/posts/categories');
      return data;
    }

    async sortPosts(field, order) {
      this.loading = true;
      this.sortField = field;
      this.sortOrder = order;
      this.list = [];
      await this.fetchPosts(20, 0);
    }

    async filterPosts(filters) {
      this.loading = true;
      this.filters = filters;
      this.list = [];
      await this.fetchPosts(20, 0);
    }

    async clearFilters() {
      this.loading = true;
      this.filters = {};
      this.list = [];
      await this.fetchPosts(20, 0);
    }

    async fetchPosts(limit = 0, offset = this.list.length) {
      if (offset !== 0 && this.previousOffset === offset) {
        ctx.log.info('Posts with current offset already loaded');
        return false;
      }
      this.loading = true;
      this.previousOffset = offset;
      const posts = await this.constructor.getPosts({
        limit,
        offset,
        field: this.sortField,
        order: this.sortOrder,
        filters: JSON.stringify(this.filters),
      });
      if (this.list.length > 0) {
        this.list = this.list.concat(posts);
      } else {
        this.list = posts;
      }
      this.loading = false;
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);
