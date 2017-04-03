import getModels from './models';
export default (ctx) => {
  return class ChatModule {
    getApi() {
      const { isAuth } = ctx.middlewares;
      const api = ctx.asyncRouter();
      const { createResourse, wrapResourse } = ctx.helpers;
      const { Chat, Message } = this;
      api.use('/chat', wrapResourse(createResourse(Chat)));
      api.use('/message', wrapResourse(createResourse(Message)));
      // Все комментарии к этому типу + фильтры
      // GET api/module/comment/User/4ty4578ty45uh
      // GET api/module/comment/Offer/4ty4578ty45uh
      // GET api/module/comment/Chat/4ty4578ty45uh
      api.get('/comment/:subject/:subjectId', isAuth, async (req) => {
        const params = req.allParams();
        return Message.find({
          subject: params.subject,
          subjectId: params.subjectId,
        }); // order populate sort
      });
      // POST /api/module/comment/User/45789ty895ghitu
      // POST /api/module/comment/User/45789ty895ghitu
      // { content: 'Привет!', attachments: [] } //token
       // Написать комментарий
      api.post('/comment/:subject/:subjectId', async (req) => {
        const params = req.allParams();
        const userId = req.user._id;
        params.user = userId;
        // Message.getRole(userId) -> owner
        // Message.is('owner')  // ?
        // Message.roles = {
        //  owner: {
        //    read: ['title', 'createdAt'], // all
        //    write: ['user, 'owner'] // info
        // }
        //  guest: {
        //    read: ['title', 'createdAt'], // all
        //    write: ['user, 'owner'] // null
        // }
        // validate params
        // 1) OWNER
        // 2) Public
        //
        //
        // Message.isOwner = (userId) => { this.ownerId } ['content']
        // Message.canWrite = ['content']
        // MEssage.canWrite = ['content']
        //
        // schema = {
        //   title: {
        //     canWrite: () => {}
        //   }
        // }
        const comment = new Message(params);
        return comment.save();
      });
      api.put('/comment/:id', isAuth, async (req) => {
        const params = req.allParams();
        const comment = await Message
        .findById(params.id)
        .then(ctx.helpers._checkNotFound('Comment'));
        // check owner
        // validate params
        Object.assign(comment, params);
        return comment.save();
      }); // Изменить комментарий
      api.delete('/comment/:id', isAuth, async (req) => {
        const params = req.allParams();
        const comment = await Message
        .findById(params.id)
        .then(ctx.helpers._checkNotFound('Comment'));
        // check owner
        return comment.remove()
      }); // Изменить комментарий
      return api;
    }
    runApi() {
      const api = this.getApi();
      ctx.app.use('/api/modules', api);
    }
    async init() {
      // console.log('Init Models from Modules');
      const models = getModels(ctx);
      this.Chat = models.Chat;
      this.Message = models.Message;
      this.runApi();
    }
    async run() {
      return { Chat: this.Chat, Message: this.Message };
    }
  };
};
