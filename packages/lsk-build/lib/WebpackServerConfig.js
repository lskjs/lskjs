'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _WebpackConfig2 = require('./WebpackConfig');

var _WebpackConfig3 = _interopRequireDefault(_WebpackConfig2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebpackServerConfig = function (_WebpackConfig) {
  _inherits(WebpackServerConfig, _WebpackConfig);

  function WebpackServerConfig() {
    _classCallCheck(this, WebpackServerConfig);

    return _possibleConstructorReturn(this, (WebpackServerConfig.__proto__ || Object.getPrototypeOf(WebpackServerConfig)).apply(this, arguments));
  }

  _createClass(WebpackServerConfig, [{
    key: 'getTarget',
    value: function getTarget() {
      return 'node';
    }
  }, {
    key: 'getEntry',
    value: function getEntry() {
      return './server.js';
    }
  }, {
    key: 'getGlobals',
    value: function getGlobals() {
      return _extends({}, _get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'getGlobals', this).call(this), {
        __SERVER__: true,
        __CLIENT__: false,
        __BROWSER__: false
      });
    }
  }, {
    key: 'getPlugins',
    value: function getPlugins() {
      return [].concat(_toConsumableArray(_get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'getPlugins', this).call(this)), [

      // Adds a banner to the top of each generated chunk
      // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
      new _webpack2.default.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),

      // Do not create separate chunks of the server bundle
      // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
      new _webpack2.default.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]);
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      return _extends({}, _get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'getOutput', this).call(this), {
        filename: '../../server.js',
        libraryTarget: 'commonjs2'
      });
    }
  }, {
    key: 'getPreConfig',
    value: function getPreConfig() {
      return _extends({}, _get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'getPreConfig', this).call(this), {
        externals: [/^\.\/assets$/, function (context, request, callback) {
          var isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) && !request.match(/\.(css|less|scss|sss)$/i) &&
          // 0
          !request.match(/^lego-starter-kit/); // &&
          // !this.getDeps().filter(dep => request.match(new RegExp('^' + dep.name))).length
          callback(null, Boolean(isExternal));
        }],
        node: {
          console: false,
          global: false,
          process: false,
          Buffer: false,
          __filename: false,
          __dirname: false
        },
        devtool: 'source-map'
      });
    }
  }]);

  return WebpackServerConfig;
}(_WebpackConfig3.default);

