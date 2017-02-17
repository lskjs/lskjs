import parseUser from './middlewares/parseUser';
// import isAuth from './middleware/isAuth'
import reqData from './middlewares/reqData';
// import addChatNamespace from './namespaces/chat'
import socketAsPromised from 'socket.io-as-promised';

import sockets from 'socket.io';

export default (ctx) => {
  try {
    const io = sockets();
    // console.log({io}, ctx.httpServer);
    // io.serveClient(false);
    // io.attach(ctx.httpServer);
    io.middlewares = {
      parseUser: parseUser(ctx),
      reqData: reqData(ctx),
      socketAsPromised: socketAsPromised(),
    };
    io.usedMiddlewares = [
      io.middlewares.parseUser,
      io.middlewares.reqData,
      io.middlewares.socketAsPromised,
    ];
    io.atachMiddlwares = (namespace) => {
      (io.usedMiddlewares).map((middleware) => {
        namespace.use(middleware);
      });
    };
    return io;
  } catch (err) {
    console.log('err', err);
  }
};
