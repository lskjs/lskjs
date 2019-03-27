if (typeof window !== 'undefined') {
  module.exports = require('./logger.client').default;
} else {
  module.exports = require('./logger.server').default;
}