exports.default = WebpackServerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XZWJwYWNrU2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbIldlYnBhY2tTZXJ2ZXJDb25maWciLCJfX1NFUlZFUl9fIiwiX19DTElFTlRfXyIsIl9fQlJPV1NFUl9fIiwiQmFubmVyUGx1Z2luIiwicmF3IiwiZW50cnlPbmx5Iiwib3B0aW1pemUiLCJMaW1pdENodW5rQ291bnRQbHVnaW4iLCJtYXhDaHVua3MiLCJmaWxlbmFtZSIsImxpYnJhcnlUYXJnZXQiLCJleHRlcm5hbHMiLCJjb250ZXh0IiwicmVxdWVzdCIsImNhbGxiYWNrIiwiaXNFeHRlcm5hbCIsIm1hdGNoIiwiQm9vbGVhbiIsIm5vZGUiLCJjb25zb2xlIiwiZ2xvYmFsIiwicHJvY2VzcyIsIkJ1ZmZlciIsIl9fZmlsZW5hbWUiLCJfX2Rpcm5hbWUiLCJkZXZ0b29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG1COzs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sTUFBUDtBQUNEOzs7K0JBRVU7QUFDVCxhQUFPLGFBQVA7QUFDRDs7O2lDQUVZO0FBQ1g7QUFFRUMsb0JBQVksSUFGZDtBQUdFQyxvQkFBWSxLQUhkO0FBSUVDLHFCQUFhO0FBSmY7QUFNRDs7O2lDQUVZO0FBQ1g7O0FBR0U7QUFDQTtBQUNBLFVBQUksa0JBQVFDLFlBQVosQ0FBeUIsMENBQXpCLEVBQ0UsRUFBRUMsS0FBSyxJQUFQLEVBQWFDLFdBQVcsS0FBeEIsRUFERixDQUxGOztBQVFFO0FBQ0E7QUFDQSxVQUFJLGtCQUFRQyxRQUFSLENBQWlCQyxxQkFBckIsQ0FBMkMsRUFBRUMsV0FBVyxDQUFiLEVBQTNDLENBVkY7QUFZRDs7O2dDQUVXO0FBQ1Y7QUFFRUMsa0JBQVUsaUJBRlo7QUFHRUMsdUJBQWU7QUFIakI7QUFLRDs7O21DQUVjO0FBQ2I7QUFFRUMsbUJBQVcsQ0FDVCxjQURTLEVBRVQsVUFBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxRQUFuQixFQUFnQztBQUM5QixjQUFNQyxhQUNKRixRQUFRRyxLQUFSLENBQWMsMEJBQWQsS0FDQSxDQUFDSCxRQUFRRyxLQUFSLENBQWMseUJBQWQsQ0FERDtBQUVBO0FBQ0EsV0FBQ0gsUUFBUUcsS0FBUixDQUFjLG1CQUFkLENBSkgsQ0FEOEIsQ0FLTztBQUNuQztBQUNGRixtQkFBUyxJQUFULEVBQWVHLFFBQVFGLFVBQVIsQ0FBZjtBQUNELFNBVlEsQ0FGYjtBQWVFRyxjQUFNO0FBQ0pDLG1CQUFTLEtBREw7QUFFSkMsa0JBQVEsS0FGSjtBQUdKQyxtQkFBUyxLQUhMO0FBSUpDLGtCQUFRLEtBSko7QUFLSkMsc0JBQVksS0FMUjtBQU1KQyxxQkFBVztBQU5QLFNBZlI7QUF1QkVDLGlCQUFTO0FBdkJYO0FBeUJEOzs7Ozs7a0JBbkVrQjFCLG1CIiwiZmlsZSI6IldlYnBhY2tTZXJ2ZXJDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCBXZWJwYWNrQ29uZmlnIGZyb20gJy4vV2VicGFja0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYnBhY2tTZXJ2ZXJDb25maWcgZXh0ZW5kcyBXZWJwYWNrQ29uZmlnIHtcbiAgZ2V0VGFyZ2V0KCkge1xuICAgIHJldHVybiAnbm9kZSdcbiAgfVxuXG4gIGdldEVudHJ5KCkge1xuICAgIHJldHVybiAnLi9zZXJ2ZXIuanMnXG4gIH1cblxuICBnZXRHbG9iYWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXRHbG9iYWxzKCksXG4gICAgICBfX1NFUlZFUl9fOiB0cnVlLFxuICAgICAgX19DTElFTlRfXzogZmFsc2UsXG4gICAgICBfX0JST1dTRVJfXzogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZ2V0UGx1Z2lucygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uc3VwZXIuZ2V0UGx1Z2lucygpLFxuXG4gICAgICAvLyBBZGRzIGEgYmFubmVyIHRvIHRoZSB0b3Agb2YgZWFjaCBnZW5lcmF0ZWQgY2h1bmtcbiAgICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9saXN0LW9mLXBsdWdpbnMuaHRtbCNiYW5uZXJwbHVnaW5cbiAgICAgIG5ldyB3ZWJwYWNrLkJhbm5lclBsdWdpbigncmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKS5pbnN0YWxsKCk7JyxcbiAgICAgICAgeyByYXc6IHRydWUsIGVudHJ5T25seTogZmFsc2UgfSksXG5cbiAgICAgIC8vIERvIG5vdCBjcmVhdGUgc2VwYXJhdGUgY2h1bmtzIG9mIHRoZSBzZXJ2ZXIgYnVuZGxlXG4gICAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvbGlzdC1vZi1wbHVnaW5zLmh0bWwjbGltaXRjaHVua2NvdW50cGx1Z2luXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5MaW1pdENodW5rQ291bnRQbHVnaW4oeyBtYXhDaHVua3M6IDEgfSksXG4gICAgXVxuICB9XG5cbiAgZ2V0T3V0cHV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXRPdXRwdXQoKSxcbiAgICAgIGZpbGVuYW1lOiAnLi4vLi4vc2VydmVyLmpzJyxcbiAgICAgIGxpYnJhcnlUYXJnZXQ6ICdjb21tb25qczInLFxuICAgIH1cbiAgfVxuXG4gIGdldFByZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0UHJlQ29uZmlnKCksXG4gICAgICBleHRlcm5hbHM6IFtcbiAgICAgICAgL15cXC5cXC9hc3NldHMkLyxcbiAgICAgICAgKGNvbnRleHQsIHJlcXVlc3QsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNFeHRlcm5hbCA9XG4gICAgICAgICAgICByZXF1ZXN0Lm1hdGNoKC9eW0BhLXpdW2EtelxcL1xcLlxcLTAtOV0qJC9pKSAmJlxuICAgICAgICAgICAgIXJlcXVlc3QubWF0Y2goL1xcLihjc3N8bGVzc3xzY3NzfHNzcykkL2kpICYmXG4gICAgICAgICAgICAvLyAwXG4gICAgICAgICAgICAhcmVxdWVzdC5tYXRjaCgvXmxlZ28tc3RhcnRlci1raXQvKS8vICYmXG4gICAgICAgICAgICAvLyAhdGhpcy5nZXREZXBzKCkuZmlsdGVyKGRlcCA9PiByZXF1ZXN0Lm1hdGNoKG5ldyBSZWdFeHAoJ14nICsgZGVwLm5hbWUpKSkubGVuZ3RoXG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgQm9vbGVhbihpc0V4dGVybmFsKSk7XG4gICAgICAgIH0sXG5cbiAgICAgIF0sXG4gICAgICBub2RlOiB7XG4gICAgICAgIGNvbnNvbGU6IGZhbHNlLFxuICAgICAgICBnbG9iYWw6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzOiBmYWxzZSxcbiAgICAgICAgQnVmZmVyOiBmYWxzZSxcbiAgICAgICAgX19maWxlbmFtZTogZmFsc2UsXG4gICAgICAgIF9fZGlybmFtZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZGV2dG9vbDogJ3NvdXJjZS1tYXAnLFxuICAgIH1cbiAgfVxufVxuIl19