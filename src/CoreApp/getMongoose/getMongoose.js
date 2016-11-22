import mongooseLib from 'mongoose'
import _ from 'lodash'

export default (ctx, params) => {
  ctx.log.trace('mongoose init')

  const mongoose = new mongooseLib.Mongoose()
  const defaultOptions = { server: { socketOptions: { keepAlive: 1 } } }
  const options = _.defaultsDeep({}, defaultOptions, params.options || {})

  mongoose.Promise = ctx.Promise || global.Promise

  mongoose.run = () => {
    ctx.log.trace('mongoose run')
    return mongoose.connect(params.uri, options)
  }
  mongoose.connection.on('connected', () =>  {
    ctx.log.info('mongoose connected')
  });
  mongoose.connection.on('error',  (err) => {
    ctx.log.error('mongoose error', err)
  });
  mongoose.connection.on('disconnected',  () =>  {
    ctx.log.warn('mongoose disconnected')
    mongoose.run()
  });

  return mongoose
}
