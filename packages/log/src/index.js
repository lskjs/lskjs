if (typeof window !== 'undefined') {
  module.exports = { default: require('./logger.client').default };
} else {
  module.exports = { default: require('./logger.server').default };
}
