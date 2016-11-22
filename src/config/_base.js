/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'
const pkg = require('../../package.json')

const config = {
  name: pkg.name,
  client: require('./index.client').default,
  env : process.env.NODE_ENV || process.env.ENV || 'development',
  port : process.env.PORT || 8080,
  host: 'localhost',
  db: {
    uri: 'mongodb://publicdb.mgbeta.ru/chat',
    options: {},
  },
  jwt: {
    secret: 'secretSecret',
  }
}

  // env : process.env.NODE_ENV || process.env.ENV || 'development',
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !process.env.NODEBUG,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

export default config
