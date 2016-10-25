'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackConfig = function () {
  function WebpackConfig() {
    var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WebpackConfig);

    Object.assign(this, ctx);
  }

  _createClass(WebpackConfig, [{
    key: 'resolvePath',
    value: function resolvePath() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (this.dirname) return _path2.default.resolve.apply(_path2.default, [this.dirname].concat(args));
      return _path2.default.resolve.apply(_path2.default, args);
    }
  }, {
    key: 'getEnv',
    value: function getEnv() {
      return this.env || 'development';
    }
  }, {
    key: 'isDebug',
    value: function isDebug() {
      return this.debug || true;
    }
  }, {
    key: 'isVerbose',
    value: function isVerbose() {
      return this.verbose || false;
    }
  }, {
    key: 'getGlobals',
    value: function getGlobals() {
      return {
        'process.env.NODE_ENV': JSON.stringify(this.getEnv()),
        __ENV__: JSON.stringify(this.getEnv()),
        __DEV__: this.getEnv() === 'development',
        __PROD__: this.getEnv() === 'production'
      };
    }
  }, {
    key: 'getAutoprefixerBrowsers',
    value: function getAutoprefixerBrowsers() {
      return ['Android 2.3', 'Android >= 4', 'Chrome >= 35', 'Firefox >= 31', 'Explorer >= 9', 'iOS >= 7', 'Opera >= 12', 'Safari >= 7.1'];
    }
  }, {
    key: 'getDeps',
    value: function getDeps() {
      return this.deps || [];
    }
  }, {
    key: 'getPostcssModule',
    value: function getPostcssModule(bundler) {
      return {
        default: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({
          addDependencyTo: bundler,
          path: [this.resolvePath('src')].concat(_toConsumableArray(this.getDeps().map(function (dep) {
            return dep.path;
          })), [this.resolvePath('node_modules')]),
          trigger: '&',
          resolve: require('./utils/resolve-id')
        }),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-mixins')(), require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: this.getAutoprefixerBrowsers() })],
        sass: [require('autoprefixer')({ browsers: this.getAutoprefixerBrowsers() })]
      };
    }
  }, {
    key: 'getJsxLoader',
    value: function getJsxLoader() {
      return {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        include: [].concat(_toConsumableArray(this.getDeps().map(function (dep) {
          return dep.path;
        })), [this.resolvePath('src')]),
        // exclude: /node_modules/,
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: this.isDebug(),

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['jsx-control-statements', 'react-require', 'transform-decorators-legacy', 'transform-runtime'].concat(_toConsumableArray(this.isDebug() ? [] : ['transform-react-remove-prop-types', 'transform-react-constant-elements']))
        }
      };
    }
  }, {
    key: 'getCssLoaders',
    value: function getCssLoaders() {
      return [{
        test: /\.global\.css$/,
        loaders: ['isomorphic-style-loader', 'css-loader?' + JSON.stringify({
          sourceMap: this.isDebug(),
          // CSS Modules https://github.com/css-modules/css-modules
          modules: false,
          // localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !this.isDebug()
        })]
      }, {
        test: /\.css$/,
        exclude: /(global.css)/,
        loaders: ['isomorphic-style-loader', 'css-loader?' + JSON.stringify({
          sourceMap: this.isDebug(),
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !this.isDebug()
        }), 'postcss-loader?pack=default']
      }, {
        test: /\.(_pcss)/,
        loaders: ['isomorphic-style-loader', 'css-loader?' + JSON.stringify({
          sourceMap: this.isDebug(),
          // CSS Modules https://github.com/css-modules/css-modules
          modules: false,
          // localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !this.isDebug()
        }), 'postcss-loader?pack=default']
      },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     'isomorphic-style-loader',
      //     `css-loader?${JSON.stringify({ sourceMap: this.isDebug(), minimize: !this.isDebug() })}`,
      //     'postcss-loader?pack=sass',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.scss$/,
        loaders: ['isomorphic-style-loader', 'css-loader?' + JSON.stringify({
          sourceMap: this.isDebug(),
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !this.isDebug()
        }), 'postcss-loader?pack=sass', 'sass-loader']
      }, {
        test: /\.styl$/,
        loaders: ['isomorphic-style-loader', 'css-loader?' + JSON.stringify({
          sourceMap: this.isDebug(),
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !this.isDebug()
        }), 'postcss-loader?pack=sass', 'stylus']
      }];
    }
  }, {
    key: 'getLoaders',
    value: function getLoaders() {
      return [this.getJsxLoader()].concat(_toConsumableArray(this.getCssLoaders()), [{
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000
        }
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]'
        }
      }]);
    }
  }, {
    key: 'getModule',
    value: function getModule() {
      return {
        loaders: this.getLoaders()
      };
    }
  }, {
    key: 'getPlugins',
    value: function getPlugins() {
      return [
      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new _webpack2.default.DefinePlugin(this.getGlobals())];
    }
  }, {
    key: 'getResolve',
    value: function getResolve() {
      return {
        root: this.resolvePath('src'),
        alias: this.getResolveAlias(),
        modulesDirectories: ['node_modules'],
        extensions: this.getResolveExtensions()
      };
    }
  }, {
    key: 'getResolveExtensions',
    value: function getResolveExtensions() {
      return ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'];
    }
  }, {
    key: 'getResolveAlias',
    value: function getResolveAlias() {
      var alias = {
        '~': this.resolvePath('src')
      };
      this.getDeps().forEach(function (dep) {
        alias[dep.name] = dep.path;
      });
      return alias;
    }
  }, {
    key: 'getStats',
    value: function getStats() {
      return {
        colors: true,
        reasons: this.isDebug(),
        hash: this.isVerbose(),
        version: this.isVerbose(),
        timings: true,
        chunks: this.isVerbose(),
        chunkModules: this.isVerbose(),
        cached: this.isVerbose(),
        cachedAssets: this.isVerbose()
      };
    }
  }, {
    key: 'getEntry',
    value: function getEntry() {
      return 'index.js';
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      return {
        path: this.resolvePath('build/public/assets'),
        publicPath: '/assets/',
        sourcePrefix: '  '
      };
    }
  }, {
    key: 'getPreConfig',
    value: function getPreConfig() {
      var _this = this;

      return {
        context: this.resolvePath('src'),
        target: this.getTarget(),
        entry: this.getEntry(),
        resolve: this.getResolve(),
        output: this.getOutput(),
        module: this.getModule(),
        plugins: this.getPlugins(),
        cache: this.isDebug(),
        debug: this.isDebug(),
        stats: this.getStats(),
        postcss: function postcss() {
          return _this.getPostcssModule.apply(_this, arguments);
        }
      };
    }
  }, {
    key: 'getConfig',
    value: function getConfig(withoutMerge) {
      var config = this.getPreConfig();
      if (!this.webpack || withoutMerge) return config;
      // return Object.extend({}, config, this.webpack)
      return (0, _extend2.default)(true, config, this.webpack);
    }
  }]);

  return WebpackConfig;
}();

