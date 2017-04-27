import { observable } from 'mobx';

export default (ctx, mctx) => (

  class NotificationsStore {

    @observable list = [];

    constructor(data) {
      if (data) {
        this.setData(data);
      }
    }

    static async getNotifications() {
      const { data } = await ctx.api.fetch('/api/module/notification');
      return new this(data);
    }

    setData(data) {
      this.list = data;
    }

  }
);
