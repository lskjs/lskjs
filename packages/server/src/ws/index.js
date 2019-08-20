// import parseUser from './middlewares/parseUser';
// // import accessLogger from './middlewares/accessLogger';
// // import isAuth from './middleware/isAuth'
// import addChatNamespace from './namespaces/chat'
import socketAsPromised from 'socket.io-as-promised';
import cookieParser from 'cookie-parser';
import sockets from 'socket.io';
import isFunction from 'lodash/isFunction';
import socket2req from './middlewares/socket2req';

export default (app) => {
  try {
    const ws = sockets();

    ws.wrapExpressMiddleware = (middleware, name) => function (socket, next) {
      // console.log('wrapExpressMiddleware ', socket, next);
      if (!isFunction(middleware)) {
        console.log('wrapExpressMiddleware middleware is not function ', name);
        console.log('middleware ', middleware);
        console.log('typeof  middleware', typeof middleware);
        return null;
      }
      // console.log('socket.req', socket.req)
      // console.log('socket.res', socket.res)

      middleware(socket.req, socket.res, next);
    };

    ws.middlewares = [
      // expressMiddlewares
      'reqLog',
      // 'accessLogger',
      'parseToken',
      'parseUser',
    ].reduce((r, name) => ({
      ...r,
      [name]: ws.wrapExpressMiddleware(app.middlewares[name], name),
    }), {
      // socketio middlewares
      cookieParser: ws.wrapExpressMiddleware(cookieParser(), 'cookieParser'),
      socket2req: socket2req(app),
      socketAsPromised: socketAsPromised(),
    });

    app.log.debug('WS middlewares', Object.keys(ws.middlewares));

    ws.usedMiddlewares = [
      'socket2req',
      // 'cookieParser',
      // 'reqLog',
      // // 'accessLogger',
      // 'parseToken',
      // 'parseUser',
      // 'socketAsPromised',
    ].map(m => ws.middlewares[m]).filter(m => m);

    ws.atachMiddlwares = (namespace) => {
      ws.usedMiddlewares.map(middleware => middleware && namespace.use(middleware));
    };
    ws.wrapExpress = (express) => {
      express.ws = (route, callback) => { // eslint-disable-line no-param-reassign
        // console.log('express WS', route);
        
        // if (!ws) {
        //   this.log.error('!this.ws');
        //   return null;
        // }
        const namespace = ws.of(route);
        // namespace.use((socket, next) => {
        //   console.log(12312312);
        //   next();
        // });
        // ws.atachMiddlwares(namespace);
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
