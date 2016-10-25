'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              return _http2.default.get(url, function (res) {
                return resolve(res);
              }).on('error', function (err) {
                return reject(err);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9mZXRjaC5qcyJdLCJuYW1lcyI6WyJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldCIsInJlcyIsIm9uIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQTs7Ozs7OzJjQVRBOzs7Ozs7Ozs7O3VEQVdlLGlCQUFPQSxHQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FBZSxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEscUJBQ3RDLGVBQUtDLEdBQUwsQ0FBU0osR0FBVCxFQUFjO0FBQUEsdUJBQU9FLFFBQVFHLEdBQVIsQ0FBUDtBQUFBLGVBQWQsRUFBbUNDLEVBQW5DLENBQXNDLE9BQXRDLEVBQStDO0FBQUEsdUJBQU9ILE9BQU9JLEdBQVAsQ0FBUDtBQUFBLGVBQS9DLENBRHNDO0FBQUEsYUFBWixDQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC0yMDE2IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAodXJsKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgIGh0dHAuZ2V0KHVybCwgcmVzID0+IHJlc29sdmUocmVzKSkub24oJ2Vycm9yJywgZXJyID0+IHJlamVjdChlcnIpKVxuKTtcbiJdfQ==