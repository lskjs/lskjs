'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WebpackServerConfig = require('./WebpackServerConfig');

var _WebpackServerConfig2 = _interopRequireDefault(_WebpackServerConfig);

var _WebpackClientConfig = require('./WebpackClientConfig');

var _WebpackClientConfig2 = _interopRequireDefault(_WebpackClientConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {
  var client = new _WebpackClientConfig2.default(ctx);
  var server = new _WebpackServerConfig2.default(ctx);
  return [client.getConfig(), server.getConfig()];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXRXZWJwYWNrQ29uZmlnLmpzIl0sIm5hbWVzIjpbImN0eCIsImNsaWVudCIsInNlcnZlciIsImdldENvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUNlLFVBQUNBLEdBQUQsRUFBUztBQUN0QixNQUFNQyxTQUFTLGtDQUF3QkQsR0FBeEIsQ0FBZjtBQUNBLE1BQU1FLFNBQVMsa0NBQXdCRixHQUF4QixDQUFmO0FBQ0EsU0FBTyxDQUFDQyxPQUFPRSxTQUFQLEVBQUQsRUFBcUJELE9BQU9DLFNBQVAsRUFBckIsQ0FBUDtBQUNELEMiLCJmaWxlIjoiZ2V0V2VicGFja0NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJwYWNrU2VydmVyQ29uZmlnIGZyb20gJy4vV2VicGFja1NlcnZlckNvbmZpZydcbmltcG9ydCBXZWJwYWNrQ2xpZW50Q29uZmlnIGZyb20gJy4vV2VicGFja0NsaWVudENvbmZpZydcbmV4cG9ydCBkZWZhdWx0IChjdHgpID0+IHtcbiAgY29uc3QgY2xpZW50ID0gbmV3IFdlYnBhY2tDbGllbnRDb25maWcoY3R4KVxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgV2VicGFja1NlcnZlckNvbmZpZyhjdHgpXG4gIHJldHVybiBbY2xpZW50LmdldENvbmZpZygpLCBzZXJ2ZXIuZ2V0Q29uZmlnKCldO1xufVxuIl19