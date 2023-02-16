"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _apiquery2 = _interopRequireDefault(require("./apiquery"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ApiClientWeb = /*#__PURE__*/function (_apiquery) {
  (0, _inherits2["default"])(ApiClientWeb, _apiquery);

  var _super = _createSuper(ApiClientWeb);

  function ApiClientWeb(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ApiClientWeb);
    _this = _super.call(this, props);
    console.log('ApiClientWeb', _this.url); //eslint-disable-line

    if (!_this.url) {
      if (__CLIENT__) {
        _this.url = window.location.origin;
      }

      if (__SERVER__) {
        if (process.env.URL) {
          _this.url = process.env.URL;
        }
      }
    }

    console.log('ApiClientWeb 2', _this.url); //eslint-disable-line

    return _this;
  }

  return ApiClientWeb;
}(_apiquery2["default"]);

exports["default"] = ApiClientWeb;
//# sourceMappingURL=universal.js.map