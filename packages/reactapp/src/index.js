if (typeof window !== 'undefined') {
  module.exports = require('./ReactAppClient').default;
} else {
  module.exports = require('./ReactAppServer').default;
}
