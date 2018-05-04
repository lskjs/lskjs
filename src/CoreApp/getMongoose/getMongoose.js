import mongoose from 'mongoose';

export default async (ctx, params) => {
  const options = {
    keepAlive: true,
    ...(params.options || {}),
  }
  ctx.log.trace('db init');
  mongoose.Promise = Promise;

  mongoose.run = () => {
    ctx.log.trace('db run');
    mongoose.connect(params.uri, options); // , options
    return mongoose;
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
  mongoose.set('debug', params.debug || false);
  return mongoose;
};
