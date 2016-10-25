'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var writeFile = function writeFile(file, contents) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(file, contents, 'utf8', function (err) {
      return err ? reject(err) : resolve();
    });
  });
};

var makeDir = function makeDir(name) {
  return new Promise(function (resolve, reject) {
    (0, _mkdirp2.default)(name, function (err) {
      return err ? reject(err) : resolve();
    });
  });
};

exports.default = { writeFile: writeFile, makeDir: makeDir };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9mcy5qcyJdLCJuYW1lcyI6WyJ3cml0ZUZpbGUiLCJmaWxlIiwiY29udGVudHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsIm1ha2VEaXIiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQTs7OztBQUNBOzs7Ozs7QUFWQTs7Ozs7Ozs7O0FBWUEsSUFBTUEsWUFBWSxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBT0MsUUFBUDtBQUFBLFNBQW9CLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDckUsaUJBQUdMLFNBQUgsQ0FBYUMsSUFBYixFQUFtQkMsUUFBbkIsRUFBNkIsTUFBN0IsRUFBcUM7QUFBQSxhQUFPSSxNQUFNRCxPQUFPQyxHQUFQLENBQU4sR0FBb0JGLFNBQTNCO0FBQUEsS0FBckM7QUFDRCxHQUZxQyxDQUFwQjtBQUFBLENBQWxCOztBQUlBLElBQU1HLFVBQVUsU0FBVkEsT0FBVSxDQUFDQyxJQUFEO0FBQUEsU0FBVSxJQUFJTCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3pELDBCQUFPRyxJQUFQLEVBQWE7QUFBQSxhQUFPRixNQUFNRCxPQUFPQyxHQUFQLENBQU4sR0FBb0JGLFNBQTNCO0FBQUEsS0FBYjtBQUNELEdBRnlCLENBQVY7QUFBQSxDQUFoQjs7a0JBSWUsRUFBRUosb0JBQUYsRUFBYU8sZ0JBQWIsRSIsImZpbGUiOiJmcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LTIwMTYgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJztcblxuY29uc3Qgd3JpdGVGaWxlID0gKGZpbGUsIGNvbnRlbnRzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGZzLndyaXRlRmlsZShmaWxlLCBjb250ZW50cywgJ3V0ZjgnLCBlcnIgPT4gZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKCkpO1xufSk7XG5cbmNvbnN0IG1ha2VEaXIgPSAobmFtZSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBta2RpcnAobmFtZSwgZXJyID0+IGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZSgpKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7IHdyaXRlRmlsZSwgbWFrZURpciB9O1xuIl19