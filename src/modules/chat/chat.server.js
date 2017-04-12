import { autobind } from 'core-decorators';
import getModels from './models';


export default (ctx) => {
  return class ChatModule {

    async init() {
      this.models = getModels(ctx);
    }
    async run() {
      ctx.app.use('/api/module/chat', this.getApi());
      this.ws = ctx.app.ws('/api/module/chat/message')
        .on('connection', this.onSocket);
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
        // console.log(this.ws, 'this.ws');
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
      api.use('/', wrapResourse(createResourse(Chat)));
      api.use('/message', wrapResourse(createResourse(Message)));
      return api;
    }

    getRoomName(subjectType, subjectId) {
      return `subject_${subjectType}_subjectId_${subjectId}`;
    }

    emit(room, message, emitAction = 'message') {
      // console.log(`Шлю в комнату ${room} сообщение ${message.content}`);
      return this.ws.to(room).emit(emitAction, message);
    }

    @autobind
    onSocket(socket) {
      // console.log('socket connected');
      const { req } = socket;
      const { Message } = this.models;
      if (!req.user || !req.user._id) throw new Error('Not Auth');

      const { subjectType, subjectId } = req.data;
      const roomName = this.getRoomName(subjectType, subjectId);
      socket.join(`user_${req.user.id}`);
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
        return this.emit(roomName, message);
      });
    }
  };
};
