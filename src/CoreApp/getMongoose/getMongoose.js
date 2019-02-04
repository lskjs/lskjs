import mongooseLib from 'mongoose';
import Promise from 'bluebird';

export default async (ctx, params = {}) => {
  const { options = {}, uri, debug } = params;
  const defaultOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    // reconnectTries: __DEV__ ? 10000 : 30,
    // reconnectInterval: __DEV__ ? 30000 : 1000, // sets the delay between every retry (milliseconds)
  };
  // console.log('options', options);
  // ctx.log.trace('db.init');
  const mongoose = new mongooseLib.Mongoose();
  mongoose.Promise = Promise;

  mongoose.run = () => {
    if (!uri) throw '!db.uri';
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };
    const dbname = (uri || '').split('@')[1];
    ctx.log.trace('db.connect()', dbname, finalOptions);
    return new Promise((resolve, reject) => {
      return mongoose.connect(uri, finalOptions).then(resolve, reject);
    });
    // return mongoose.connect(uri, finalOptions); // , options
    // return mongoose;
  };
  mongoose.removeModels = () => {
    Object.keys(mongoose.connection.models).forEach((key) => {
      delete mongoose.connection.models[key];
    });
  };
  mongoose.stop = () => {
    mongoose.connection.close();
    mongoose.disconnect();
    mongoose.removeModels();
    return Promise.delay(1000);
  };


  mongoose.reconnect = () => {
    ctx.log.trace('db.reconnect()');
    mongoose.stop();
    return mongoose.run();
  };

  let reconnectIteration = 0;
  mongoose.connection.on('connected', () => {
    ctx.log.trace('db.connected');
    reconnectIteration = 0;
  });
  mongoose.connection.on('error', (err) => {
    ctx.log.error('db.error', err);
    const interval = reconnectIteration++ * 2000 + 1000;
    ctx.log.warn(`db.reconnect after ${interval} ms`);
    setTimeout(mongoose.reconnect, interval);
  });
  mongoose.connection.on('disconnected', () => {
    ctx.log.trace('db.disconnected');
  });
  mongoose.set('debug', debug || false);
  return mongoose;
};
