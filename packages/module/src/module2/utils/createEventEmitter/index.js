if (typeof window !== 'undefined') {
  module.exports = require('./createEventEmitter.client').default;
} else {
  module.exports = require('./createEventEmitter.server').default;
}
