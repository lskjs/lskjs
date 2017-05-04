export default (ctx) => {
  return {
    init() {
      this.components = require('./components').default(ctx);
      this.stores = require('./mobx').default(ctx);
    },
    async run() {
      this.notificationStore = await this.stores.NotificationStore.getNotificationStore();
      if (__CLIENT__) {
        this.notificationStore.init();
      }
      //
      // if (relogin) LOGIC HERE
      // this.notificationStore.reinit()
    },
  };
};
