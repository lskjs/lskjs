if (typeof window !== 'undefined') {
  module.exports = require('./Config').default;
} else {
  module.exports = require('./Config.server').default;
}
