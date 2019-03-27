if (typeof window !== 'undefined') {
  module.exports = require('./ReactApp.client').default;
} else {
  module.exports = require('./ReactApp.server').default;
}
