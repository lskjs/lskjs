import { observable, toJS, computed } from 'mobx';

export default ctx => (

  class UsersStore {

    @observable list = [];

    setData(users) {
      this.list = users.map(obj => new ctx.models.User(obj));
    }

    static async getUsers() {
      const { data } = await ctx.api.fetch('/user/list');
      return data.map(obj => new ctx.models.User(obj));
    }
    static async getUserById(id) {
      const user = await ctx.api.fetch(`/user/${id}`);
      return new ctx.models.User(user);
    }

    async fetchUsers() {
      this.list = await this.constructor.getUsers();
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);
