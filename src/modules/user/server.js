export default ctx => (
  class {
    async init() {
      this.models = require('./models').default(ctx, this);
      this.controller = require('./controller').default(ctx, this);

      ctx.models.User = this.models.User;
    }

    async run() {
      ctx.app.use('/api/module/user', this.getApi());
    }

    getApi() {
      const api = ctx.asyncRouter();

      api.all('/list', this.controller.list);
      api.all('/length', this.controller.length);
      api.all('/get', this.controller.get);
      api.all('/edit', this.controller.edit);
      api.all('/update', this.controller.update);

      // api.get('/social/data', this.controller.getSocialData);
      // api.get('/social/data/update', this.controller.updateSocialData);

      return api;
    }
  }
);
