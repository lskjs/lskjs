// import parseUser from './middlewares/parseUser';
// import accessLogger from './middlewares/accessLogger';
// // import isAuth from './middleware/isAuth'
// import addChatNamespace from './namespaces/chat'
import socketAsPromised from 'socket.io-as-promised';
import cookieParser from 'cookie-parser';
import sockets from 'socket.io';
import socket2req from './middlewares/socket2req';

export default (app) => {
  try {
    const ws = sockets();

    ws.wrapExpressMiddleware = middleware => function (socket, next) {
      middleware(socket.req, socket.res, next);
    };

    ws.middlewares = [
      // expressMiddlewares
      'reqLog',
      'accessLogger',
      'parseToken',
      'parseUser',
    ].reduce((r, name) => ({
      ...r,
      [name]: ws.wrapExpressMiddleware(app.middlewares[name]),
    }), {
      // socketio middlewares
      cookieParser: ws.wrapExpressMiddleware(cookieParser()),
      socket2req: socket2req(app),
      socketAsPromised: socketAsPromised(),
    });

    app.log.debug('WS middlewares', Object.keys(ws.middlewares));

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
      ws.usedMiddlewares.map(middleware => namespace.use(middleware));
    };
    ws.wrapExpress = (express) => {
      express.ws = (route, callback) => { // eslint-disable-line no-param-reassign
        // if (!ws) {
        //   this.log.error('!this.ws');
        //   return null;
        // }
        const namespace = ws.of(route);
        ws.atachMiddlwares(namespace);
        // @TODO: may be in middleware
        namespace.originalOn = namespace.on;
        namespace.on = function (event, nsCallback) {
          // console.log('ns.on', event);
          return namespace.originalOn(event, (socket) => {
            // socket.on()
            // app.log.debug('WS.' + event, {err});

            // console.log('ns.originalOn', event);
            try {
              return nsCallback(socket);
            } catch (err) {
              app.log.error('ws.on error', { err });
              namespace.emit('err', err.message);
              return { err };
            }
          });
        };
        if (typeof callback === 'function') ws.on('connection', callback);
        return namespace;
      };
    };
    return ws;
  } catch (err) {
    app.log.error('ws init', err);
  }
};
