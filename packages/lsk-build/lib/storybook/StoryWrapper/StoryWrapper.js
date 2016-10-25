'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('isomorphic-style-loader/lib/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _StoryWrapper = require('./StoryWrapper.css');

var _StoryWrapper2 = _interopRequireDefault(_StoryWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = function (_Component) {
  _inherits(ButtonGroup, _Component);

  function ButtonGroup() {
    _classCallCheck(this, ButtonGroup);

    return _possibleConstructorReturn(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
  }

  _createClass(ButtonGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        _extends({}, this.props, { styleName: 'ButtonGroup' }),
        this.props.children
      );
    }
  }]);

  return ButtonGroup;
}(_react.Component);

ButtonGroup = (0, _withStyles2.default)(_StoryWrapper2.default)((0, _reactCssModules2.default)(_StoryWrapper2.default, {
  allowMultiple: true,
  errorWhenNotFound: false
})(ButtonGroup));

var Button = function (_Component2) {
  _inherits(Button, _Component2);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        _extends({}, this.props, { styleName: 'Button bsStyle_' + this.props.bsStyle }),
        this.props.children
      );
    }
  }]);

  return Button;
}(_react.Component);

Button = (0, _withStyles2.default)(_StoryWrapper2.default)((0, _reactCssModules2.default)(_StoryWrapper2.default, {
  allowMultiple: true,
  errorWhenNotFound: false
})(Button));

var ButtonToolbar = function (_Component3) {
  _inherits(ButtonToolbar, _Component3);

  function ButtonToolbar() {
    _classCallCheck(this, ButtonToolbar);

    return _possibleConstructorReturn(this, (ButtonToolbar.__proto__ || Object.getPrototypeOf(ButtonToolbar)).apply(this, arguments));
  }

  _createClass(ButtonToolbar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        _extends({}, this.props, { styleName: 'ButtonToolbar' }),
        this.props.children
      );
    }
  }]);

  return ButtonToolbar;
}(_react.Component);

