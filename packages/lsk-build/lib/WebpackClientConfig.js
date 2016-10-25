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

var _assetsWebpackPlugin = require('assets-webpack-plugin');

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

var _WebpackConfig2 = require('./WebpackConfig');

var _WebpackConfig3 = _interopRequireDefault(_WebpackConfig2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebpackClientConfig = function (_WebpackConfig) {
  _inherits(WebpackClientConfig, _WebpackConfig);

  function WebpackClientConfig() {
    _classCallCheck(this, WebpackClientConfig);

    return _possibleConstructorReturn(this, (WebpackClientConfig.__proto__ || Object.getPrototypeOf(WebpackClientConfig)).apply(this, arguments));
  }

  _createClass(WebpackClientConfig, [{
    key: 'getTarget',
    value: function getTarget() {
      return 'web';
    }
  }, {
    key: 'getEntry',
    value: function getEntry() {
      return './client.js';
    }
  }, {
    key: 'getGlobals',
    value: function getGlobals() {
      return _extends({}, _get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'getGlobals', this).call(this), {
        __SERVER__: false,
        __CLIENT__: true,
        __BROWSER__: true
      });
    }
  }, {
    key: 'getPreConfig',
    value: function getPreConfig() {
      return _extends({}, _get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'getPreConfig', this).call(this), {
        devtool: this.isDebug() ? 'cheap-module-eval-source-map' : false
      });
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      return _extends({}, _get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'getOutput', this).call(this), {
        filename: this.isDebug() ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
        chunkFilename: this.isDebug() ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js'
      });
    }
  }, {
    key: 'getPlugins',
    value: function getPlugins() {
      return [].concat(_toConsumableArray(_get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'getPlugins', this).call(this)), [
      // Emit a file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new _assetsWebpackPlugin2.default({
        path: this.resolvePath('build'),
        filename: 'assets.js',
        processOutput: function processOutput(x) {
          return 'module.exports = ' + JSON.stringify(x) + ';';
        }
      }),

      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new _webpack2.default.optimize.OccurrenceOrderPlugin(true)], _toConsumableArray(this.isDebug() ? [] : [

      // Search for equal or similar files and deduplicate them in the output
      // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new _webpack2.default.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new _webpack2.default.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          warnings: this.isVerbose()
        }
      }),

      // A plugin for a more aggressive chunk merging strategy
      // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
      new _webpack2.default.optimize.AggressiveMergingPlugin()]));
    }
  }]);

  return WebpackClientConfig;
}(_WebpackConfig3.default);

