"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recovery =
/*#__PURE__*/
function (_Base) {
  _inherits(Recovery, _Base);

  function Recovery() {
    _classCallCheck(this, Recovery);

    return _possibleConstructorReturn(this, (Recovery.__proto__ || Object.getPrototypeOf(Recovery)).apply(this, arguments));
  }

  _createClass(Recovery, [{
    key: "getOptions",
    value: function getOptions(_ref) {
      var ctx = _ref.ctx,
          params = _ref.params;
      return {
        subject: 'Подтверждение почты!'
      };
    }
  }, {
    key: "renderContent",
    value: function renderContent(_ref2) {
      var params = _ref2.params;
      return "\n  <h1>\u041F\u0440\u0438\u0432\u0435\u0442 ".concat(params.user.name, "!</h1>\n  <p>\u0414\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043F\u043E\u0447\u0442\u044B \u043D\u0430\u0436\u043C\u0438 \u043D\u0430 <a href=").concat(params.link, ">\u0441\u0441\u044B\u043B\u043A\u0443!</a></p>\n");
    }
  }]);

  return Recovery;
}(_base.default);

exports.default = Recovery;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZXMvYXBwcm92ZUVtYWlsLmpzIl0sIm5hbWVzIjpbIlJlY292ZXJ5IiwiY3R4IiwicGFyYW1zIiwic3ViamVjdCIsInVzZXIiLCJuYW1lIiwibGluayIsIkJhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7O3FDQUNTO0FBQUEsVUFBZkMsR0FBZSxRQUFmQSxHQUFlO0FBQUEsVUFBVkMsTUFBVSxRQUFWQSxNQUFVO0FBQzFCLGFBQU87QUFDTEMsaUJBQVM7QUFESixPQUFQO0FBR0Q7Ozt5Q0FFeUI7QUFBQSxVQUFWRCxNQUFVLFNBQVZBLE1BQVU7QUFDeEIsb0VBQ1dBLE9BQU9FLElBQVAsQ0FBWUMsSUFEdkIsK01BRTRDSCxPQUFPSSxJQUZuRDtBQUlEOzs7O0VBWm1DQyxhIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vX2Jhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3ZlcnkgZXh0ZW5kcyBCYXNlIHtcbiAgZ2V0T3B0aW9ucyh7IGN0eCwgcGFyYW1zIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3ViamVjdDogJ9Cf0L7QtNGC0LLQtdGA0LbQtNC10L3QuNC1INC/0L7Rh9GC0YshJyxcbiAgICB9XG4gIH1cblxuICByZW5kZXJDb250ZW50KHsgcGFyYW1zIH0pIHtcbiAgICByZXR1cm4gYFxuICA8aDE+0J/RgNC40LLQtdGCICR7cGFyYW1zLnVzZXIubmFtZX0hPC9oMT5cbiAgPHA+0JTQu9GPINC/0L7QtNGC0LLQtdGA0LbQtNC10L3QuNGPINC/0L7Rh9GC0Ysg0L3QsNC20LzQuCDQvdCwIDxhIGhyZWY9JHtwYXJhbXMubGlua30+0YHRgdGL0LvQutGDITwvYT48L3A+XG5gXG4gIH1cbn1cbiJdfQ==