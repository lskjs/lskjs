import { observable, toJS, computed } from 'mobx';
import clone from 'lodash/clone';

export default ctx => (

  class UsersStore {

    @observable list = [];
    @observable length = 0;
    @observable previousOffset = 0;

    setData(users) {
      this.list = users.map(obj => new ctx.models.User(obj));
    }

    static async getUsers(qs) {
      const { data } = await ctx.api.fetch('user/list', { qs });
      return data.map(obj => new ctx.models.User(obj));
    }

    static async getUsersLength() {
      const { data } = await ctx.api.fetch('user/length');
      return data;
    }

    static async getUserById(id) {
      const user = await ctx.api.fetch(`user/${id}`);
      return new ctx.models.User(user);
    }

    async fetchUsersLength() {
      const { count } = await this.constructor.getUsersLength();
      this.length = count;
    }

    async fetchUsers(limit = 0, offset = this.list.length) {
      if (offset !== 0 && this.previousOffset === offset) {
        ctx.log.info('Users with current offset already loaded');
        return false;
      }
      this.previousOffset = offset;
      const users = await this.constructor.getUsers({ limit, offset });
      if (this.list.length > 0) {
        this.list = this.list.concat(users);
      } else {
        this.list = users;
      }
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);
