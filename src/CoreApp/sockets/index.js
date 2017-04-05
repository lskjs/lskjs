import parseUser from './middlewares/parseUser';
// import isAuth from './middleware/isAuth'
import reqData from './middlewares/reqData';
// import addChatNamespace from './namespaces/chat'
import socketAsPromised from 'socket.io-as-promised';

import sockets from 'socket.io';

export default (ctx) => {
  try {
    const ws = sockets();
    ws.middlewares = {
      parseUser: parseUser(ctx),
      reqData: reqData(ctx),
      socketAsPromised: socketAsPromised(),
    };
    ctx.log.debug('ws.middlewares', Object.keys(ws.middlewares));

    ws.usedMiddlewares = [
      ws.middlewares.parseUser,
      ws.middlewares.reqData,
      ws.middlewares.socketAsPromised,
    ];
    ws.atachMiddlwares = (namespace) => {
      (ws.usedMiddlewares).map((middleware) => {
        namespace.use(middleware);
      });
    };
    ws.wrapExpress = (app) => {
      app.ws = (route, callback) => {
        // if (!ws) {
        //   this.log.error('!this.ws');
        //   return null;
        // }
        const namespace = ws.of(route);
        ws.atachMiddlwares(namespace);
        typeof callback === 'function' && ws.on('connection', callback);
        return namespace;
      };
    };
    return ws;
  } catch (err) {
    ctx.log.error('ws init', err);
  }
};
