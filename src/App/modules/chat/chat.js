import getModels from './models';
export default (ctx) => {
  return class ChatModule {
    getApi() {
      const api = ctx.asyncRouter();
      const { createResourse, wrapResourse } = ctx.helpers;
      api.use('/chat', wrapResourse(createResourse(this.Chat)));
      api.use('/message', wrapResourse(createResourse(this.Message)));
      return api;
    }
    initApi() {
      const api = this.getApi();
      // console.log(api, 'api!');
      ctx.app.use('/api/m', api);
    }
    async init() {
      // console.log('Init Models from Modules');
      const models = getModels(ctx);
      this.Chat = models.Chat;
      this.Message = models.Message;
      this.initApi();
    }
    async run() {
      return { Chat: this.Chat, Message: this.Message };
    }
  };
};
