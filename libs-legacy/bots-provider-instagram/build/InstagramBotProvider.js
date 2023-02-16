"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.InstagramBotProvider = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _instagramPrivateApi = require("@buzzguru/instagram-private-api");

var _botsProvider = _interopRequireDefault(require("@lskjs/bots-provider"));

var _err = _interopRequireDefault(require("@lskjs/err"));

var _bluebird = _interopRequireDefault(require("bluebird"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var InstagramBotProvider = /*#__PURE__*/function (_BaseBotProvider) {
  (0, _inherits2["default"])(InstagramBotProvider, _BaseBotProvider);

  var _super = _createSuper(InstagramBotProvider);

  function InstagramBotProvider() {
    var _this;

    (0, _classCallCheck2["default"])(this, InstagramBotProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.client = void 0;
    _this.provider = 'instagram';
    _this.IgApiClient = _instagramPrivateApi.IgApiClient;
    _this.eventTypes = [];
    _this.config = void 0;
    return _this;
  }

  (0, _createClass2["default"])(InstagramBotProvider, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get2["default"])((0, _getPrototypeOf2["default"])(InstagramBotProvider.prototype), "init", this).call(this);

              case 2:
                if (this.config.username) {
                  _context.next = 4;
                  break;
                }

                throw new _err["default"]('!config.username');

              case 4:
                if (this.config.password) {
                  _context.next = 6;
                  break;
                }

                throw new _err["default"]('!config.password');

              case 6:
                this.client = new this.IgApiClient();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this$config, username, password;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.client) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.next = 4;
                return (0, _get2["default"])((0, _getPrototypeOf2["default"])(InstagramBotProvider.prototype), "run", this).call(this);

              case 4:
                _this$config = this.config, username = _this$config.username, password = _this$config.password;
                _context2.next = 7;
                return this.client.state.generateDevice(username);

              case 7:
                _context2.next = 9;
                return this.client.account.login(username, password);

              case 9:
                _context2.next = 11;
                return this.client.simulate.preLoginFlow();

              case 11:
                _context2.next = 13;
                return _bluebird["default"].delay(1);

              case 13:
                _context2.next = 15;
                return this.client.simulate.postLoginFlow();

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return InstagramBotProvider;
}(_botsProvider["default"]);

exports.InstagramBotProvider = InstagramBotProvider;
var _default = InstagramBotProvider;
exports["default"] = _default;
//# sourceMappingURL=InstagramBotProvider.js.map