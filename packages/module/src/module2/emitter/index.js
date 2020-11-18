if (typeof window !== 'undefined') {
  module.exports = require('./emitter.client').default;
} else {
  module.exports = require('./emitter.server').default;
}