var StoryWrapper = exports.StoryWrapper = function (_Component4) {
  _inherits(StoryWrapper, _Component4);

  function StoryWrapper(props) {
    _classCallCheck(this, StoryWrapper);

    var _this4 = _possibleConstructorReturn(this, (StoryWrapper.__proto__ || Object.getPrototypeOf(StoryWrapper)).call(this, props));

    _this4.state = {
      bg: 0,
      inner: 0,
      center: true
    };
    return _this4;
  }

  _createClass(StoryWrapper, [{
    key: 'setCenter',
    value: function setCenter(center) {
      var _this5 = this;

      return function (e) {
        _this5.setState({ center: center });
      };
    }
  }, {
    key: 'setInner',
    value: function setInner(inner) {
      var _this6 = this;

      return function (e) {
        _this6.setState({ inner: inner });
      };
    }
  }, {
    key: 'setBg',
    value: function setBg(bg) {
      var _this7 = this;

      return function (e) {
        _this7.setState({ bg: bg });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var bgs = ['//mcheck.mgbeta.ru/images/bg3.jpg', '//pp.vk.me/c629529/v629529020/1dd4a/JjiHPoWVrMM.jpg', '//cdn.mgbeta.ru/frz/bg/bg1.jpg', '//cdn.mgbeta.ru/frz/bg/bg2.jpg', '//cdn.mgbeta.ru/frz/bg/bg3.jpg', '//cdn.mgbeta.ru/frz/bg/bg4.jpg', '//cdn.mgbeta.ru/frz/bg/bg5.jpg', '//cdn.mgbeta.ru/frz/bg/bg6.jpg', ''];
      var inner = ['no', 'w300', 'w600', 'w900', 'w100', 'padding'];

      return _react2.default.createElement(
        'div',
        { styleName: 'Wrapper Wrapper_inner_' + inner[this.state.inner] + (this.state.center ? ' Wrapper_center' : ''), style: { background: 'url("https://pp.vk.me/c629529/v629529020/1dd4a/JjiHPoWVrMM.jpg") no-repeat center center fixed', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(' + bgs[this.state.bg] + ')' } },
        _react2.default.createElement('link', { href: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', rel: 'stylesheet' }),
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', right: 0, top: 0 } },
          _react2.default.createElement(
            ButtonToolbar,
            null,
            _react2.default.createElement(
              ButtonGroup,
              null,
              _react2.default.createElement(
                Button,
                { onClick: this.setCenter(!this.state.center), bsStyle: this.state.center ? 'primary' : 'default' },
                'center'
              )
            ),
            _react2.default.createElement(
              ButtonGroup,
              null,
              inner.map(function (inner, i) {
                return _react2.default.createElement(
                  Button,
                  { key: i, onClick: _this8.setInner(i), bsStyle: _this8.state.inner == i ? 'primary' : 'default' },
                  inner
                );
              })
            ),
            _react2.default.createElement(
              ButtonGroup,
              null,
              bgs.map(function (bg, i) {
                return _react2.default.createElement(
                  Button,
                  { key: i, onClick: _this8.setBg(i), bsStyle: _this8.state.bg == i ? 'primary' : 'default' },
                  i + 1
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { styleName: 'Wrapper__wrap' },
          _react2.default.createElement(
            'div',
            { styleName: 'Wrapper__content' },
            this.props.children
          )
        )
      );
    }
  }]);

  return StoryWrapper;
}(_react.Component);

exports.default = (0, _withStyles2.default)(_StoryWrapper2.default)((0, _reactCssModules2.default)(_StoryWrapper2.default, {
  allowMultiple: true,
  errorWhenNotFound: false
})(StoryWrapper));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yeWJvb2svU3RvcnlXcmFwcGVyL1N0b3J5V3JhcHBlci5qcyJdLCJuYW1lcyI6WyJCdXR0b25Hcm91cCIsInByb3BzIiwiY2hpbGRyZW4iLCJhbGxvd011bHRpcGxlIiwiZXJyb3JXaGVuTm90Rm91bmQiLCJCdXR0b24iLCJic1N0eWxlIiwiQnV0dG9uVG9vbGJhciIsIlN0b3J5V3JhcHBlciIsInN0YXRlIiwiYmciLCJpbm5lciIsImNlbnRlciIsImUiLCJzZXRTdGF0ZSIsImJncyIsImJhY2tncm91bmQiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRJbWFnZSIsInBvc2l0aW9uIiwicmlnaHQiLCJ0b3AiLCJzZXRDZW50ZXIiLCJtYXAiLCJpIiwic2V0SW5uZXIiLCJzZXRCZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBR01BLFc7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTztBQUFBO0FBQUEscUJBQVUsS0FBS0MsS0FBZixJQUFzQixXQUFVLGFBQWhDO0FBQStDLGFBQUtBLEtBQUwsQ0FBV0M7QUFBMUQsT0FBUDtBQUNEOzs7Ozs7QUFFSEYsY0FBYyxrREFDWix1REFBYztBQUNaRyxpQkFBZSxJQURIO0FBRVpDLHFCQUFtQjtBQUZQLENBQWQsRUFJRUosV0FKRixDQURZLENBQWQ7O0lBVU1LLE07Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTztBQUFBO0FBQUEscUJBQVksS0FBS0osS0FBakIsSUFBd0IsV0FBVyxvQkFBb0IsS0FBS0EsS0FBTCxDQUFXSyxPQUFsRTtBQUE0RSxhQUFLTCxLQUFMLENBQVdDO0FBQXZGLE9BQVA7QUFDRDs7Ozs7O0FBRUhHLFNBQVMsa0RBQ1AsdURBQWM7QUFDWkYsaUJBQWUsSUFESDtBQUVaQyxxQkFBbUI7QUFGUCxDQUFkLEVBSUVDLE1BSkYsQ0FETyxDQUFUOztJQVNNRSxhOzs7Ozs7Ozs7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QUFMLENBQVdGLENBQVgsQ0FBekIsRUFBd0MsU0FBUyxPQUFLaEIsS0FBTCxDQUFXQyxFQUFYLElBQWlCZSxDQUFqQixHQUFzQixTQUF0QixHQUFrQyxTQUFuRjtBQUErRkEsc0JBQUk7QUFBbkcsaUJBRFM7QUFBQSxlQUFUO0FBREo7QUFURjtBQURGLFNBSEs7QUFxQkw7QUFBQTtBQUFBLFlBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxrQkFBZjtBQUNHLGlCQUFLeEIsS0FBTCxDQUFXQztBQURkO0FBREY7QUFyQkssT0FBUDtBQTJCRDs7Ozs7O2tCQUdVLGtEQUNiLHVEQUFjO0FBQ1pDLGlCQUFlLElBREg7QUFFWkMscUJBQW1CO0FBRlAsQ0FBZCxFQUlFSSxZQUpGLENBRGEsQyIsImZpbGUiOiJTdG9yeVdyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQ1NTTW9kdWxlcyBmcm9tICdyZWFjdC1jc3MtbW9kdWxlcyc7XG5cbmltcG9ydCBzIGZyb20gJy4vU3RvcnlXcmFwcGVyLmNzcyc7XG5cblxuY2xhc3MgQnV0dG9uR3JvdXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxzcGFuIHsuLi50aGlzLnByb3BzfSBzdHlsZU5hbWU9J0J1dHRvbkdyb3VwJz57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3NwYW4+XG4gIH1cbn1cbkJ1dHRvbkdyb3VwID0gd2l0aFN0eWxlcyhzKShcbiAgQ1NTTW9kdWxlcyhzLCB7XG4gICAgYWxsb3dNdWx0aXBsZTogdHJ1ZSxcbiAgICBlcnJvcldoZW5Ob3RGb3VuZDogZmFsc2VcbiAgfSkoXG4gICAgQnV0dG9uR3JvdXBcbiAgKVxuKVxuXG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4udGhpcy5wcm9wc30gc3R5bGVOYW1lPXsnQnV0dG9uIGJzU3R5bGVfJyArIHRoaXMucHJvcHMuYnNTdHlsZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9idXR0b24+XG4gIH1cbn1cbkJ1dHRvbiA9IHdpdGhTdHlsZXMocykoXG4gIENTU01vZHVsZXMocywge1xuICAgIGFsbG93TXVsdGlwbGU6IHRydWUsXG4gICAgZXJyb3JXaGVuTm90Rm91bmQ6IGZhbHNlXG4gIH0pKFxuICAgIEJ1dHRvblxuICApXG4pXG5cbmNsYXNzIEJ1dHRvblRvb2xiYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxzcGFuIHsuLi50aGlzLnByb3BzfSBzdHlsZU5hbWU9J0J1dHRvblRvb2xiYXInPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvc3Bhbj5cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RvcnlXcmFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICBzdXBlcihwcm9wcylcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGJnOiAwLFxuICAgICAgICBpbm5lcjogMCxcbiAgICAgICAgY2VudGVyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHNldENlbnRlcihjZW50ZXIpIHtcbiAgICAgIHJldHVybiAoZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjZW50ZXJ9KVxuICAgICAgfVxuICAgIH1cbiAgICBzZXRJbm5lcihpbm5lcikge1xuICAgICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lubmVyfSlcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0QmcoYmcpIHtcbiAgICAgIHJldHVybiAoZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtiZ30pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgYmdzID0gW1xuICAgICAgICAnLy9tY2hlY2subWdiZXRhLnJ1L2ltYWdlcy9iZzMuanBnJyxcbiAgICAgICAgJy8vcHAudmsubWUvYzYyOTUyOS92NjI5NTI5MDIwLzFkZDRhL0pqaUhQb1dWck1NLmpwZycsXG4gICAgICAgICcvL2Nkbi5tZ2JldGEucnUvZnJ6L2JnL2JnMS5qcGcnLFxuICAgICAgICAnLy9jZG4ubWdiZXRhLnJ1L2Zyei9iZy9iZzIuanBnJyxcbiAgICAgICAgJy8vY2RuLm1nYmV0YS5ydS9mcnovYmcvYmczLmpwZycsXG4gICAgICAgICcvL2Nkbi5tZ2JldGEucnUvZnJ6L2JnL2JnNC5qcGcnLFxuICAgICAgICAnLy9jZG4ubWdiZXRhLnJ1L2Zyei9iZy9iZzUuanBnJyxcbiAgICAgICAgJy8vY2RuLm1nYmV0YS5ydS9mcnovYmcvYmc2LmpwZycsXG4gICAgICAgICcnLFxuICAgICAgXVxuICAgICAgY29uc3QgaW5uZXIgPSBbXG4gICAgICAgICdubycsXG4gICAgICAgICd3MzAwJyxcbiAgICAgICAgJ3c2MDAnLFxuICAgICAgICAndzkwMCcsXG4gICAgICAgICd3MTAwJyxcbiAgICAgICAgJ3BhZGRpbmcnLFxuICAgICAgXVxuXG5cbiAgICAgIHJldHVybiA8ZGl2IHN0eWxlTmFtZT17J1dyYXBwZXIgV3JhcHBlcl9pbm5lcl8nICsgaW5uZXJbdGhpcy5zdGF0ZS5pbm5lcl0gKyAodGhpcy5zdGF0ZS5jZW50ZXIgPyAnIFdyYXBwZXJfY2VudGVyJyA6ICcnKX0gc3R5bGU9e3sgYmFja2dyb3VuZDogJ3VybChcImh0dHBzOi8vcHAudmsubWUvYzYyOTUyOS92NjI5NTI5MDIwLzFkZDRhL0pqaUhQb1dWck1NLmpwZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZCcsIGhlaWdodDonMTAwJScsIGJhY2tncm91bmRTaXplOiAnY292ZXInLCBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIGJnc1t0aGlzLnN0YXRlLmJnXSArICcpJyB9fT5cbiAgICAgICAgPGxpbmsgaHJlZj0nLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4zLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgPGxpbmsgaHJlZj0nLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjYvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOidhYnNvbHV0ZScsIHJpZ2h0OiAwLCB0b3A6IDB9fT5cbiAgICAgICAgICA8QnV0dG9uVG9vbGJhcj5cbiAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNldENlbnRlcighdGhpcy5zdGF0ZS5jZW50ZXIpfSBic1N0eWxlPXt0aGlzLnN0YXRlLmNlbnRlciA/ICAncHJpbWFyeScgOiAnZGVmYXVsdCd9PmNlbnRlcjwvQnV0dG9uPlxuICAgICAgICAgICAgPC9CdXR0b25Hcm91cD5cbiAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxuICAgICAgICAgICAgICAgIHsgaW5uZXIubWFwKCAoaW5uZXIsIGkpID0+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uIGtleT17aX0gb25DbGljaz17dGhpcy5zZXRJbm5lcihpKX0gYnNTdHlsZT17dGhpcy5zdGF0ZS5pbm5lciA9PSBpID8gICdwcmltYXJ5JyA6ICdkZWZhdWx0J30+e2lubmVyfTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XG4gICAgICAgICAgICA8QnV0dG9uR3JvdXA+XG4gICAgICAgICAgICAgIHsgYmdzLm1hcCggKGJnLCBpKSA9PlxuICAgICAgICAgICAgICAgIDxCdXR0b24ga2V5PXtpfSBvbkNsaWNrPXt0aGlzLnNldEJnKGkpfSBic1N0eWxlPXt0aGlzLnN0YXRlLmJnID09IGkgPyAgJ3ByaW1hcnknIDogJ2RlZmF1bHQnfT57aSArIDF9PC9CdXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxuICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZU5hbWU9J1dyYXBwZXJfX3dyYXAnID5cbiAgICAgICAgICA8ZGl2IHN0eWxlTmFtZT0nV3JhcHBlcl9fY29udGVudCcgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFxuICBDU1NNb2R1bGVzKHMsIHtcbiAgICBhbGxvd011bHRpcGxlOiB0cnVlLFxuICAgIGVycm9yV2hlbk5vdEZvdW5kOiBmYWxzZVxuICB9KShcbiAgICBTdG9yeVdyYXBwZXJcbiAgKVxuKVxuIl19