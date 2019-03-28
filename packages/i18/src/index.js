if (typeof window !== 'undefined') {
  module.exports = require('./I18.client').default;
} else {
  module.exports = require('./I18.common').default;
}
