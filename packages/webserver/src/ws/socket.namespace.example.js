export default (ctx) => {
  const { io } = ctx;
  const namespace = io.of('/chat');
  namespace.use(io.middlewares.reqData);
  namespace.use(io.middlewares.parseUser);
  namespace.use(io.middlewares.socketAsPromised);
  namespace.on('connection', async (socket) => {
    // console.log('Chat connection!')
    const { Message, User } = ctx.models;
    socket.join(`user_${socket.user.id}`);
    socket.on('message', async (params) => {
      if (!params.text || !params.to) {
        return null;
      }
      const message = await Message.create({
        fromUserId: socket.user.id,
        toUserId: params.to,
        text: params.text,
        files: params.files || null,
      });
      namespace.to(`user_${params.to}`).emit('message', message);
      return message;
    });
    // socket.on('getStory', () => Promise.resolve('returned a promise'));
    socket.on('getStory', async (params) => {
      const userId = socket.user.id;
      const opponentId = params.userId;
      // return Promise.resolve('returned a promise')
      return Message.findAll({
        where: {
          $or: [
            {
              fromUserId: userId,
              toUserId: opponentId,
            },
            {
              fromUserId: opponentId,
              toUserId: userId,
            },
          ],
        },
      });
    });
  });
  return io;
};
