import { autobind } from 'core-decorators';
import getModels from './models';


export default (ctx) => {
  return class ChatModule {

    async init() {
      this.models = getModels(ctx);
    }
    async run() {
      ctx.app.use('/api/module', this.getApi());
      this.ws = ctx.app.ws('/api/module/chat/comments')
        .on('coneection', this.onSocket);
    }

    getApi() {
      const api = ctx.asyncRouter();
      const { isAuth } = ctx.middlewares;
      const { createResourse, wrapResourse } = ctx.helpers;
      const { Chat, Message } = this.models;
      api.get('/message/:subjectType/:subjectId', isAuth, async (req) => {
        const params = req.allParams();
        return Message.find({
          subjectType: params.subjectType,
          subjectId: params.subjectId,
        })
        .populate('user'); // order populate sort
      });
      api.post('/message', async (req) => {
        const params = req.allParams();
        const userId = req.user._id;
        params.user = userId;
        const message = new Message(params);
        await message.save();
        this.emit(
          this.getRoomName(params.subjectType, params.subjectId),
          await Message.populate(message, 'user'),
        );
        return message;
      });
      api.put('/message/:id', isAuth, async (req) => {
        const params = req.allParams();
        const comment = await Message
        .findById(params.id)
        .then(ctx.helpers._checkNotFound('Comment'));
        // check owner
        // validate params
        // Message.setState(params)
        Object.assign(comment, params);
        return comment.save();
      }); // Изменить комментарий
      api.delete('/message/:id', isAuth, async (req) => {
        const params = req.allParams();
        const comment = await Message
        .findById(params.id)
        .then(ctx.helpers._checkNotFound('Comment'));
        // check owner
        return comment.remove();
      }); // Изменить комментарий
      api.use('/chat', wrapResourse(createResourse(Chat)));
      api.use('/message', wrapResourse(createResourse(Message)));
      return api;
    }

    getRoomName(subjectType, subjectId) {
      return `subject_${subjectType}_subjectId_${subjectId}`;
    }

    emit(room, message, emitAction = 'message') {
      return this.ws.to(room).emit(emitAction, message);
    }

    @autobind
    onSocket(socket) {
      console.log('onSocket');
      const { Message } = this.models;

      console.log('socket.user', socket.user);
      // console.log('socket', Object.keys(socket), socket.data, socket.user);

      // // create namespace
      // this.namespace = ctx.app.ws.namespace('/api/module/chat/comments')
      // .on('connection', async (socket) => {
      const { subjectType, subjectId } = socket.data;
      const roomName = this.getRoomName(subjectType, subjectId);
        // console.log('socket connected', socket.user._id);
      if (socket.user && socket.user.id) {
        socket.join(`user_${socket.user.id}`);
      }
      socket.join(roomName);
      socket.on('message', async (data) => {
        const message = new Message({
          ...data,
          subjectType,
          subjectId,
          user: socket.user._id,
        });
        await message.save();
        await Message.populate(message, 'user');
          // console.log(message);
          // console.log(`Шлю в комнату ${roomName} сообщение ${message.content}`);
        return this.emit(roomName, message);
      });
      // })
      // .on('disconnection', async (socket) => {
      //
      // });


      // const socket = ctx.io.getSocket('/api/module/chat/comments');

      // bug fix
      // this.namespace = ctx.io.of('/api/module/chat/comments').on('connection', async (socket) => {
      //   const { subjectType, subjectId } = socket.data;
      //   const roomName = this.getRoomName(subjectType, subjectId);
      //   // console.log('socket connected', socket.user._id);
      //   socket.join(`user_${socket.user.id}`);
      //   socket.join(roomName);
      //   socket.on('message', async (data) => {
      //     const message = new Message({
      //       ...data,
      //       subjectType,
      //       subjectId,
      //       user: socket.user._id,
      //     });
      //     await message.save();
      //     await Message.populate(message, 'user');
      //     // console.log(message);
      //     // console.log(`Шлю в комнату ${roomName} сообщение ${message.content}`);
      //     return this.emit(roomName, message);
      //   });
      // });
      // // middleware
      // this.namespace.use((socket, next) => {
      //   const { query } = socket.handshake;
      //   const req = socket.request;
      //   const res = req.res;
      //   if (!req.query) {
      //     req.query = {};
      //   }
      //   Object.assign(req.query, query);
      //   const { parseToken } = ctx.middlewares;
      //   parseToken(req, res, next);
      // });
      // // // other middlewares
      // ctx.io.atachMiddlwares(this.namespace);
    }
  };
};
