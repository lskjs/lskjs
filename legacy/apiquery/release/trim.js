"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = trim;

function trim(initialStr) {
  var begin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var symbol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  if (initialStr == null) return initialStr;
  var str = initialStr;

  if (end && str[str.length - 1] === symbol) {
    str = str.substr(0, str.length - 1);
  }

  if (begin && str[0] === symbol) {
    str = str.substr(1);
  }

  if (str !== initialStr) return trim(str, begin, end, symbol);
  return str;
}
//# sourceMappingURL=trim.js.map