exports.default = WebpackClientConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XZWJwYWNrQ2xpZW50Q29uZmlnLmpzIl0sIm5hbWVzIjpbIldlYnBhY2tDbGllbnRDb25maWciLCJfX1NFUlZFUl9fIiwiX19DTElFTlRfXyIsIl9fQlJPV1NFUl9fIiwiZGV2dG9vbCIsImlzRGVidWciLCJmaWxlbmFtZSIsImNodW5rRmlsZW5hbWUiLCJwYXRoIiwicmVzb2x2ZVBhdGgiLCJwcm9jZXNzT3V0cHV0IiwiSlNPTiIsInN0cmluZ2lmeSIsIngiLCJvcHRpbWl6ZSIsIk9jY3VycmVuY2VPcmRlclBsdWdpbiIsIkRlZHVwZVBsdWdpbiIsIlVnbGlmeUpzUGx1Z2luIiwiY29tcHJlc3MiLCJzY3Jld19pZTgiLCJ3YXJuaW5ncyIsImlzVmVyYm9zZSIsIkFnZ3Jlc3NpdmVNZXJnaW5nUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsbUI7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxLQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sYUFBUDtBQUNEOzs7aUNBSVk7QUFDWDtBQUVFQyxvQkFBWSxLQUZkO0FBR0VDLG9CQUFZLElBSGQ7QUFJRUMscUJBQWE7QUFKZjtBQU1EOzs7bUNBRWM7QUFDYjtBQUVFQyxpQkFBUyxLQUFLQyxPQUFMLEtBQWlCLDhCQUFqQixHQUFrRDtBQUY3RDtBQUlEOzs7Z0NBRVc7QUFDVjtBQUVFQyxrQkFBVSxLQUFLRCxPQUFMLEtBQWlCLHVCQUFqQixHQUEyQyx1QkFGdkQ7QUFHRUUsdUJBQWUsS0FBS0YsT0FBTCxLQUFpQiw0QkFBakIsR0FBZ0Q7QUFIakU7QUFLRDs7O2lDQUVZO0FBQ1g7QUFFRTtBQUNBO0FBQ0Esd0NBQWlCO0FBQ2ZHLGNBQU0sS0FBS0MsV0FBTCxDQUFpQixPQUFqQixDQURTO0FBRWZILGtCQUFVLFdBRks7QUFHZkksdUJBQWU7QUFBQSx1Q0FBeUJDLEtBQUtDLFNBQUwsQ0FBZUMsQ0FBZixDQUF6QjtBQUFBO0FBSEEsT0FBakIsQ0FKRjs7QUFVRTtBQUNBO0FBQ0E7QUFDQSxVQUFJLGtCQUFRQyxRQUFSLENBQWlCQyxxQkFBckIsQ0FBMkMsSUFBM0MsQ0FiRixzQkFlSyxLQUFLVixPQUFMLEtBQWlCLEVBQWpCLEdBQXNCOztBQUV2QjtBQUNBO0FBQ0EsVUFBSSxrQkFBUVMsUUFBUixDQUFpQkUsWUFBckIsRUFKdUI7O0FBTXZCO0FBQ0E7QUFDQSxVQUFJLGtCQUFRRixRQUFSLENBQWlCRyxjQUFyQixDQUFvQztBQUNsQ0Msa0JBQVU7QUFDUkMscUJBQVcsSUFESCxFQUNTO0FBQ2pCQyxvQkFBVSxLQUFLQyxTQUFMO0FBRkY7QUFEd0IsT0FBcEMsQ0FSdUI7O0FBZXZCO0FBQ0E7QUFDQSxVQUFJLGtCQUFRUCxRQUFSLENBQWlCUSx1QkFBckIsRUFqQnVCLENBZjNCO0FBbUNEOzs7Ozs7a0JBdkVrQnRCLG1CIiwiZmlsZSI6IldlYnBhY2tDbGllbnRDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCBBc3NldHNQbHVnaW4gZnJvbSAnYXNzZXRzLXdlYnBhY2stcGx1Z2luJztcbmltcG9ydCBXZWJwYWNrQ29uZmlnIGZyb20gJy4vV2VicGFja0NvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VicGFja0NsaWVudENvbmZpZyBleHRlbmRzIFdlYnBhY2tDb25maWcge1xuICBnZXRUYXJnZXQoKSB7XG4gICAgcmV0dXJuICd3ZWInXG4gIH1cblxuICBnZXRFbnRyeSgpIHtcbiAgICByZXR1cm4gJy4vY2xpZW50LmpzJ1xuICB9XG5cblxuXG4gIGdldEdsb2JhbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldEdsb2JhbHMoKSxcbiAgICAgIF9fU0VSVkVSX186IGZhbHNlLFxuICAgICAgX19DTElFTlRfXzogdHJ1ZSxcbiAgICAgIF9fQlJPV1NFUl9fOiB0cnVlLFxuICAgIH1cbiAgfVxuXG4gIGdldFByZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0UHJlQ29uZmlnKCksXG4gICAgICBkZXZ0b29sOiB0aGlzLmlzRGVidWcoKSA/ICdjaGVhcC1tb2R1bGUtZXZhbC1zb3VyY2UtbWFwJyA6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGdldE91dHB1dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0T3V0cHV0KCksXG4gICAgICBmaWxlbmFtZTogdGhpcy5pc0RlYnVnKCkgPyAnW25hbWVdLmpzP1tjaHVua2hhc2hdJyA6ICdbbmFtZV0uW2NodW5raGFzaF0uanMnLFxuICAgICAgY2h1bmtGaWxlbmFtZTogdGhpcy5pc0RlYnVnKCkgPyAnW25hbWVdLltpZF0uanM/W2NodW5raGFzaF0nIDogJ1tuYW1lXS5baWRdLltjaHVua2hhc2hdLmpzJyxcbiAgICB9XG4gIH1cblxuICBnZXRQbHVnaW5zKCkge1xuICAgIHJldHVybiBbXG4gICAgICAuLi5zdXBlci5nZXRQbHVnaW5zKCksXG4gICAgICAvLyBFbWl0IGEgZmlsZSB3aXRoIGFzc2V0cyBwYXRoc1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Nwb3J0by9hc3NldHMtd2VicGFjay1wbHVnaW4jb3B0aW9uc1xuICAgICAgbmV3IEFzc2V0c1BsdWdpbih7XG4gICAgICAgIHBhdGg6IHRoaXMucmVzb2x2ZVBhdGgoJ2J1aWxkJyksXG4gICAgICAgIGZpbGVuYW1lOiAnYXNzZXRzLmpzJyxcbiAgICAgICAgcHJvY2Vzc091dHB1dDogeCA9PiBgbW9kdWxlLmV4cG9ydHMgPSAke0pTT04uc3RyaW5naWZ5KHgpfTtgLFxuICAgICAgfSksXG5cbiAgICAgIC8vIEFzc2lnbiB0aGUgbW9kdWxlIGFuZCBjaHVuayBpZHMgYnkgb2NjdXJyZW5jZSBjb3VudFxuICAgICAgLy8gQ29uc2lzdGVudCBvcmRlcmluZyBvZiBtb2R1bGVzIHJlcXVpcmVkIGlmIHVzaW5nIGFueSBoYXNoaW5nIChbaGFzaF0gb3IgW2NodW5raGFzaF0pXG4gICAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvbGlzdC1vZi1wbHVnaW5zLmh0bWwjb2NjdXJyZW5jZW9yZGVycGx1Z2luXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5PY2N1cnJlbmNlT3JkZXJQbHVnaW4odHJ1ZSksXG5cbiAgICAgIC4uLnRoaXMuaXNEZWJ1ZygpID8gW10gOiBbXG5cbiAgICAgICAgLy8gU2VhcmNoIGZvciBlcXVhbCBvciBzaW1pbGFyIGZpbGVzIGFuZCBkZWR1cGxpY2F0ZSB0aGVtIGluIHRoZSBvdXRwdXRcbiAgICAgICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2xpc3Qtb2YtcGx1Z2lucy5odG1sI2RlZHVwZXBsdWdpblxuICAgICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5EZWR1cGVQbHVnaW4oKSxcblxuICAgICAgICAvLyBNaW5pbWl6ZSBhbGwgSmF2YVNjcmlwdCBvdXRwdXQgb2YgY2h1bmtzXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taXNob28vVWdsaWZ5SlMyI2NvbXByZXNzb3Itb3B0aW9uc1xuICAgICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5VZ2xpZnlKc1BsdWdpbih7XG4gICAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICAgIHNjcmV3X2llODogdHJ1ZSwgLy8ganNjczppZ25vcmUgcmVxdWlyZUNhbWVsQ2FzZU9yVXBwZXJDYXNlSWRlbnRpZmllcnNcbiAgICAgICAgICAgIHdhcm5pbmdzOiB0aGlzLmlzVmVyYm9zZSgpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIEEgcGx1Z2luIGZvciBhIG1vcmUgYWdncmVzc2l2ZSBjaHVuayBtZXJnaW5nIHN0cmF0ZWd5XG4gICAgICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9saXN0LW9mLXBsdWdpbnMuaHRtbCNhZ2dyZXNzaXZlbWVyZ2luZ3BsdWdpblxuICAgICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5BZ2dyZXNzaXZlTWVyZ2luZ1BsdWdpbigpLFxuICAgICAgXSxcbiAgICBdXG4gIH1cbn1cbiJdfQ==