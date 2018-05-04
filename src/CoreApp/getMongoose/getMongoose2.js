// import mongooseLib from 'mongoose';
import mongoose from 'mongoose';
import _ from 'lodash';
// import Promise from 'bluebird';
process.on("unhandledRejection", function(p, why){
    console.log("FOUND ERROR!!!!", p , why);
});

// console.log('mongoose', mongoose);
export default async (ctx, params) => {
  ctx.log.trace('db init');
  // const mongoose = new mongooseLib.Mongoose();

  const defaultOptions = {
    keepAlive: true,
    // server: {
    // socketOptions: {
    //   keepAlive: 1
    //  }
    // },
    // useMongoClient: true ,
    //
  };
  const options = _.defaultsDeep({}, defaultOptions, params.options || {});

  // mongoose.Promise = ctx.Promise || global.Promise;
  mongoose.Promise = Promise;

  // console.log('params.uri', params.uri, options);

  const mg = await mongoose.createConnection(params.uri, options);

  // console.log('mg', mg);
  // mg.on('connected', function (){
  //     // console.log('mongoose connected to ');
  // });

  console.log('db init2');

  const testSchema = new  mongoose.Schema({
      test:       { type: String, required: false },
  });
  console.log('db init3');

  const Test = mongoose.model('Test', testSchema);
  console.log('db init4');

  const test = new Test({
    test: 'a b c d'
  })
  console.log('db init5', test);

  const promise = test.save(() => {
    console.log('saved');
  })
  console.log('db init promise', promise);
  // console.log();
  await promise;
  console.log('db init6');

  return new Promise((qwe, reject) => {
    setTimeout(() => {
      reject('STOOOOOOP')
    }, 2000);
  });

  throw 'STOOOOOOP'

  mongoose.run = () => {
    ctx.log.trace('db run');
    const connection = mongoose.createConnection(params.uri, options);
    // console.log({connection});
    return connection;
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
