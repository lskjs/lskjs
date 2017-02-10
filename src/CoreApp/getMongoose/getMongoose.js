import mongooseLib from 'mongoose';
import _ from 'lodash';

export default (ctx, params) => {
  ctx.log.trace('mongoose init');

  const mongoose = new mongooseLib.Mongoose();
  const defaultOptions = { server: { socketOptions: { keepAlive: 1 } } };
  const options = _.defaultsDeep({}, defaultOptions, params.options || {});

  mongoose.Promise = ctx.Promise || global.Promise;

  mongoose.run = () => {
    ctx.log.trace('mongoose run');
    return mongoose.connect(params.uri, options);
  };
  mongoose.reconnect = () => {
    ctx.log.trace('mongoose reconnect');
    mongoose.disconnect();
    mongoose.run();
  };

  let reconnectIteration = 0;
  mongoose.connection.on('connected', () => {
    ctx.log.info('mongoose connected');
    reconnectIteration = 0;
  });
  mongoose.connection.on('error', (err) => {
    ctx.log.error('mongoose error', err);
    const interval = reconnectIteration++ * 2000 + 1000;
    ctx.log.trace(`mongoose reconnect after ${interval} ms`);
    setTimeout(mongoose.reconnect, interval);
  });
  mongoose.connection.on('disconnected', () => {
    ctx.log.trace('mongoose disconnected');
  });

  return mongoose;
};
