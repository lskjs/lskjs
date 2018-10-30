"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerJuice = _interopRequireDefault(require("nodemailer-juice"));

var _parser = _interopRequireDefault(require("./parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = function _default(ctx) {
  var Parser = (0, _parser.default)(ctx);
  return (
    /*#__PURE__*/
    function () {
      function Mailer() {
        _classCallCheck(this, Mailer);
      }

      _createClass(Mailer, [{
        key: "getTemplates",
        value: function getTemplates() {
          return require('./templates').default(ctx);
        }
      }, {
        key: "init",
        value: function () {
          var _init = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // nodemailer
                    this.config = (0, _get.default)(ctx, 'config.mailer');
                    this.templates = this.getTemplates();
                    this.transporter = this.getTransporter();
                    this.parser = new Parser(); //parser

                    _context.next = 6;
                    return this.parser.init();

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function init() {
            return _init.apply(this, arguments);
          };
        }()
      }, {
        key: "getTransporter",
        value: function getTransporter() {
          return this.config && this.config.transport && Promise.promisifyAll(_nodemailer.default.createTransport(this.config.transport));
        }
      }, {
        key: "run",
        value: function () {
          var _run = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (this.transporter && this.config.juice) {
                      // нельзя прогонять через эту херню html который уже покрыт inline css
                      this.transporter.use('compile', (0, _nodemailerJuice.default)());
                    }

                    _context2.next = 3;
                    return this.parser.run();

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function run() {
            return _run.apply(this, arguments);
          };
        }() // Отправить email

      }, {
        key: "send",
        value: function () {
          var _send = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(args) {
            var to, template, _args$params, params, _args$options, options, tFunc, locale, otherProps, t, args2, emailTemplate, defaultOptions, html, text, sendOptions;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    to = args.to, template = args.template, _args$params = args.params, params = _args$params === void 0 ? {} : _args$params, _args$options = args.options, options = _args$options === void 0 ? {} : _args$options, tFunc = args.t, locale = args.locale, otherProps = _objectWithoutProperties(args, ["to", "template", "params", "options", "t", "locale"]);
                    t = tFunc ? tFunc : ctx.i18 && ctx.i18.getFixedT && ctx.i18.getFixedT(locale || 'en') || function (a) {
                      return a;
                    };
                    _context3.prev = 2;

                    if (to) {
                      _context3.next = 5;
                      break;
                    }

                    throw '!to email';

                  case 5:
                    if (template) {
                      _context3.next = 7;
                      break;
                    }

                    throw '!template';

                  case 7:
                    if (this.transporter) {
                      _context3.next = 9;
                      break;
                    }

                    throw '!transporter';

                  case 9:
                    if (this.templates[template]) {
                      _context3.next = 11;
                      break;
                    }

                    throw 'cant find email template ' + template;

                  case 11:
                    // Ищем шаблон
                    // Шаблон это класс, создаем экземпляр
                    args2 = _objectSpread({
                      ctx: ctx,
                      t: t,
                      locale: locale,
                      params: params
                    }, otherProps);
                    emailTemplate = new this.templates[template](args2); // вызываем render

                    defaultOptions = emailTemplate.getOptions(args2);
                    html = emailTemplate.getHtml(args2);
                    text = emailTemplate.getText && emailTemplate.getText(args2) || '';
                    sendOptions = Object.assign({}, this.config.options, defaultOptions, options);
                    sendOptions.to = to;
                    sendOptions.html = html;
                    sendOptions.text = text;
                    _context3.next = 22;
                    return this.transporter.sendMail(sendOptions);

                  case 22:
                    return _context3.abrupt("return", _context3.sent);

                  case 25:
                    _context3.prev = 25;
                    _context3.t0 = _context3["catch"](2);
                    throw _context3.t0;

                  case 28:
                    return _context3.abrupt("return", null);

                  case 29:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[2, 25]]);
          }));

          return function send(_x) {
            return _send.apply(this, arguments);
          };
        }()
      }, {
        key: "sendText",
        value: function () {
          var _sendText = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4(to, subject, message, from) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!from) from = ctx.config.mailer.options.from;
                    _context4.prev = 1;
                    _context4.next = 4;
                    return this.transporter.sendMail({
                      to: to,
                      subject: subject,
                      text: message,
                      from: from
                    });

                  case 4:
                    return _context4.abrupt("return", _context4.sent);

                  case 7:
                    _context4.prev = 7;
                    _context4.t0 = _context4["catch"](1);
                    throw _context4.t0;

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[1, 7]]);
          }));

          return function sendText(_x2, _x3, _x4, _x5) {
            return _sendText.apply(this, arguments);
          };
        }()
      }]);

      return Mailer;
    }()
  );
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiY3R4IiwiUGFyc2VyIiwicmVxdWlyZSIsImRlZmF1bHQiLCJjb25maWciLCJ0ZW1wbGF0ZXMiLCJnZXRUZW1wbGF0ZXMiLCJ0cmFuc3BvcnRlciIsImdldFRyYW5zcG9ydGVyIiwicGFyc2VyIiwiaW5pdCIsInRyYW5zcG9ydCIsIlByb21pc2UiLCJwcm9taXNpZnlBbGwiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwianVpY2UiLCJ1c2UiLCJydW4iLCJhcmdzIiwidG8iLCJ0ZW1wbGF0ZSIsInBhcmFtcyIsIm9wdGlvbnMiLCJ0RnVuYyIsInQiLCJsb2NhbGUiLCJvdGhlclByb3BzIiwiaTE4IiwiZ2V0Rml4ZWRUIiwiYSIsImFyZ3MyIiwiZW1haWxUZW1wbGF0ZSIsImRlZmF1bHRPcHRpb25zIiwiZ2V0T3B0aW9ucyIsImh0bWwiLCJnZXRIdG1sIiwidGV4dCIsImdldFRleHQiLCJzZW5kT3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInNlbmRNYWlsIiwic3ViamVjdCIsIm1lc3NhZ2UiLCJmcm9tIiwibWFpbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUNlLGtCQUFDQSxHQUFELEVBQVM7QUFDdEIsTUFBTUMsU0FBUyxxQkFBVUQsR0FBVixDQUFmO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1Q0FDaUI7QUFDYixpQkFBT0UsUUFBUSxhQUFSLEVBQXVCQyxPQUF2QixDQUErQkgsR0FBL0IsQ0FBUDtBQUNEO0FBSEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLSTtBQUNBLHlCQUFLSSxNQUFMLEdBQWMsa0JBQUlKLEdBQUosRUFBUyxlQUFULENBQWQ7QUFDQSx5QkFBS0ssU0FBTCxHQUFpQixLQUFLQyxZQUFMLEVBQWpCO0FBQ0Es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dGVudCI6WyJpbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgaW5saW5lQ3NzIGZyb20gJ25vZGVtYWlsZXItanVpY2UnO1xuaW1wb3J0IGdldFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5leHBvcnQgZGVmYXVsdCAoY3R4KSA9PiB7XG4gIGNvbnN0IFBhcnNlciA9IGdldFBhcnNlcihjdHgpO1xuICByZXR1cm4gY2xhc3MgTWFpbGVyIHtcbiAgICBnZXRUZW1wbGF0ZXMoKSB7XG4gICAgICByZXR1cm4gcmVxdWlyZSgnLi90ZW1wbGF0ZXMnKS5kZWZhdWx0KGN0eCk7XG4gICAgfVxuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAvLyBub2RlbWFpbGVyXG4gICAgICB0aGlzLmNvbmZpZyA9IGdldChjdHgsICdjb25maWcubWFpbGVyJyk7XG4gICAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMuZ2V0VGVtcGxhdGVzKCk7XG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gdGhpcy5nZXRUcmFuc3BvcnRlcigpO1xuICAgICAgdGhpcy5wYXJzZXIgPSBuZXcgUGFyc2VyKCk7XG4gICAgICAvL3BhcnNlclxuICAgICAgYXdhaXQgdGhpcy5wYXJzZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGdldFRyYW5zcG9ydGVyKCkge1xuICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy50cmFuc3BvcnQpXG4gICAgICAgICYmIFByb21pc2UucHJvbWlzaWZ5QWxsKG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHRoaXMuY29uZmlnLnRyYW5zcG9ydCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHJ1bigpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zcG9ydGVyICYmIHRoaXMuY29uZmlnLmp1aWNlKSB7XG4gICAgICAgIC8vINC90LXQu9GM0LfRjyDQv9GA0L7Qs9C+0L3Rj9GC0Ywg0YfQtdGA0LXQtyDRjdGC0YMg0YXQtdGA0L3RjiBodG1sINC60L7RgtC+0YDRi9C5INGD0LbQtSDQv9C+0LrRgNGL0YIgaW5saW5lIGNzc1xuICAgICAgICB0aGlzLnRyYW5zcG9ydGVyLnVzZSgnY29tcGlsZScsIGlubGluZUNzcygpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMucGFyc2VyLnJ1bigpO1xuICAgIH1cblxuICAgIC8vINCe0YLQv9GA0LDQstC40YLRjCBlbWFpbFxuICAgIGFzeW5jIHNlbmQoYXJncykge1xuICAgICAgY29uc3QgeyB0bywgdGVtcGxhdGUsIHBhcmFtcyA9IHt9LCBvcHRpb25zID0ge30sIHQ6IHRGdW5jLCBsb2NhbGUsIC4uLm90aGVyUHJvcHMgfSA9IGFyZ3M7XG4gICAgICBjb25zdCB0ID0gdEZ1bmMgPyB0RnVuYyA6IGN0eC5pMTggJiYgY3R4LmkxOC5nZXRGaXhlZFQgJiYgY3R4LmkxOC5nZXRGaXhlZFQobG9jYWxlIHx8ICdlbicpIHx8IChhID0+IGEpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCF0bykgdGhyb3cgJyF0byBlbWFpbCc7XG4gICAgICAgIGlmICghdGVtcGxhdGUpIHRocm93ICchdGVtcGxhdGUnO1xuICAgICAgICBpZiAoIXRoaXMudHJhbnNwb3J0ZXIpIHRocm93ICchdHJhbnNwb3J0ZXInO1xuICAgICAgICBpZiAoIXRoaXMudGVtcGxhdGVzW3RlbXBsYXRlXSkgdGhyb3cgJ2NhbnQgZmluZCBlbWFpbCB0ZW1wbGF0ZSAnICsgdGVtcGxhdGVcbiAgICAgICAgLy8g0JjRidC10Lwg0YjQsNCx0LvQvtC9XG4gICAgICAgICAgLy8g0KjQsNCx0LvQvtC9INGN0YLQviDQutC70LDRgdGBLCDRgdC+0LfQtNCw0LXQvCDRjdC60LfQtdC80L/Qu9GP0YBcbiAgICAgICAgY29uc3QgYXJnczIgPSB7IGN0eCwgdCwgbG9jYWxlLCBwYXJhbXMsIC4uLm90aGVyUHJvcHMgfTtcbiAgICAgICAgY29uc3QgZW1haWxUZW1wbGF0ZSA9IG5ldyB0aGlzLnRlbXBsYXRlc1t0ZW1wbGF0ZV0oYXJnczIpO1xuICAgICAgICAvLyDQstGL0LfRi9Cy0LDQtdC8IHJlbmRlclxuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGVtYWlsVGVtcGxhdGUuZ2V0T3B0aW9ucyhhcmdzMik7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBlbWFpbFRlbXBsYXRlLmdldEh0bWwoYXJnczIpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gZW1haWxUZW1wbGF0ZS5nZXRUZXh0ICYmIGVtYWlsVGVtcGxhdGUuZ2V0VGV4dChhcmdzMikgfHwgJyc7XG4gICAgICAgIGNvbnN0IHNlbmRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcub3B0aW9ucywgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzZW5kT3B0aW9ucy50byA9IHRvO1xuICAgICAgICBzZW5kT3B0aW9ucy5odG1sID0gaHRtbDtcbiAgICAgICAgc2VuZE9wdGlvbnMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnRyYW5zcG9ydGVyLnNlbmRNYWlsKHNlbmRPcHRpb25zKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBzZW5kVGV4dCh0bywgc3ViamVjdCwgbWVzc2FnZSwgZnJvbSkge1xuICAgICAgaWYgKCFmcm9tKSBmcm9tID0gY3R4LmNvbmZpZy5tYWlsZXIub3B0aW9ucy5mcm9tO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudHJhbnNwb3J0ZXIuc2VuZE1haWwoeyB0bywgc3ViamVjdCwgdGV4dDogbWVzc2FnZSwgZnJvbSB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuIl19