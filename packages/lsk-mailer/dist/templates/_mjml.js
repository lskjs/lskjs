"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mjml = require("mjml");

var _base = _interopRequireDefault(require("./_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mjml =
/*#__PURE__*/
function (_BaseTemplate) {
  _inherits(Mjml, _BaseTemplate);

  function Mjml() {
    _classCallCheck(this, Mjml);

    return _possibleConstructorReturn(this, (Mjml.__proto__ || Object.getPrototypeOf(Mjml)).apply(this, arguments));
  }

  _createClass(Mjml, [{
    key: "getHtml",
    value: function getHtml() {
      var _mjml2html = (0, _mjml.mjml2html)(this.render.apply(this, arguments)),
          errors = _mjml2html.errors,
          html = _mjml2html.html;

      return html;
    }
  }, {
    key: "render",
    value: function render(_ref) {
      var ctx = _ref.ctx,
          params = _ref.params;
      return "\n<mjml>\n  <mj-body>\n    <mj-container>\n      <mj-section>\n        <mj-column>\n\n          <mj-image width=\"100\" src=\"/assets/img/logo-small.png\"></mj-image>\n\n          <mj-divider border-color=\"#F45E43\"></mj-divider>\n\n          <mj-text font-size=\"20px\" color=\"#F45E43\" font-family=\"helvetica\">Hello World</mj-text>\n\n        </mj-column>\n      </mj-section>\n    </mj-container>\n  </mj-body>\n</mjml>\n    ";
    }
  }]);

  return Mjml;
}(_base.default);

exports.default = Mjml;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZXMvX21qbWwuanMiXSwibmFtZXMiOlsiTWptbCIsInJlbmRlciIsImVycm9ycyIsImh0bWwiLCJjdHgiLCJwYXJhbXMiLCJCYXNlVGVtcGxhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OzhCQUdGO0FBQUEsdUJBQ1UscUJBQVUsS0FBS0MsTUFBTCx1QkFBVixDQURWO0FBQUEsVUFDUEMsTUFETyxjQUNQQSxNQURPO0FBQUEsVUFDQ0MsSUFERCxjQUNDQSxJQUREOztBQUVmLGFBQU9BLElBQVA7QUFDRDs7O2lDQUV1QjtBQUFBLFVBQWZDLEdBQWUsUUFBZkEsR0FBZTtBQUFBLFVBQVZDLE1BQVUsUUFBVkEsTUFBVTtBQUN0QjtBQW1CRDs7OztFQTVCK0JDLGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtam1sMmh0bWwgfSBmcm9tICdtam1sJztcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBCYXNlVGVtcGxhdGUgZnJvbSAnLi9fYmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNam1sIGV4dGVuZHMgQmFzZVRlbXBsYXRlIHtcblxuXG4gIGdldEh0bWwoLi4uYXJncykge1xuICAgIGNvbnN0IHsgZXJyb3JzLCBodG1sIH0gPSBtam1sMmh0bWwodGhpcy5yZW5kZXIoLi4uYXJncykpO1xuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgcmVuZGVyKHsgY3R4LCBwYXJhbXMgfSkge1xuICAgIHJldHVybiBgXG48bWptbD5cbiAgPG1qLWJvZHk+XG4gICAgPG1qLWNvbnRhaW5lcj5cbiAgICAgIDxtai1zZWN0aW9uPlxuICAgICAgICA8bWotY29sdW1uPlxuXG4gICAgICAgICAgPG1qLWltYWdlIHdpZHRoPVwiMTAwXCIgc3JjPVwiL2Fzc2V0cy9pbWcvbG9nby1zbWFsbC5wbmdcIj48L21qLWltYWdlPlxuXG4gICAgICAgICAgPG1qLWRpdmlkZXIgYm9yZGVyLWNvbG9yPVwiI0Y0NUU0M1wiPjwvbWotZGl2aWRlcj5cblxuICAgICAgICAgIDxtai10ZXh0IGZvbnQtc2l6ZT1cIjIwcHhcIiBjb2xvcj1cIiNGNDVFNDNcIiBmb250LWZhbWlseT1cImhlbHZldGljYVwiPkhlbGxvIFdvcmxkPC9tai10ZXh0PlxuXG4gICAgICAgIDwvbWotY29sdW1uPlxuICAgICAgPC9tai1zZWN0aW9uPlxuICAgIDwvbWotY29udGFpbmVyPlxuICA8L21qLWJvZHk+XG48L21qbWw+XG4gICAgYDtcbiAgfVxufVxuIl19