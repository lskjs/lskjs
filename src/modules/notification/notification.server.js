import getModels from './models';

export default (ctx) => {
  return class NotificationModule {

    async init() {
      this.models = getModels(ctx);
      this.config = ctx.config.rating;
    }
    async run() {
      ctx.app.use('/api/module/notification', this.getApi());
    }

    getApi() {
      const api = ctx.asyncRouter();
      const { isAuth } = ctx.middlewares;
      const { Notification } = this.models;
      // Поиск
      api.get('/', isAuth, async (req) => {
        const userId = req.user._id;
        const params = req.allParams();
        let notifications = await Notification.find({
          userId,
          ...params,
        });
        notifications = await Promise.all(notifications.map((notification) => {
          return new Promise(async (resolve) => {
            try {
              await Notification.populate(notification, 'user');
            } catch (err) {}
            try {
              await Notification.populate(notification, 'object');
            } catch (err) {}
            try {
              await Notification.populate(notification, 'subject');
            } catch (err) {}
            return resolve(notification);
          });
        }));
        return notifications;
      });
      api.post('/', isAuth, async (req) => {
        const params = req.allParams();
        const notification = new Notification(params);
        return notification.save();
      });
      api.post('/view/:id', isAuth, async (req) => {
        // const userId = req.user._id;
        const notification = await Notification
        .findById(req.params.id)
        .then(ctx.helpers.checkNotFound);
        if (notification.viewedAt) return notification;
        notification.viewedAt = new Date();
        return notification.save();
      });
      api.put('/:id', isAuth, async (req) => {
        const params = req.allParams();
        const comment = await Notification
        .findById(params.id)
        .then(ctx.helpers.checkNotFound);
        Object.assign(comment, params);
        return comment.save();
      });
      api.delete('/:id', isAuth, async (req) => {
        const params = req.allParams();
        const notification = await Notification
        .findById(params.id)
        .then(ctx.helpers.checkNotFound);
        return notification.remove();
      });
      return api;
    }
  };
};