exports.default = WebpackConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XZWJwYWNrQ29uZmlnLmpzIl0sIm5hbWVzIjpbIldlYnBhY2tDb25maWciLCJjdHgiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmdzIiwiZGlybmFtZSIsInJlc29sdmUiLCJlbnYiLCJkZWJ1ZyIsInZlcmJvc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0RW52IiwiX19FTlZfXyIsIl9fREVWX18iLCJfX1BST0RfXyIsImRlcHMiLCJidW5kbGVyIiwiZGVmYXVsdCIsInJlcXVpcmUiLCJhZGREZXBlbmRlbmN5VG8iLCJwYXRoIiwicmVzb2x2ZVBhdGgiLCJnZXREZXBzIiwibWFwIiwiZGVwIiwidHJpZ2dlciIsImJyb3dzZXJzIiwiZ2V0QXV0b3ByZWZpeGVyQnJvd3NlcnMiLCJzYXNzIiwidGVzdCIsImxvYWRlciIsImluY2x1ZGUiLCJxdWVyeSIsImNhY2hlRGlyZWN0b3J5IiwiaXNEZWJ1ZyIsImJhYmVscmMiLCJwcmVzZXRzIiwicGx1Z2lucyIsImxvYWRlcnMiLCJzb3VyY2VNYXAiLCJtb2R1bGVzIiwibWluaW1pemUiLCJleGNsdWRlIiwibG9jYWxJZGVudE5hbWUiLCJnZXRKc3hMb2FkZXIiLCJnZXRDc3NMb2FkZXJzIiwibmFtZSIsImxpbWl0IiwiZ2V0TG9hZGVycyIsIkRlZmluZVBsdWdpbiIsImdldEdsb2JhbHMiLCJyb290IiwiYWxpYXMiLCJnZXRSZXNvbHZlQWxpYXMiLCJtb2R1bGVzRGlyZWN0b3JpZXMiLCJleHRlbnNpb25zIiwiZ2V0UmVzb2x2ZUV4dGVuc2lvbnMiLCJmb3JFYWNoIiwiY29sb3JzIiwicmVhc29ucyIsImhhc2giLCJpc1ZlcmJvc2UiLCJ2ZXJzaW9uIiwidGltaW5ncyIsImNodW5rcyIsImNodW5rTW9kdWxlcyIsImNhY2hlZCIsImNhY2hlZEFzc2V0cyIsInB1YmxpY1BhdGgiLCJzb3VyY2VQcmVmaXgiLCJjb250ZXh0IiwidGFyZ2V0IiwiZ2V0VGFyZ2V0IiwiZW50cnkiLCJnZXRFbnRyeSIsImdldFJlc29sdmUiLCJvdXRwdXQiLCJnZXRPdXRwdXQiLCJtb2R1bGUiLCJnZXRNb2R1bGUiLCJnZXRQbHVnaW5zIiwiY2FjaGUiLCJzdGF0cyIsImdldFN0YXRzIiwicG9zdGNzcyIsImdldFBvc3Rjc3NNb2R1bGUiLCJ3aXRob3V0TWVyZ2UiLCJjb25maWciLCJnZXRQcmVDb25maWciLCJ3ZWJwYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGE7QUFFbkIsMkJBQXNCO0FBQUEsUUFBVkMsR0FBVSx1RUFBSixFQUFJOztBQUFBOztBQUNwQkMsV0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLEdBQXBCO0FBQ0Q7Ozs7a0NBRW9CO0FBQUEsd0NBQU5HLElBQU07QUFBTkEsWUFBTTtBQUFBOztBQUNuQixVQUFJLEtBQUtDLE9BQVQsRUFBa0IsT0FBTyxlQUFLQyxPQUFMLHdCQUFhLEtBQUtELE9BQWxCLFNBQThCRCxJQUE5QixFQUFQO0FBQ2xCLGFBQU8sZUFBS0UsT0FBTCx1QkFBZ0JGLElBQWhCLENBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsYUFBTyxLQUFLRyxHQUFMLElBQVksYUFBbkI7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBTyxLQUFLQyxLQUFMLElBQWMsSUFBckI7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLQyxPQUFMLElBQWdCLEtBQXZCO0FBQ0Q7OztpQ0FFWTtBQUNYLGFBQU87QUFDTCxnQ0FBd0JDLEtBQUtDLFNBQUwsQ0FBZSxLQUFLQyxNQUFMLEVBQWYsQ0FEbkI7QUFFTEMsaUJBQVNILEtBQUtDLFNBQUwsQ0FBZSxLQUFLQyxNQUFMLEVBQWYsQ0FGSjtBQUdMRSxpQkFBUyxLQUFLRixNQUFMLE9BQWtCLGFBSHRCO0FBSUxHLGtCQUFVLEtBQUtILE1BQUwsT0FBa0I7QUFKdkIsT0FBUDtBQU1EOzs7OENBRXlCO0FBQ3hCLGFBQU8sQ0FDTCxhQURLLEVBRUwsY0FGSyxFQUdMLGNBSEssRUFJTCxlQUpLLEVBS0wsZUFMSyxFQU1M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OztrQkF2VmtCMUYsYSIsImZpbGUiOiJXZWJwYWNrQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VicGFja0NvbmZpZyB7XG5cbiAgY29uc3RydWN0b3IoY3R4ID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGN0eClcbiAgfVxuXG4gIHJlc29sdmVQYXRoKC4uLmFyZ3MpIHtcbiAgICBpZiAodGhpcy5kaXJuYW1lKSByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuZGlybmFtZSwgLi4uYXJncylcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKC4uLmFyZ3MpXG4gIH1cblxuICBnZXRFbnYoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW52IHx8ICdkZXZlbG9wbWVudCdcbiAgfVxuXG4gIGlzRGVidWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVidWcgfHwgdHJ1ZVxuICB9XG5cbiAgaXNWZXJib3NlKCkge1xuICAgIHJldHVybiB0aGlzLnZlcmJvc2UgfHwgZmFsc2VcbiAgfVxuXG4gIGdldEdsb2JhbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0RW52KCkpLFxuICAgICAgX19FTlZfXzogSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRFbnYoKSksXG4gICAgICBfX0RFVl9fOiB0aGlzLmdldEVudigpID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgICAgX19QUk9EX186IHRoaXMuZ2V0RW52KCkgPT09ICdwcm9kdWN0aW9uJyxcbiAgICB9XG4gIH1cblxuICBnZXRBdXRvcHJlZml4ZXJCcm93c2VycygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ0FuZHJvaWQgMi4zJyxcbiAgICAgICdBbmRyb2lkID49IDQnLFxuICAgICAgJ0Nocm9tZSA+PSAzNScsXG4gICAgICAnRmlyZWZveCA+PSAzMScsXG4gICAgICAnRXhwbG9yZXIgPj0gOScsXG4gICAgICAnaU9TID49IDcnLFxuICAgICAgJ09wZXJhID49IDEyJyxcbiAgICAgICdTYWZhcmkgPj0gNy4xJyxcbiAgICBdXG4gIH1cblxuICBnZXREZXBzKCkge1xuICAgIHJldHVybiB0aGlzLmRlcHMgfHwgW11cbiAgfVxuXG4gIGdldFBvc3Rjc3NNb2R1bGUoYnVuZGxlcikge1xuICAgIHJldHVybiB7XG4gICAgICBkZWZhdWx0OiBbXG4gICAgICAgIC8vIFRyYW5zZmVyIEBpbXBvcnQgcnVsZSBieSBpbmxpbmluZyBjb250ZW50LCBlLmcuIEBpbXBvcnQgJ25vcm1hbGl6ZS5jc3MnXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N0Y3NzL3Bvc3Rjc3MtaW1wb3J0XG4gICAgICAgIHJlcXVpcmUoJ3Bvc3Rjc3MtaW1wb3J0Jykoe1xuICAgICAgICAgIGFkZERlcGVuZGVuY3lUbzogYnVuZGxlcixcbiAgICAgICAgICBwYXRoOiBbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQYXRoKCdzcmMnKSxcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVwcygpLm1hcChkZXAgPT4gZGVwLnBhdGgpLFxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUGF0aCgnbm9kZV9tb2R1bGVzJyksXG4gICAgICAgICAgXSxcbiAgICAgICAgICB0cmlnZ2VyOiAnJicsXG4gICAgICAgICAgcmVzb2x2ZTogcmVxdWlyZSgnLi91dGlscy9yZXNvbHZlLWlkJyksXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBXM0MgdmFyaWFibGVzLCBlLmcuIDpyb290IHsgLS1jb2xvcjogcmVkOyB9IGRpdiB7IGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTsgfVxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9zdGNzcy9wb3N0Y3NzLWN1c3RvbS1wcm9wZXJ0aWVzXG4gICAgICAgIHJlcXVpcmUoJ3Bvc3Rjc3MtbWl4aW5zJykoKSxcbiAgICAgICAgcmVxdWlyZSgncG9zdGNzcy1jdXN0b20tcHJvcGVydGllcycpKCksXG4gICAgICAgIC8vIFczQyBDU1MgQ3VzdG9tIE1lZGlhIFF1ZXJpZXMsIGUuZy4gQGN1c3RvbS1tZWRpYSAtLXNtYWxsLXZpZXdwb3J0IChtYXgtd2lkdGg6IDMwZW0pO1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9zdGNzcy9wb3N0Y3NzLWN1c3RvbS1tZWRpYVxuICAgICAgICByZXF1aXJlKCdwb3N0Y3NzLWN1c3RvbS1tZWRpYScpKCksXG4gICAgICAgIC8vIENTUzQgTWVkaWEgUXVlcmllcywgZS5nLiBAbWVkaWEgc2NyZWVuIGFuZCAod2lkdGggPj0gNTAwcHgpIGFuZCAod2lkdGggPD0gMTIwMHB4KSB7IH1cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bvc3Rjc3MvcG9zdGNzcy1tZWRpYS1taW5tYXhcbiAgICAgICAgcmVxdWlyZSgncG9zdGNzcy1tZWRpYS1taW5tYXgnKSgpLFxuICAgICAgICAvLyBXM0MgQ1NTIEN1c3RvbSBTZWxlY3RvcnMsIGUuZy4gQGN1c3RvbS1zZWxlY3RvciA6LS1oZWFkaW5nIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDY7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N0Y3NzL3Bvc3Rjc3MtY3VzdG9tLXNlbGVjdG9yc1xuICAgICAgICByZXF1aXJlKCdwb3N0Y3NzLWN1c3RvbS1zZWxlY3RvcnMnKSgpLFxuICAgICAgICAvLyBXM0MgY2FsYygpIGZ1bmN0aW9uLCBlLmcuIGRpdiB7IGhlaWdodDogY2FsYygxMDBweCAtIDJlbSk7IH1cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bvc3Rjc3MvcG9zdGNzcy1jYWxjXG4gICAgICAgIHJlcXVpcmUoJ3Bvc3Rjc3MtY2FsYycpKCksXG4gICAgICAgIC8vIEFsbG93cyB5b3UgdG8gbmVzdCBvbmUgc3R5bGUgcnVsZSBpbnNpZGUgYW5vdGhlclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9wb3N0Y3NzLW5lc3RpbmdcbiAgICAgICAgcmVxdWlyZSgncG9zdGNzcy1uZXN0aW5nJykoKSxcbiAgICAgICAgLy8gVzNDIGNvbG9yKCkgZnVuY3Rpb24sIGUuZy4gZGl2IHsgYmFja2dyb3VuZDogY29sb3IocmVkIGFscGhhKDkwJSkpOyB9XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N0Y3NzL3Bvc3Rjc3MtY29sb3ItZnVuY3Rpb25cbiAgICAgICAgcmVxdWlyZSgncG9zdGNzcy1jb2xvci1mdW5jdGlvbicpKCksXG4gICAgICAgIC8vIENvbnZlcnQgQ1NTIHNob3J0aGFuZCBmaWx0ZXJzIHRvIFNWRyBlcXVpdmFsZW50LCBlLmcuIC5ibHVyIHsgZmlsdGVyOiBibHVyKDRweCk7IH1cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2lhbXZkby9wbGVlZWFzZS1maWx0ZXJzXG4gICAgICAgIHJlcXVpcmUoJ3BsZWVlYXNlLWZpbHRlcnMnKSgpLFxuICAgICAgICAvLyBHZW5lcmF0ZSBwaXhlbCBmYWxsYmFjayBmb3IgXCJyZW1cIiB1bml0cywgZS5nLiBkaXYgeyBtYXJnaW46IDIuNXJlbSAycHggM2VtIDEwMCU7IH1cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JvYndpZXJ6Ym93c2tpL25vZGUtcGl4cmVtXG4gICAgICAgIHJlcXVpcmUoJ3BpeHJlbScpKCksXG4gICAgICAgIC8vIFczQyBDU1MgTGV2ZWw0IDptYXRjaGVzKCkgcHNldWRvIGNsYXNzLCBlLmcuIHA6bWF0Y2hlcyg6Zmlyc3QtY2hpbGQsIC5zcGVjaWFsKSB7IH1cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bvc3Rjc3MvcG9zdGNzcy1zZWxlY3Rvci1tYXRjaGVzXG4gICAgICAgIHJlcXVpcmUoJ3Bvc3Rjc3Mtc2VsZWN0b3ItbWF0Y2hlcycpKCksXG4gICAgICAgIC8vIFRyYW5zZm9ybXMgOm5vdCgpIFczQyBDU1MgTGV2ZWwgNCBwc2V1ZG8gY2xhc3MgdG8gOm5vdCgpIENTUyBMZXZlbCAzIHNlbGVjdG9yc1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9zdGNzcy9wb3N0Y3NzLXNlbGVjdG9yLW5vdFxuICAgICAgICByZXF1aXJlKCdwb3N0Y3NzLXNlbGVjdG9yLW5vdCcpKCksXG4gICAgICAgIC8vIEFkZCB2ZW5kb3IgcHJlZml4ZXMgdG8gQ1NTIHJ1bGVzIHVzaW5nIHZhbHVlcyBmcm9tIGNhbml1c2UuY29tXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N0Y3NzL2F1dG9wcmVmaXhlclxuICAgICAgICByZXF1aXJlKCdhdXRvcHJlZml4ZXInKSh7IGJyb3dzZXJzOiB0aGlzLmdldEF1dG9wcmVmaXhlckJyb3dzZXJzKCkgfSksXG4gICAgICBdLFxuICAgICAgc2FzczogW1xuICAgICAgICByZXF1aXJlKCdhdXRvcHJlZml4ZXInKSh7IGJyb3dzZXJzOiB0aGlzLmdldEF1dG9wcmVmaXhlckJyb3dzZXJzKCkgfSksXG4gICAgICBdLFxuICAgIH07XG4gIH1cbiAgZ2V0SnN4TG9hZGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXN0OiAvXFwuKGpzeHxqcyk/JC8sXG4gICAgICBsb2FkZXI6ICdiYWJlbC1sb2FkZXInLFxuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAuLi50aGlzLmdldERlcHMoKS5tYXAoZGVwID0+IGRlcC5wYXRoKSxcbiAgICAgICAgdGhpcy5yZXNvbHZlUGF0aCgnc3JjJyksXG4gICAgICBdLFxuICAgICAgLy8gZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sXG4gICAgICBxdWVyeToge1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwtbG9hZGVyI29wdGlvbnNcbiAgICAgICAgY2FjaGVEaXJlY3Rvcnk6IHRoaXMuaXNEZWJ1ZygpLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vYmFiZWxqcy5pby9kb2NzL3VzYWdlL29wdGlvbnMvXG4gICAgICAgIGJhYmVscmM6IGZhbHNlLFxuICAgICAgICBwcmVzZXRzOiBbXG4gICAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgICAnZXMyMDE1JyxcbiAgICAgICAgICAnc3RhZ2UtMCcsXG4gICAgICAgIF0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAnanN4LWNvbnRyb2wtc3RhdGVtZW50cycsXG4gICAgICAgICAgJ3JlYWN0LXJlcXVpcmUnLFxuICAgICAgICAgICd0cmFuc2Zvcm0tZGVjb3JhdG9ycy1sZWdhY3knLFxuXG4gICAgICAgICAgJ3RyYW5zZm9ybS1ydW50aW1lJyxcbiAgICAgICAgICAuLi4gKHRoaXMuaXNEZWJ1ZygpID8gW10gOiBbXG4gICAgICAgICAgICAndHJhbnNmb3JtLXJlYWN0LXJlbW92ZS1wcm9wLXR5cGVzJyxcbiAgICAgICAgICAgICd0cmFuc2Zvcm0tcmVhY3QtY29uc3RhbnQtZWxlbWVudHMnLFxuICAgICAgICAgICAgLy8gJ3RyYW5zZm9ybS1yZWFjdC1pbmxpbmUtZWxlbWVudHMnLFxuICAgICAgICAgIF0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9XG4gIH1cbiAgZ2V0Q3NzTG9hZGVycygpIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuZ2xvYmFsXFwuY3NzJC8sXG4gICAgICAgIGxvYWRlcnM6IFtcbiAgICAgICAgICAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXInLFxuICAgICAgICAgIGBjc3MtbG9hZGVyPyR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc291cmNlTWFwOiB0aGlzLmlzRGVidWcoKSxcbiAgICAgICAgICAgIC8vIENTUyBNb2R1bGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9jc3MtbW9kdWxlcy9jc3MtbW9kdWxlc1xuICAgICAgICAgICAgbW9kdWxlczogZmFsc2UsXG4gICAgICAgICAgICAvLyBsb2NhbElkZW50TmFtZTogdGhpcy5pc0RlYnVnKCkgPyAnW25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdJyA6ICdbaGFzaDpiYXNlNjQ6NF0nLFxuICAgICAgICAgICAgLy8gQ1NTIE5hbm8gaHR0cDovL2Nzc25hbm8uY28vb3B0aW9ucy9cbiAgICAgICAgICAgIG1pbmltaXplOiAhdGhpcy5pc0RlYnVnKCksXG4gICAgICAgICAgfSl9YCxcbiAgICAgICAgICAvLyAncG9zdGNzcy1sb2FkZXI/cGFjaz1kZWZhdWx0JyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgZXhjbHVkZTogLyhnbG9iYWwuY3NzKS8sXG4gICAgICAgIGxvYWRlcnM6IFtcbiAgICAgICAgICAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXInLFxuICAgICAgICAgIGBjc3MtbG9hZGVyPyR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc291cmNlTWFwOiB0aGlzLmlzRGVidWcoKSxcbiAgICAgICAgICAgIC8vIENTUyBNb2R1bGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9jc3MtbW9kdWxlcy9jc3MtbW9kdWxlc1xuICAgICAgICAgICAgbW9kdWxlczogdHJ1ZSxcbiAgICAgICAgICAgIGxvY2FsSWRlbnROYW1lOiB0aGlzLmlzRGVidWcoKSA/ICdbbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10nIDogJ1toYXNoOmJhc2U2NDo0XScsXG4gICAgICAgICAgICAvLyBDU1MgTmFubyBodHRwOi8vY3NzbmFuby5jby9vcHRpb25zL1xuICAgICAgICAgICAgbWluaW1pemU6ICF0aGlzLmlzRGVidWcoKSxcbiAgICAgICAgICB9KX1gLFxuICAgICAgICAgICdwb3N0Y3NzLWxvYWRlcj9wYWNrPWRlZmF1bHQnLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLihfcGNzcykvLFxuICAgICAgICBsb2FkZXJzOiBbXG4gICAgICAgICAgJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyJyxcbiAgICAgICAgICBgY3NzLWxvYWRlcj8ke0pTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNvdXJjZU1hcDogdGhpcy5pc0RlYnVnKCksXG4gICAgICAgICAgICAvLyBDU1MgTW9kdWxlcyBodHRwczovL2dpdGh1Yi5jb20vY3NzLW1vZHVsZXMvY3NzLW1vZHVsZXNcbiAgICAgICAgICAgIG1vZHVsZXM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gbG9jYWxJZGVudE5hbWU6IHRoaXMuaXNEZWJ1ZygpID8gJ1tuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXScgOiAnW2hhc2g6YmFzZTY0OjRdJyxcbiAgICAgICAgICAgIC8vIENTUyBOYW5vIGh0dHA6Ly9jc3NuYW5vLmNvL29wdGlvbnMvXG4gICAgICAgICAgICBtaW5pbWl6ZTogIXRoaXMuaXNEZWJ1ZygpLFxuICAgICAgICAgIH0pfWAsXG4gICAgICAgICAgJ3Bvc3Rjc3MtbG9hZGVyP3BhY2s9ZGVmYXVsdCcsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0ZXN0OiAvXFwuc2NzcyQvLFxuICAgICAgLy8gICBsb2FkZXJzOiBbXG4gICAgICAvLyAgICAgJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyJyxcbiAgICAgIC8vICAgICBgY3NzLWxvYWRlcj8ke0pTT04uc3RyaW5naWZ5KHsgc291cmNlTWFwOiB0aGlzLmlzRGVidWcoKSwgbWluaW1pemU6ICF0aGlzLmlzRGVidWcoKSB9KX1gLFxuICAgICAgLy8gICAgICdwb3N0Y3NzLWxvYWRlcj9wYWNrPXNhc3MnLFxuICAgICAgLy8gICAgICdzYXNzLWxvYWRlcicsXG4gICAgICAvLyAgIF0sXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuc2NzcyQvLFxuICAgICAgICBsb2FkZXJzOiBbXG4gICAgICAgICAgJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyJyxcbiAgICAgICAgICBgY3NzLWxvYWRlcj8ke0pTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNvdXJjZU1hcDogdGhpcy5pc0RlYnVnKCksXG4gICAgICAgICAgICAvLyBDU1MgTW9kdWxlcyBodHRwczovL2dpdGh1Yi5jb20vY3NzLW1vZHVsZXMvY3NzLW1vZHVsZXNcbiAgICAgICAgICAgIG1vZHVsZXM6IHRydWUsXG4gICAgICAgICAgICBsb2NhbElkZW50TmFtZTogdGhpcy5pc0RlYnVnKCkgPyAnW25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdJyA6ICdbaGFzaDpiYXNlNjQ6NF0nLFxuICAgICAgICAgICAgLy8gQ1NTIE5hbm8gaHR0cDovL2Nzc25hbm8uY28vb3B0aW9ucy9cbiAgICAgICAgICAgIG1pbmltaXplOiAhdGhpcy5pc0RlYnVnKCksXG4gICAgICAgICAgfSl9YCxcbiAgICAgICAgICAncG9zdGNzcy1sb2FkZXI/cGFjaz1zYXNzJyxcbiAgICAgICAgICAnc2Fzcy1sb2FkZXInLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLnN0eWwkLyxcbiAgICAgICAgbG9hZGVyczogW1xuICAgICAgICAgICdpc29tb3JwaGljLXN0eWxlLWxvYWRlcicsXG4gICAgICAgICAgYGNzcy1sb2FkZXI/JHtKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzb3VyY2VNYXA6IHRoaXMuaXNEZWJ1ZygpLFxuICAgICAgICAgICAgLy8gQ1NTIE1vZHVsZXMgaHR0cHM6Ly9naXRodWIuY29tL2Nzcy1tb2R1bGVzL2Nzcy1tb2R1bGVzXG4gICAgICAgICAgICBtb2R1bGVzOiB0cnVlLFxuICAgICAgICAgICAgbG9jYWxJZGVudE5hbWU6IHRoaXMuaXNEZWJ1ZygpID8gJ1tuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXScgOiAnW2hhc2g6YmFzZTY0OjRdJyxcbiAgICAgICAgICAgIC8vIENTUyBOYW5vIGh0dHA6Ly9jc3NuYW5vLmNvL29wdGlvbnMvXG4gICAgICAgICAgICBtaW5pbWl6ZTogIXRoaXMuaXNEZWJ1ZygpLFxuICAgICAgICAgIH0pfWAsXG4gICAgICAgICAgJ3Bvc3Rjc3MtbG9hZGVyP3BhY2s9c2FzcycsXG4gICAgICAgICAgJ3N0eWx1cycsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF1cbiAgfVxuICBnZXRMb2FkZXJzKCkge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmdldEpzeExvYWRlcigpLFxuICAgICAgLi4udGhpcy5nZXRDc3NMb2FkZXJzKCksXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5qc29uJC8sXG4gICAgICAgIGxvYWRlcjogJ2pzb24tbG9hZGVyJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC4ocG5nfGpwZ3xqcGVnfGdpZnxzdmd8d29mZnx3b2ZmMikkLyxcbiAgICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcicsXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgbmFtZTogdGhpcy5pc0RlYnVnKCkgPyAnW3BhdGhdW25hbWVdLltleHRdP1toYXNoXScgOiAnW2hhc2hdLltleHRdJyxcbiAgICAgICAgICBsaW1pdDogMTAwMDAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuKGVvdHx0dGZ8d2F2fG1wMykkLyxcbiAgICAgICAgbG9hZGVyOiAnZmlsZS1sb2FkZXInLFxuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG5hbWU6IHRoaXMuaXNEZWJ1ZygpID8gJ1twYXRoXVtuYW1lXS5bZXh0XT9baGFzaF0nIDogJ1toYXNoXS5bZXh0XScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF1cbiAgfVxuXG4gIGdldE1vZHVsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9hZGVyczogdGhpcy5nZXRMb2FkZXJzKCksXG4gICAgfVxuICB9XG5cbiAgZ2V0UGx1Z2lucygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gRGVmaW5lIGZyZWUgdmFyaWFibGVzXG4gICAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvbGlzdC1vZi1wbHVnaW5zLmh0bWwjZGVmaW5lcGx1Z2luXG4gICAgICBuZXcgd2VicGFjay5EZWZpbmVQbHVnaW4odGhpcy5nZXRHbG9iYWxzKCkpLFxuICAgIF1cbiAgfVxuXG4gIGdldFJlc29sdmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvb3Q6IHRoaXMucmVzb2x2ZVBhdGgoJ3NyYycpLFxuICAgICAgYWxpYXM6IHRoaXMuZ2V0UmVzb2x2ZUFsaWFzKCksXG4gICAgICBtb2R1bGVzRGlyZWN0b3JpZXM6IFsnbm9kZV9tb2R1bGVzJ10sXG4gICAgICBleHRlbnNpb25zOiB0aGlzLmdldFJlc29sdmVFeHRlbnNpb25zKCksXG4gICAgfVxuICB9XG5cbiAgZ2V0UmVzb2x2ZUV4dGVuc2lvbnMoKSB7XG4gICAgcmV0dXJuIFsnJywgJy53ZWJwYWNrLmpzJywgJy53ZWIuanMnLCAnLmpzJywgJy5qc3gnLCAnLmpzb24nXVxuICB9XG5cbiAgZ2V0UmVzb2x2ZUFsaWFzKCkge1xuICAgIGNvbnN0IGFsaWFzID0ge1xuICAgICAgJ34nOiB0aGlzLnJlc29sdmVQYXRoKCdzcmMnKSxcbiAgICB9XG4gICAgdGhpcy5nZXREZXBzKCkuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgYWxpYXNbZGVwLm5hbWVdID0gZGVwLnBhdGhcbiAgICB9KVxuICAgIHJldHVybiBhbGlhc1xuICB9XG5cbiAgZ2V0U3RhdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yczogdHJ1ZSxcbiAgICAgIHJlYXNvbnM6IHRoaXMuaXNEZWJ1ZygpLFxuICAgICAgaGFzaDogdGhpcy5pc1ZlcmJvc2UoKSxcbiAgICAgIHZlcnNpb246IHRoaXMuaXNWZXJib3NlKCksXG4gICAgICB0aW1pbmdzOiB0cnVlLFxuICAgICAgY2h1bmtzOiB0aGlzLmlzVmVyYm9zZSgpLFxuICAgICAgY2h1bmtNb2R1bGVzOiB0aGlzLmlzVmVyYm9zZSgpLFxuICAgICAgY2FjaGVkOiB0aGlzLmlzVmVyYm9zZSgpLFxuICAgICAgY2FjaGVkQXNzZXRzOiB0aGlzLmlzVmVyYm9zZSgpLFxuICAgIH1cbiAgfVxuXG4gIGdldEVudHJ5KCkge1xuICAgIHJldHVybiAnaW5kZXguanMnXG4gIH1cblxuICBnZXRPdXRwdXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IHRoaXMucmVzb2x2ZVBhdGgoJ2J1aWxkL3B1YmxpYy9hc3NldHMnKSxcbiAgICAgIHB1YmxpY1BhdGg6ICcvYXNzZXRzLycsXG4gICAgICBzb3VyY2VQcmVmaXg6ICcgICcsXG4gICAgfVxuICB9XG5cbiAgZ2V0UHJlQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb250ZXh0OiB0aGlzLnJlc29sdmVQYXRoKCdzcmMnKSxcbiAgICAgIHRhcmdldDogdGhpcy5nZXRUYXJnZXQoKSxcbiAgICAgIGVudHJ5OiB0aGlzLmdldEVudHJ5KCksXG4gICAgICByZXNvbHZlOiB0aGlzLmdldFJlc29sdmUoKSxcbiAgICAgIG91dHB1dDogdGhpcy5nZXRPdXRwdXQoKSxcbiAgICAgIG1vZHVsZTogdGhpcy5nZXRNb2R1bGUoKSxcbiAgICAgIHBsdWdpbnM6IHRoaXMuZ2V0UGx1Z2lucygpLFxuICAgICAgY2FjaGU6IHRoaXMuaXNEZWJ1ZygpLFxuICAgICAgZGVidWc6IHRoaXMuaXNEZWJ1ZygpLFxuICAgICAgc3RhdHM6IHRoaXMuZ2V0U3RhdHMoKSxcbiAgICAgIHBvc3Rjc3M6ICguLi5hcmdzKSA9PiB0aGlzLmdldFBvc3Rjc3NNb2R1bGUoLi4uYXJncyksXG4gICAgfVxuICB9XG5cbiAgZ2V0Q29uZmlnKHdpdGhvdXRNZXJnZSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0UHJlQ29uZmlnKClcbiAgICBpZiAoIXRoaXMud2VicGFjayB8fCB3aXRob3V0TWVyZ2UpIHJldHVybiBjb25maWdcbiAgICAvLyByZXR1cm4gT2JqZWN0LmV4dGVuZCh7fSwgY29uZmlnLCB0aGlzLndlYnBhY2spXG4gICAgcmV0dXJuIGV4dGVuZCh0cnVlLCBjb25maWcsIHRoaXMud2VicGFjaylcbiAgfVxuXG59XG4iXX0=