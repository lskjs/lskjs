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
        subject: 'Восстановление пароля'
      };
    }
  }, {
    key: "renderContent",
    value: function renderContent(_ref2) {
      var ctx = _ref2.ctx,
          params = _ref2.params;
      return "\n  <h1>\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043E\u0442 \u0442\u0435\u0431\u044F \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430<br>\u0432\u043E\u0441\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F \u0434\u043B\u044F<br>\u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \xAB".concat(ctx.site && ctx.site.title, "\xBB</h1>\n  <p>\u0422\u0432\u043E\u0439 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C: <b>").concat(params.password, "</b>\n");
    }
  }]);

  return Recovery;
}(_base.default);

exports.default = Recovery;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZXMvcmVjb3ZlcnkuanMiXSwibmFtZXMiOlsiUmVjb3ZlcnkiLCJjdHgiLCJwYXJhbXMiLCJzdWJqZWN0Iiwic2l0ZSIsInRpdGxlIiwicGFzc3dvcmQiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7OztxQ0FDUztBQUFBLFVBQWZDLEdBQWUsUUFBZkEsR0FBZTtBQUFBLFVBQVZDLE1BQVUsUUFBVkEsTUFBVTtBQUMxQixhQUFPO0FBQ0xDLGlCQUFTO0FBREosT0FBUDtBQUdEOzs7eUNBRThCO0FBQUEsVUFBZkYsR0FBZSxTQUFmQSxHQUFlO0FBQUEsVUFBVkMsTUFBVSxTQUFWQSxNQUFVO0FBQzdCLGtYQUMyRUQsSUFBSUcsSUFBSixJQUFZSCxJQUFJRyxJQUFKLENBQVNDLEtBRGhHLDhIQUV5QkgsT0FBT0ksUUFGaEM7QUFJRDs7OztFQVptQ0MsYSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL19iYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY292ZXJ5IGV4dGVuZHMgQmFzZSB7XG4gIGdldE9wdGlvbnMoeyBjdHgsIHBhcmFtcyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1YmplY3Q6ICfQktC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1INC/0LDRgNC+0LvRjycsXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29udGVudCh7IGN0eCwgcGFyYW1zIH0pIHtcbiAgICByZXR1cm4gYFxuICA8aDE+0JzRiyDQv9C+0LvRg9GH0LjQu9C4INC+0YIg0YLQtdCx0Y8g0LfQsNC/0YDQvtGBINC90LA8YnI+0LLQvtGB0YHRgtCw0LLQu9C10L3QuNC1INC/0LDRgNC+0LvRjyDQtNC70Y88YnI+0LTQvtGB0YLRg9C/0LAg0Logwqske2N0eC5zaXRlICYmIGN0eC5zaXRlLnRpdGxlfcK7PC9oMT5cbiAgPHA+0KLQstC+0Lkg0L3QvtCy0YvQuSDQv9Cw0YDQvtC70Yw6IDxiPiR7cGFyYW1zLnBhc3N3b3JkfTwvYj5cbmBcbiAgfVxufVxuIl19