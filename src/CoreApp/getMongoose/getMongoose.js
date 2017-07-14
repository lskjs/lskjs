import mongooseLib from 'mongoose';
import _ from 'lodash';


export default (ctx, params) => {
  ctx.log.trace('db init');
  const mongoose = new mongooseLib.Mongoose();
  const defaultOptions = { server: { socketOptions: { keepAlive: 1 } } };
  const options = _.defaultsDeep({}, defaultOptions, params.options || {});

  mongoose.Promise = ctx.Promise || global.Promise;


  mongoose.run = () => {
    ctx.log.trace('db run');
    return mongoose.createConnection(params.uri, options);
  };
  mongoose.reconnect = () => {
    ctx.log.trace('db reconnect');
    mongoose.disconnect();
    return mongoose.run();
  };

  let reconnectIteration = 0;
  mongoose.connection.on('connected', () => {
    ctx.log.trace('db connected');
    reconnectIteration = 0;
  });
  mongoose.connection.on('error', (err) => {
    ctx.log.error('db error', err);
    const interval = reconnectIteration++ * 2000 + 1000;
    ctx.log.warn(`db reconnect after ${interval} ms`);
    setTimeout(mongoose.reconnect, interval);
  });
  mongoose.connection.on('disconnected', () => {
    ctx.log.trace('db disconnected');
  });

  return mongoose;
};
