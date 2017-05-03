export default (ctx) => {
  return {
    init() {
      this.components = require('./components').default(ctx);
      this.stores = require('./mobx').default(ctx);
    },
    async run() {
      this.notificationStore = __CLIENT__ ? await this.stores.Notifications.getNotifications() : { list: [] };
    },
  };
};
