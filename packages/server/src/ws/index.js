// import parseUser from './middlewares/parseUser';
// import accessLogger from './middlewares/accessLogger';
// // import isAuth from './middleware/isAuth'
import socket2req from './middlewares/socket2req';
// import addChatNamespace from './namespaces/chat'
import socketAsPromised from 'socket.io-as-promised';
import cookieParser from 'cookie-parser';

import sockets from 'socket.io';

export default (ctx) => {
  try {
    const ws = sockets();

    ws.wrapExpressMiddleware = (middleware) => {
      return function (socket, next) {
        middleware(socket.req, socket.res, next);
      };
    };

    ws.middlewares = [
      // expressMiddlewares
      'reqLog',
      'accessLogger',
      'parseToken',
      'parseUser',
    ].reduce((r, name) => ({
      ...r,
      [name]: ws.wrapExpressMiddleware(ctx.middlewares[name]),
    }), {
      // socketio middlewares
      cookieParser: ws.wrapExpressMiddleware(cookieParser()),
      socket2req: socket2req(ctx),
      socketAsPromised: socketAsPromised(),
    });

    ctx.log.debug('WS middlewares', Object.keys(ws.middlewares));

    ws.usedMiddlewares = [
      'socket2req',
      'cookieParser',
      'reqLog',
      'accessLogger',
      'parseToken',
      'parseUser',
      'socketAsPromised',
    ].map(m => ws.middlewares[m]);

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
        // @TODO: may be in middleware
        namespace.originalOn = namespace.on;
        namespace.on = function (event, callback) {
          // console.log('ns.on', event);
          return namespace.originalOn(event, (socket) => {
            // socket.on()
            // ctx.log.debug('WS.' + event, {err});

            // console.log('ns.originalOn', event);
            try {
              return callback(socket);
            } catch (err) {
              ctx.log.error('ws.on error', { err });
              namespace.emit('err', err.message);
              return { err };
            }
          });
        };
        typeof callback === 'function' && ws.on('connection', callback);
        return namespace;
      };
    };
    return ws;
  } catch (err) {
    ctx.log.error('ws init', err);
  }
};
