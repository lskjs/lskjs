'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapModules = exports.wrapModule = exports.storybook = exports.configure = exports.StoryWrapper = exports.StyleWrapper = undefined;

var _storybook = require('@kadira/storybook');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleWrapper = require('./StyleWrapper');

var _StyleWrapper2 = _interopRequireDefault(_StyleWrapper);

var _StoryWrapper = require('./StoryWrapper');

var _StoryWrapper2 = _interopRequireDefault(_StoryWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storybook = {
  action: _storybook.action,
  storiesOf: function storiesOf() {
    return _storybook.storiesOf.apply(undefined, arguments).addDecorator(function (story) {
      return _react2.default.createElement(
        _StyleWrapper2.default,
        null,
        _react2.default.createElement(
          _StoryWrapper2.default,
          null,
          story()
        )
      );
    });
  }
};

function wrapModule(module) {
  if (typeof module === 'function') {
    module(storybook);
  } else {
    console.log('DO SOMETHING ELSE');
  }
}

function wrapModules(modules, module) {
  return (0, _storybook.configure)(function () {
    for (var key in modules) {
      // eslint-disable-line
      wrapModule(modules[key]);
    }
  }, module);
}

exports.StyleWrapper = _StyleWrapper2.default;
exports.StoryWrapper = _StoryWrapper2.default;
exports.configure = _storybook.configure;
exports.storybook = storybook;
exports.wrapModule = wrapModule;
exports.wrapModules = wrapModules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yeWJvb2svc3Rvcnlib29rLmpzIl0sIm5hbWVzIjpbInN0b3J5Ym9vayIsImFjdGlvbiIsInN0b3JpZXNPZiIsImFkZERlY29yYXRvciIsInN0b3J5Iiwid3JhcE1vZHVsZSIsIm1vZHVsZSIsImNvbnNvbGUiLCJsb2ciLCJ3cmFwTW9kdWxlcyIsIm1vZHVsZXMiLCJrZXkiLCJTdHlsZVdyYXBwZXIiLCJTdG9yeVdyYXBwZXIiLCJjb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLDJCQURnQjtBQUVoQkMsYUFBVyxxQkFBYTtBQUN0QixXQUFPLGlEQUNKQyxZQURJLENBQ1MsVUFBQ0MsS0FBRDtBQUFBLGFBQ1o7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0dBO0FBREg7QUFERixPQURZO0FBQUEsS0FEVCxDQUFQO0FBUUQ7QUFYZSxDQUFsQjs7QUFjQSxTQUFTQyxVQUFULENBQW9CQyxNQUFwQixFQUE0QjtBQUMxQixNQUFJLE9BQU9BLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaENBLFdBQU9OLFNBQVA7QUFDRCxHQUZELE1BRU87QUFDTE8sWUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQyxXQUFULENBQXFCQyxPQUFyQixFQUE4QkosTUFBOUIsRUFBc0M7QUFDcEMsU0FBTywwQkFBVSxZQUFNO0FBQ3JCLFNBQUssSUFBSUssR0FBVCxJQUFnQkQsT0FBaEIsRUFBeUI7QUFBRTtBQUN6QkwsaUJBQVdLLFFBQVFDLEdBQVIsQ0FBWDtBQUNEO0FBQ0YsR0FKTSxFQUlKTCxNQUpJLENBQVA7QUFLRDs7UUFFUU0sWTtRQUFjQyxZO1FBQWNDLFM7UUFBV2QsUyxHQUFBQSxTO1FBQVdLLFUsR0FBQUEsVTtRQUFZSSxXLEdBQUFBLFciLCJmaWxlIjoic3Rvcnlib29rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlndXJlLCBzdG9yaWVzT2YsIGFjdGlvbiB9IGZyb20gJ0BrYWRpcmEvc3Rvcnlib29rJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3R5bGVXcmFwcGVyIGZyb20gJy4vU3R5bGVXcmFwcGVyJztcbmltcG9ydCBTdG9yeVdyYXBwZXIgZnJvbSAnLi9TdG9yeVdyYXBwZXInO1xuXG5jb25zdCBzdG9yeWJvb2sgPSB7XG4gIGFjdGlvbixcbiAgc3Rvcmllc09mOiAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBzdG9yaWVzT2YoLi4uYXJncylcbiAgICAgIC5hZGREZWNvcmF0b3IoKHN0b3J5KSA9PiAoXG4gICAgICAgIDxTdHlsZVdyYXBwZXI+XG4gICAgICAgICAgPFN0b3J5V3JhcHBlcj5cbiAgICAgICAgICAgIHtzdG9yeSgpfVxuICAgICAgICAgIDwvU3RvcnlXcmFwcGVyPlxuICAgICAgICA8L1N0eWxlV3JhcHBlcj5cbiAgICAgICkpXG4gIH0sXG59XG5cbmZ1bmN0aW9uIHdyYXBNb2R1bGUobW9kdWxlKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbW9kdWxlKHN0b3J5Ym9vaylcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnRE8gU09NRVRISU5HIEVMU0UnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwTW9kdWxlcyhtb2R1bGVzLCBtb2R1bGUpIHtcbiAgcmV0dXJuIGNvbmZpZ3VyZSgoKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIG1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgd3JhcE1vZHVsZShtb2R1bGVzW2tleV0pO1xuICAgIH1cbiAgfSwgbW9kdWxlKTtcbn1cblxuZXhwb3J0IHsgU3R5bGVXcmFwcGVyLCBTdG9yeVdyYXBwZXIsIGNvbmZpZ3VyZSwgc3Rvcnlib29rLCB3cmFwTW9kdWxlLCB3cmFwTW9kdWxlcyB9XG4iXX0=