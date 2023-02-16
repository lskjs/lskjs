"use strict";

if (typeof window !== 'undefined') {
  module.exports = require('./socket.io-client.client')["default"];
} else {
  module.exports = require('./socket.io-client.server')["default"];
}
//# sourceMappingURL=index.js.map