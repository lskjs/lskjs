import { observable } from 'mobx';
import set from 'lodash/set';

export default ctx => (

  class PostModel {

    @observable _id;
    @observable content;
    @observable category;

    constructor(data) {
      if (data) {
        this.setData(data);
      }
    }

    static async getById(id) {
      const { data } = await ctx.api.fetch(`/api/module/posts/${id}`);
      return new this(data);
    }

    static async editById(id, body) {
      const { data } = await ctx.api.fetch(`/api/module/posts/${id}`, {
        method: 'PUT',
        body,
      });
      return data;
    }

    static async deleteById(id) {
      await ctx.api.fetch(`/api/module/posts/${id}`, {
        method: 'DELETE',
      });
    }

    setData(data) {
      for (const item in data) {
        if (item === 'user') {
          set(this, item, new ctx.models.User(data[item]));
        } else {
          set(this, item, data[item]);
        }
      }
    }

    async edit(data) {
      await this.constructor.editById(this._id, data);
      this.setData(data);
    }

    async remove() {
      await this.constructor.deleteById(this._id);
    }

  }

);

