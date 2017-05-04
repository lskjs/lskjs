import { observable } from 'mobx';
import { autobind } from 'core-decorators';

export default (ctx, mctx) => (

  class NotificationStore {

    @observable list = [];

    constructor(data) {
      if (data) this.setData(data);
    }

    setData(data) {
      this.list = data;
    }

    async init() {
      if (__SERVER__) return;
      const isAuth = await ctx.auth.isAuthAsync();
      if (!isAuth) return;
      this.socket = ctx.api.ws('module/notification');
      this.socket.on('notification', this.onNotification);
    }

    // getNotificationStore
    static async getNotificationStore({ limit = 10 } = {}) {
      const isAuth = await ctx.auth.isAuthAsync();
      let notifications = [];
      if (isAuth) {
        const { data } = await ctx.api.fetch('/api/module/notification');
        notifications = data.slice(0, limit); // TODO: СДелать потом по нормальному на сервере
        // notifications = data.map((e) => {
        //   e.action = this.convertAction(e.action);
        //   return e;
        // });
      }
      return new this(notifications);
    }

    static convertAction(e) {
      switch (e) {
        case 'message': return 'Новое сообщение';
        case 'like_message': return 'Понравилось ваше сообщение';
        default: return e;
      }
    }


    @autobind
    async onNotification(n) {
      // ctx.log.info('onNotification', n);
      n.action = this.constructor.convertAction(n.action);
      this.list.push(n);

      global.toast && global.toast({
        title: this.constructor.convertAction(n.action),
        // text: 123123123,
        text: n.subject && n.subject.content || 'Текст сообщения',
        type: 'info',
      });
    }

  }
);
