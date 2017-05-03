import { observable } from 'mobx';
import { autobind } from 'core-decorators';

export default (ctx, mctx) => (

  class NotificationsStore {

    @observable list = [];

    constructor(data) {
      if (data) this.setData(data);
      this.connect();
      this.listen();
    }

    static async getNotifications() {
      const isAuth = await ctx.auth.isAuthAsync();
      let store = { list: [] };
      if (isAuth) {
        const { data } = await ctx.api.fetch('/api/module/notification');
        const notifications = data.map((e) => {
          e.action = this.convertAction(e.action);
          return e;
        });
        store = new this(notifications);
      }
      return store;
    }

    static convertAction(e) {
      switch (e) {
        case 'like_message': return 'Понравилось ваше сообщение';
        default: return e;
      }
    }

    setData(data) {
      this.list = data;
    }

    async connect() {
      const isAuth = await ctx.auth.isAuthAsync();
      let socket = null;
      if (isAuth) socket = ctx.api.ws('module/notification');
      this.socket = socket;
      return socket;
    }

    listen() {
      if (this.socket) this.socket.on('notification', this.onNotification);
    }

    @autobind
    async onNotification(n) {
      ctx.log.info('onNotification', n);
      n.action = this.constructor.convertAction(n.action);
      this.list.push(n);
      global.toast && global.toast({
        title: 'Уведомление!',
        text: n.action,
      });
    }

  }
);
