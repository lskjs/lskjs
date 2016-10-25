'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleWrapper = require('./StyleWrapper.css');

var _StyleWrapper2 = _interopRequireDefault(_StyleWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleWrapper = (_temp = _class = function (_Component) {
  _inherits(StyleWrapper, _Component);

  function StyleWrapper(props) {
    _classCallCheck(this, StyleWrapper);

    var _this = _possibleConstructorReturn(this, (StyleWrapper.__proto__ || Object.getPrototypeOf(StyleWrapper)).call(this, props));

    _this.insertCss = function (styles) {
      return styles._insertCss();
    };
    return _this;
  }

  _createClass(StyleWrapper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        insertCss: this.insertCss
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.removeCss = this.insertCss(_StyleWrapper2.default);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeCss();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return StyleWrapper;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.element.isRequired
}, _class.childContextTypes = {
  insertCss: _react.PropTypes.func.isRequired
}, _temp);
exports.default = StyleWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yeWJvb2svU3R5bGVXcmFwcGVyL1N0eWxlV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJTdHlsZVdyYXBwZXIiLCJwcm9wcyIsImluc2VydENzcyIsInN0eWxlcyIsIl9pbnNlcnRDc3MiLCJyZW1vdmVDc3MiLCJjaGlsZHJlbiIsInByb3BUeXBlcyIsImVsZW1lbnQiLCJpc1JlcXVpcmVkIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7O0FBU25CLHdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNEhBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLFNBQUwsR0FBaUI7QUFBQSxhQUFVQyxPQUFPQyxVQUFQLEVBQVY7QUFBQSxLQUFqQjtBQUhpQjtBQUlsQjs7OztzQ0FFaUI7QUFDaEIsYUFBTztBQUNMRixtQkFBVyxLQUFLQTtBQURYLE9BQVA7QUFHRDs7O3lDQUVvQjtBQUNuQixXQUFLRyxTQUFMLEdBQWlCLEtBQUtILFNBQUwsd0JBQWpCO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsV0FBS0csU0FBTDtBQUNEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQUtKLEtBQUwsQ0FBV0ssUUFBbEI7QUFDRDs7Ozs0QkE5Qk1DLFMsR0FBWTtBQUNqQkQsWUFBVSxpQkFBVUUsT0FBVixDQUFrQkM7QUFEWCxDLFNBSVpDLGlCLEdBQW9CO0FBQ3pCUixhQUFXLGlCQUFVUyxJQUFWLENBQWVGO0FBREQsQztrQkFMUlQsWSIsImZpbGUiOiJTdHlsZVdyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzIGZyb20gJy4vU3R5bGVXcmFwcGVyLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlV3JhcHBlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIGluc2VydENzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaW5zZXJ0Q3NzID0gc3R5bGVzID0+IHN0eWxlcy5faW5zZXJ0Q3NzKCk7XG4gIH1cblxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluc2VydENzczogdGhpcy5pbnNlcnRDc3MsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnJlbW92ZUNzcyA9IHRoaXMuaW5zZXJ0Q3NzKHMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5yZW1vdmVDc3MoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICB9XG59XG4iXX0=