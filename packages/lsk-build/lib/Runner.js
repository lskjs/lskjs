'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _gitRepository = require('git-repository');

var _gitRepository2 = _interopRequireDefault(_gitRepository);

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMiddleware = require('webpack-middleware');

var _webpackMiddleware2 = _interopRequireDefault(_webpackMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fetch = require('./utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _fs = require('./utils/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var host = 'localhost';

var Runner = function () {
  function Runner() {
    var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Runner);

    Object.assign(this, ctx);
  }

  _createClass(Runner, [{
    key: 'resolvePath',
    value: function resolvePath() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (this.dirname) return _path2.default.resolve.apply(_path2.default, [this.dirname].concat(args));
      return _path2.default.resolve.apply(_path2.default, args);
    }
  }, {
    key: 'start',
    value: function start() {
      return require('tools/start').default(this);
    }
  }, {
    key: 'clean',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _del2.default)(['.tmp', 'build/*', '!build/.git'], { dot: true });

              case 2:
                _context.next = 4;
                return _fs2.default.makeDir('build/public');

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function clean() {
        return _ref.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: 'copy',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var watch = _ref3.watch;

        var ncp, watcher, _cp;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ncp = _bluebird2.default.promisify(require('ncp'));
                _context3.next = 3;
                return _bluebird2.default.all([
                  // ncp('src/public', 'build/public'),
                  // ncp('src/content', 'build/content'),
                ]);

              case 3:
                _context3.next = 5;
                return _fs2.default.writeFile(this.resolvePath('build/package.json'), JSON.stringify({
                  private: true,
                  engines: this.pkg.engines,
                  dependencies: this.pkg.dependencies,
                  scripts: {
                    start: 'node server.js'
                  }
                }, null, 2));

              case 5:
                if (!watch) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 8;
                return new _bluebird2.default(function (resolve, reject) {
                  (0, _gaze2.default)('src/content/**/*.*', function (err, val) {
                    return err ? reject(err) : resolve(val);
                  });
                });

              case 8:
                watcher = _context3.sent;

                _cp = function () {
                  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(file) {
                    var relPath;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            relPath = file.substr(_this.resolvePath('src/content/').length);
                            _context2.next = 3;
                            return ncp('src/content/' + relPath, 'build/content/' + relPath);

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function _cp(_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                watcher.on('changed', _cp);
                watcher.on('added', _cp);

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function copy(_x2) {
        return _ref2.apply(this, arguments);
      }

      return copy;
    }()
  }, {
    key: 'build',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.clean();

              case 2:
                _context4.next = 4;
                return this.copy();

              case 4:
                _context4.next = 6;
                return this.bundle();

              case 6:
                if (!process.argv.includes('--static')) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 9;
                return this.render();

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function build() {
        return _ref5.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'bundle',
    value: function bundle() {
      var _this2 = this;

      return new _bluebird2.default(function (resolve, reject) {
        (0, _webpack2.default)(_this2.webpackConfig).run(function (err, stats) {
          if (err) {
            return reject(err);
          }

          console.log(stats.toString(_this2.webpackConfig[0].stats));
          return resolve();
        });
      });
    }

    /**
     * Deploy the contents of the `/build` folder to a remote
     * server via Git. Example: `npm run deploy -- production`
     */

  }, {
    key: 'deploy',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var getRemote, remote, repo, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:

                // TODO: Update deployment URL
                // For more information visit http://gitolite.com/deploy.html
                getRemote = function getRemote(slot) {
                  return {
                    name: slot || 'production',
                    url: 'https://example' + (slot ? '-' + slot : '') + '.scm.azurewebsites.net:443/example.git',
                    website: 'http://example' + (slot ? '-' + slot : '') + '.azurewebsites.net'
                  };
                };
                // By default deploy to the staging deployment slot


                remote = getRemote(process.argv.includes('--production') ? null : 'staging');

                // Initialize a new Git repository inside the `/build` folder
                // if it doesn't exist yet

                _context5.next = 4;
                return _gitRepository2.default.open('build', { init: true });

              case 4:
                repo = _context5.sent;
                _context5.next = 7;
                return repo.setRemote(remote.name, remote.url);

              case 7:
                _context5.next = 9;
                return repo.hasRef(remote.url, 'master');

              case 9:
                if (!_context5.sent) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 12;
                return repo.fetch(remote.name);

              case 12:
                _context5.next = 14;
                return repo.reset(remote.name + '/master', { hard: true });

              case 14:
                _context5.next = 16;
                return repo.clean({ force: true });

              case 16:

                // Build the project in RELEASE mode which
                // generates optimized and minimized bundles
                process.argv.push('--release');
                _context5.next = 19;
                return run(require('./build'));

              case 19:
                _context5.next = 21;
                return repo.add('--all .');

              case 21:
                _context5.next = 23;
                return repo.commit('Update');

              case 23:
                _context5.next = 25;
                return repo.push(remote.name, 'master');

              case 25:
                _context5.next = 27;
                return (0, _nodeFetch2.default)(remote.website);

              case 27:
                response = _context5.sent;

                console.log(remote.website + ' -> ' + response.statusCode);

              case 29:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deploy() {
        return _ref6.apply(this, arguments);
      }

      return deploy;
    }()
  }, {
    key: 'render',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(routes) {
        var _this3 = this;

        var server;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!routes) {
                  routes = ['/', '/contact', '/login', '/register', '/about', '/privacy', '/404'];
                }
                server = void 0;
                _context7.next = 4;
                return new _bluebird2.default(function (resolve) {
                  return server = _this3.runServer(resolve);
                });

              case 4:
                _context7.next = 6;
                return routes.reduce(function (promise, route) {
                  return promise.then(_asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
                    var url, dir, name, dist, res, text;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            url = 'http://' + host + route;
                            dir = 'build/public' + route.replace(/[^\/]*$/, '');
                            name = route.endsWith('/') ? 'index.html' : route.match(/[^/]+$/)[0] + '.html';
                            dist = '' + dir + name;
                            _context6.next = 6;
                            return (0, _nodeFetch2.default)(url);

                          case 6:
                            res = _context6.sent;
                            _context6.next = 9;
                            return res.text();

                          case 9:
                            text = _context6.sent;
                            _context6.next = 12;
                            return _fs2.default.makeDir(dir);

                          case 12:
                            _context6.next = 14;
                            return _fs2.default.writeFile(dist, text);

                          case 14:
                            console.log(dist + ' => ' + res.status + ' ' + res.statusText);

                          case 15:
                          case 'end':
                            return _context6.stop();
                        }
                      }
                    }, _callee6, _this3);
                  })));
                }, _bluebird2.default.resolve());

              case 6:

                server.kill('SIGTERM');

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function render(_x5) {
        return _ref7.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'format',
    value: function format(time) {
      return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    }
  }, {
    key: 'run',
    value: function run(fn, options) {
      var task = typeof fn.default === 'undefined' ? fn : fn.default;
      var start = new Date();
      console.log('[' + format(start) + '] Starting \'' + task.name + (options ? '(' + options + ')' : '') + '\'...');
      return task(options).then(function () {
        var end = new Date();
        var time = end.getTime() - start.getTime();
        console.log('[' + format(end) + '] Finished \'' + task.name + (options ? '(' + options + ')' : '') + '\' after ' + time + ' ms');
      });
    }
  }, {
    key: 'start',
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(ctx) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log('start');
                _context8.next = 3;
                return this.clean();

              case 3:
                _context8.next = 5;
                return this.copy({ watch: true });

              case 5:
                _context8.next = 7;
                return new _bluebird2.default(function (resolve) {
                  // Patch the client-side bundle configurations
                  // to enable Hot Module Replacement (HMR) and React Transform


                  var webpackConfig = _this4.webpackConfig;
                  var bundler = (0, _webpack2.default)(webpackConfig);
                  var wpMiddleware = (0, _webpackMiddleware2.default)(bundler, {
                    // IMPORTANT: webpack middleware can't access config,
                    // so we should provide publicPath by ourselves
                    publicPath: webpackConfig[0].output.publicPath,

                    // Pretty colored output
                    stats: webpackConfig[0].stats

                  });
                  var hotMiddlewares = bundler.compilers.filter(function (compiler) {
                    return compiler.options.target !== 'node';
                  }).map(function (compiler) {
                    return (0, _webpackHotMiddleware2.default)(compiler);
                  });

                  var _handleServerBundleComplete = function handleServerBundleComplete() {
                    _this4.runServer(function (err, host) {
                      if (!err) {
                        var bs = _browserSync2.default.create();
                        bs.init(_extends({}, _this4.debug ? {} : { notify: false, ui: false }, {

                          proxy: {
                            target: host,
                            middleware: [wpMiddleware].concat(_toConsumableArray(hotMiddlewares))
                          },

                          // no need to watch '*.js' here, webpack will take care of it for us,
                          // including full page reloads if HMR won't work
                          files: ['build/content/**/*.*']
                        }), resolve);
                        _handleServerBundleComplete = function handleServerBundleComplete() {
                          return _this4.runServer();
                        };
                      }
                    });
                  };

                  bundler.plugin('done', function () {
                    return _handleServerBundleComplete();
                  });
                });

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function start(_x6) {
        return _ref9.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'runServer',
    value: function runServer(cb) {
      var _this5 = this;

      var RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;

      var onStdOut = function onStdOut(data) {
        var time = new Date().toTimeString();
        var match = data.toString('utf8').match(RUNNING_REGEXP);

        // process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
        // process.stdout.write(data);
        process.stdout.write(data.toString('utf8'));
        if (match) {
          _this5.server.stdout.removeListener('data', onStdOut);
          _this5.server.stdout.on('data', function (x) {
            return process.stdout.write(x);
          });
          if (cb) {
            cb(null, match[1]);
          }
        }
      };

      if (this.server) {
        this.server.kill('SIGTERM');
      }

      var _webpackConfig$find = this.webpackConfig.find(function (x) {
        return x.target === 'node';
      });

      var output = _webpackConfig$find.output;

      var serverPath = _path2.default.join(output.path, output.filename);
      this.server = _child_process2.default.spawn('node', [serverPath], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false
      });
      this.server.stdout.on('data', onStdOut);
      this.server.stderr.on('data', function (x) {
        return process.stderr.write(x);
      });
      return this.server;
    }
  }]);

  return Runner;
}();

// process.on('exit', () => {
//   if (server) {
//     server.kill('SIGTERM');
//   }
// });


exports.default = Runner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdW5uZXIuanMiXSwibmFtZXMiOlsiaG9zdCIsIlJ1bm5lciIsImN0eCIsIk9iamVjdCIsImFzc2lnbiIsImFyZ3MiLCJkaXJuYW1lIiwicmVzb2x2ZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwiZG90IiwibWFrZURpciIsIndhdGNoIiwibmNwIiwicHJvbWlzaWZ5IiwiYWxsIiwid3JpdGVGaWxlIiwicmVzb2x2ZVBhdGgiLCJKU09OIiwic3RyaW5naWZ5IiwicHJpdmF0ZSIsImVuZ2luZXMiLCJwa2ciLCJkZXBlbmRlbmNpZXMiLCJzY3JpcHRzIiwic3RhcnQiLCJyZWplY3QiLCJlcnIiLCJ2YWwiLCJ3YXRjaGVyIiwiY3AiLCJmaWxlIiwicmVsUGF0aCIsInN1YnN0ciIsImxlbmd0aCIsIm9uIiwiY2xlYW4iLCJjb3B5IiwiYnVuZGxlIiwicHJvY2VzcyIsImFyZ3YiLCJpbmNsdWRlcyIsInJlbmRlciIsIndlYnBhY2tDb25maWciLCJydW4iLCJzdGF0cyIsImNvbnNvbGUiLCJsb2ciLCJ0b1N0cmluZyIsImdldFJlbW90ZSIsInNsb3QiLCJuYW1lIiwidXJsIiwid2Vic2l0ZSIsInJlbW90ZSIsIm9wZW4iLCJpbml0IiwicmVwbyIsInNldFJlbW90ZSIsImhhc1JlZiIsImZldGNoIiwicmVzZXQiLCJoYXJkIiwiZm9yY2UiLCJwdXNoIiwiYWRkIiwiY29tbWl0IiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwicm91dGVzIiwic2VydmVyIiwicnVuU2VydmVyIiwicmVkdWNlIiwicHJvbWlzZSIsInJvdXRlIiwidGhlbiIsImRpciIsInJlcGxhY2UiLCJlbmRzV2l0aCIsIm1hdGNoIiwiZGlzdCIsInJlcyIsInRleHQiLCJzdGF0dXMiLCJzdGF0dXNUZXh0Iiwia2lsbCIsInRpbWUiLCJ0b1RpbWVTdHJpbmciLCJmbiIsIm9wdGlvbnMiLCJ0YXNrIiwiRGF0ZSIsImZvcm1hdCIsImVuZCIsImdldFRpbWUiLCJidW5kbGVyIiwid3BNaWRkbGV3YXJlIiwicHVibGljUGF0aCIsIm91dHB1dCIsImhvdE1pZGRsZXdhcmVzIiwiY29tcGlsZXJzIiwiZmlsdGVyIiwiY29tcGlsZXIiLCJ0YXJnZXQiLCJtYXAiLCJoYW5kbGVTZXJ2ZXJCdW5kbGVDb21wbGV0ZSIsImJzIiwiY3JlYXRlIiwiZGVidWciLCJub3RpZnkiLCJ1aSIsInByb3h5IiwibWlkZGxld2FyZSIsImZpbGVzIiwicGx1Z2luIiwiY2IiLCJSVU5OSU5HX1JFR0VYUCIsIm9uU3RkT3V0IiwiZGF0YSIsInN0ZG91dCIsIndyaXRlIiwicmVtb3ZlTGlzdGVuZXIiLCJ4IiwiZmluZCIsInNlcnZlclBhdGgiLCJqb2luIiwicGF0aCIsImZpbGVuYW1lIiwic3Bhd24iLCJlbnYiLCJOT0RFX0VOViIsInNpbGVudCIsInN0ZGVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPLFdBQWI7O0lBRXFCQyxNO0FBRW5CLG9CQUFzQjtBQUFBLFFBQVZDLEdBQVUsdUVBQUosRUFBSTs7QUFBQTs7QUFDcEJDLFdBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixHQUFwQjtBQUNEOzs7O2tDQUVvQjtBQUFBLHdDQUFORyxJQUFNO0FBQU5BLFlBQU07QUFBQTs7QUFDbkIsVUFBSSxLQUFLQyxPQUFULEVBQWtCLE9BQU8sZUFBS0MsT0FBTCx3QkFBYSxLQUFLRCxPQUFsQixTQUE4QkQsSUFBOUIsRUFBUDtBQUNsQixhQUFPLGVBQUtFLE9BQUwsdUJBQWdCRixJQUFoQixDQUFQO0FBQ0Q7Ozs0QkFFTztBQUNOLGFBQU9HLFFBQVEsYUFBUixFQUF1QkMsT0FBdkIsQ0FBK0IsSUFBL0IsQ0FBUDtBQUNEOzs7Ozs7Ozs7O3VCQUdPLG1CQUFJLENBQUMsTUFBRCxFQUFTLFNB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akcsRUFBbkIsQ0FBc0IsTUFBdEIsRUFBOEI7QUFBQSxlQUFLSSxRQUFRNkYsTUFBUixDQUFlWixLQUFmLENBQXFCRSxDQUFyQixDQUFMO0FBQUEsT0FBOUI7QUFDQSxhQUFPLEtBQUtwRCxNQUFaO0FBQ0Q7Ozs7OztBQUlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztrQkF6UXFCckUsTSIsImZpbGUiOiJSdW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBkZWwgZnJvbSAnZGVsJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBHaXRSZXBvIGZyb20gJ2dpdC1yZXBvc2l0b3J5JztcbmltcG9ydCBnYXplIGZyb20gJ2dhemUnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEJyb3dzZXJzeW5jIGZyb20gJ2Jyb3dzZXItc3luYyc7XG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB3ZWJwYWNrTWlkZGxld2FyZSBmcm9tICd3ZWJwYWNrLW1pZGRsZXdhcmUnO1xuaW1wb3J0IHdlYnBhY2tIb3RNaWRkbGV3YXJlIGZyb20gJ3dlYnBhY2staG90LW1pZGRsZXdhcmUnO1xuaW1wb3J0IGNwIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgZmV0Y2gyIGZyb20gJy4vdXRpbHMvZmV0Y2gnO1xuaW1wb3J0IGZzIGZyb20gJy4vdXRpbHMvZnMnO1xuY29uc3QgaG9zdCA9ICdsb2NhbGhvc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5uZXIge1xuXG4gIGNvbnN0cnVjdG9yKGN0eCA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjdHgpXG4gIH1cblxuICByZXNvbHZlUGF0aCguLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuZGlybmFtZSkgcmV0dXJuIHBhdGgucmVzb2x2ZSh0aGlzLmRpcm5hbWUsIC4uLmFyZ3MpXG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZSguLi5hcmdzKVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJ3Rvb2xzL3N0YXJ0JykuZGVmYXVsdCh0aGlzKVxuICB9XG5cbiAgYXN5bmMgY2xlYW4oKSB7XG4gICAgYXdhaXQgZGVsKFsnLnRtcCcsICdidWlsZC8qJywgJyFidWlsZC8uZ2l0J10sIHsgZG90OiB0cnVlIH0pO1xuICAgIGF3YWl0IGZzLm1ha2VEaXIoJ2J1aWxkL3B1YmxpYycpO1xuICB9XG5cblxuIGFzeW5jIGNvcHkoeyB3YXRjaCB9ID0ge30pIHtcbiAgIGNvbnN0IG5jcCA9IFByb21pc2UucHJvbWlzaWZ5KHJlcXVpcmUoJ25jcCcpKTtcblxuICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAvLyBuY3AoJ3NyYy9wdWJsaWMnLCAnYnVpbGQvcHVibGljJyksXG4gICAgIC8vIG5jcCgnc3JjL2NvbnRlbnQnLCAnYnVpbGQvY29udGVudCcpLFxuICAgXSk7XG5cbiAgIGF3YWl0IGZzLndyaXRlRmlsZSh0aGlzLnJlc29sdmVQYXRoKCdidWlsZC9wYWNrYWdlLmpzb24nKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICBwcml2YXRlOiB0cnVlLFxuICAgICBlbmdpbmVzOiB0aGlzLnBrZy5lbmdpbmVzLFxuICAgICBkZXBlbmRlbmNpZXM6IHRoaXMucGtnLmRlcGVuZGVuY2llcyxcbiAgICAgc2NyaXB0czoge1xuICAgICAgIHN0YXJ0OiAnbm9kZSBzZXJ2ZXIuanMnLFxuICAgICB9LFxuICAgfSwgbnVsbCwgMikpO1xuXG4gICBpZiAod2F0Y2gpIHtcbiAgICAgY29uc3Qgd2F0Y2hlciA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICBnYXplKCdzcmMvY29udGVudC8qKi8qLionLCAoZXJyLCB2YWwpID0+IGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZSh2YWwpKTtcbiAgICAgfSk7XG5cbiAgICAgY29uc3QgY3AgPSBhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgIGNvbnN0IHJlbFBhdGggPSBmaWxlLnN1YnN0cih0aGlzLnJlc29sdmVQYXRoKCdzcmMvY29udGVudC8nKS5sZW5ndGgpO1xuICAgICAgIGF3YWl0IG5jcChgc3JjL2NvbnRlbnQvJHtyZWxQYXRofWAsIGBidWlsZC9jb250ZW50LyR7cmVsUGF0aH1gKTtcbiAgICAgfTtcblxuICAgICB3YXRjaGVyLm9uKCdjaGFuZ2VkJywgY3ApO1xuICAgICB3YXRjaGVyLm9uKCdhZGRlZCcsIGNwKTtcbiAgIH1cbiB9XG5cblxuXG4gIGFzeW5jIGJ1aWxkKCkge1xuICAgIGF3YWl0IHRoaXMuY2xlYW4oKTtcbiAgICBhd2FpdCB0aGlzLmNvcHkoKTtcbiAgICBhd2FpdCB0aGlzLmJ1bmRsZSgpO1xuXG4gICAgaWYgKHByb2Nlc3MuYXJndi5pbmNsdWRlcygnLS1zdGF0aWMnKSkge1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBidW5kbGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdlYnBhY2sodGhpcy53ZWJwYWNrQ29uZmlnKS5ydW4oKGVyciwgc3RhdHMpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHN0YXRzLnRvU3RyaW5nKHRoaXMud2VicGFja0NvbmZpZ1swXS5zdGF0cykpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIERlcGxveSB0aGUgY29udGVudHMgb2YgdGhlIGAvYnVpbGRgIGZvbGRlciB0byBhIHJlbW90ZVxuICAgKiBzZXJ2ZXIgdmlhIEdpdC4gRXhhbXBsZTogYG5wbSBydW4gZGVwbG95IC0tIHByb2R1Y3Rpb25gXG4gICAqL1xuICBhc3luYyAgZGVwbG95KCkge1xuXG4gICAgLy8gVE9ETzogVXBkYXRlIGRlcGxveW1lbnQgVVJMXG4gICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gdmlzaXQgaHR0cDovL2dpdG9saXRlLmNvbS9kZXBsb3kuaHRtbFxuICAgIGNvbnN0IGdldFJlbW90ZSA9IChzbG90KSA9PiAoe1xuICAgICAgbmFtZTogc2xvdCB8fCAncHJvZHVjdGlvbicsXG4gICAgICB1cmw6IGBodHRwczovL2V4YW1wbGUke3Nsb3QgPyBgLSR7c2xvdH1gIDogJyd9LnNjbS5henVyZXdlYnNpdGVzLm5ldDo0NDMvZXhhbXBsZS5naXRgLFxuICAgICAgd2Vic2l0ZTogYGh0dHA6Ly9leGFtcGxlJHtzbG90ID8gYC0ke3Nsb3R9YCA6ICcnfS5henVyZXdlYnNpdGVzLm5ldGAsXG4gICAgfSk7XG4gICAgLy8gQnkgZGVmYXVsdCBkZXBsb3kgdG8gdGhlIHN0YWdpbmcgZGVwbG95bWVudCBzbG90XG4gICAgY29uc3QgcmVtb3RlID0gZ2V0UmVtb3RlKHByb2Nlc3MuYXJndi5pbmNsdWRlcygnLS1wcm9kdWN0aW9uJykgPyBudWxsIDogJ3N0YWdpbmcnKTtcblxuICAgIC8vIEluaXRpYWxpemUgYSBuZXcgR2l0IHJlcG9zaXRvcnkgaW5zaWRlIHRoZSBgL2J1aWxkYCBmb2xkZXJcbiAgICAvLyBpZiBpdCBkb2Vzbid0IGV4aXN0IHlldFxuICAgIGNvbnN0IHJlcG8gPSBhd2FpdCBHaXRSZXBvLm9wZW4oJ2J1aWxkJywgeyBpbml0OiB0cnVlIH0pO1xuICAgIGF3YWl0IHJlcG8uc2V0UmVtb3RlKHJlbW90ZS5uYW1lLCByZW1vdGUudXJsKTtcblxuICAgIC8vIEZldGNoIHRoZSByZW1vdGUgcmVwb3NpdG9yeSBpZiBpdCBleGlzdHNcbiAgICBpZiAoKGF3YWl0IHJlcG8uaGFzUmVmKHJlbW90ZS51cmwsICdtYXN0ZXInKSkpIHtcbiAgICAgIGF3YWl0IHJlcG8uZmV0Y2gocmVtb3RlLm5hbWUpO1xuICAgICAgYXdhaXQgcmVwby5yZXNldChgJHtyZW1vdGUubmFtZX0vbWFzdGVyYCwgeyBoYXJkOiB0cnVlIH0pO1xuICAgICAgYXdhaXQgcmVwby5jbGVhbih7IGZvcmNlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHRoZSBwcm9qZWN0IGluIFJFTEVBU0UgbW9kZSB3aGljaFxuICAgIC8vIGdlbmVyYXRlcyBvcHRpbWl6ZWQgYW5kIG1pbmltaXplZCBidW5kbGVzXG4gICAgcHJvY2Vzcy5hcmd2LnB1c2goJy0tcmVsZWFzZScpO1xuICAgIGF3YWl0IHJ1bihyZXF1aXJlKCcuL2J1aWxkJykpO1xuXG4gICAgLy8gUHVzaCB0aGUgY29udGVudHMgb2YgdGhlIGJ1aWxkIGZvbGRlciB0byB0aGUgcmVtb3RlIHNlcnZlciB2aWEgR2l0XG4gICAgYXdhaXQgcmVwby5hZGQoJy0tYWxsIC4nKTtcbiAgICBhd2FpdCByZXBvLmNvbW1pdCgnVXBkYXRlJyk7XG4gICAgYXdhaXQgcmVwby5wdXNoKHJlbW90ZS5uYW1lLCAnbWFzdGVyJyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgc2l0ZSB3YXMgc3VjY2Vzc2Z1bGx5IGRlcGxveWVkXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZW1vdGUud2Vic2l0ZSk7XG4gICAgY29uc29sZS5sb2coYCR7cmVtb3RlLndlYnNpdGV9IC0+ICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX1gKTtcbiAgfVxuXG5cbiAgYXN5bmMgcmVuZGVyKHJvdXRlcykge1xuICAgIGlmICghcm91dGVzKSB7XG4gICAgICByb3V0ZXMgPSBbXG4gICAgICAgICcvJyxcbiAgICAgICAgJy9jb250YWN0JyxcbiAgICAgICAgJy9sb2dpbicsXG4gICAgICAgICcvcmVnaXN0ZXInLFxuICAgICAgICAnL2Fib3V0JyxcbiAgICAgICAgJy9wcml2YWN5JyxcbiAgICAgICAgJy80MDQnLCAvLyBodHRwczovL2hlbHAuZ2l0aHViLmNvbS9hcnRpY2xlcy9jcmVhdGluZy1hLWN1c3RvbS00MDQtcGFnZS1mb3IteW91ci1naXRodWItcGFnZXMtc2l0ZS9cbiAgICAgIF07XG4gICAgfVxuICAgIGxldCBzZXJ2ZXI7XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiAoc2VydmVyID0gdGhpcy5ydW5TZXJ2ZXIocmVzb2x2ZSkpKTtcblxuICAgIGF3YWl0IHJvdXRlcy5yZWR1Y2UoKHByb21pc2UsIHJvdXRlKSA9PiBwcm9taXNlLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gYGh0dHA6Ly8ke2hvc3R9JHtyb3V0ZX1gO1xuICAgICAgY29uc3QgZGlyID0gYGJ1aWxkL3B1YmxpYyR7cm91dGUucmVwbGFjZSgvW15cXC9dKiQvLCAnJyl9YDtcbiAgICAgIGNvbnN0IG5hbWUgPSByb3V0ZS5lbmRzV2l0aCgnLycpID8gJ2luZGV4Lmh0bWwnIDogYCR7cm91dGUubWF0Y2goL1teL10rJC8pWzBdfS5odG1sYDtcbiAgICAgIGNvbnN0IGRpc3QgPSBgJHtkaXJ9JHtuYW1lfWA7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgICBhd2FpdCBmcy5tYWtlRGlyKGRpcik7XG4gICAgICBhd2FpdCBmcy53cml0ZUZpbGUoZGlzdCwgdGV4dCk7XG4gICAgICBjb25zb2xlLmxvZyhgJHtkaXN0fSA9PiAke3Jlcy5zdGF0dXN9ICR7cmVzLnN0YXR1c1RleHR9YCk7XG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcblxuICAgIHNlcnZlci5raWxsKCdTSUdURVJNJyk7XG4gIH1cblxuICBmb3JtYXQodGltZSkge1xuICAgIHJldHVybiB0aW1lLnRvVGltZVN0cmluZygpLnJlcGxhY2UoLy4qKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4qLywgJyQxJyk7XG4gIH1cblxuICBydW4oZm4sIG9wdGlvbnMpIHtcbiAgICBjb25zdCB0YXNrID0gdHlwZW9mIGZuLmRlZmF1bHQgPT09ICd1bmRlZmluZWQnID8gZm4gOiBmbi5kZWZhdWx0O1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbJHtmb3JtYXQoc3RhcnQpfV0gU3RhcnRpbmcgJyR7dGFzay5uYW1lfSR7b3B0aW9ucyA/IGAoJHtvcHRpb25zfSlgIDogJyd9Jy4uLmBcbiAgICApO1xuICAgIHJldHVybiB0YXNrKG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IHRpbWUgPSBlbmQuZ2V0VGltZSgpIC0gc3RhcnQuZ2V0VGltZSgpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBbJHtmb3JtYXQoZW5kKX1dIEZpbmlzaGVkICcke3Rhc2submFtZX0ke29wdGlvbnMgPyBgKCR7b3B0aW9uc30pYCA6ICcnfScgYWZ0ZXIgJHt0aW1lfSBtc2BcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzdGFydChjdHgpIHtcbiAgICBjb25zb2xlLmxvZygnc3RhcnQnKTtcbiAgICBhd2FpdCB0aGlzLmNsZWFuKCk7XG4gICAgYXdhaXQgdGhpcy5jb3B5KHsgd2F0Y2g6IHRydWUgfSk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBQYXRjaCB0aGUgY2xpZW50LXNpZGUgYnVuZGxlIGNvbmZpZ3VyYXRpb25zXG4gICAgICAvLyB0byBlbmFibGUgSG90IE1vZHVsZSBSZXBsYWNlbWVudCAoSE1SKSBhbmQgUmVhY3QgVHJhbnNmb3JtXG5cblxuICAgICAgY29uc3Qgd2VicGFja0NvbmZpZyA9IHRoaXMud2VicGFja0NvbmZpZ1xuICAgICAgY29uc3QgYnVuZGxlciA9IHdlYnBhY2sod2VicGFja0NvbmZpZyk7XG4gICAgICBjb25zdCB3cE1pZGRsZXdhcmUgPSB3ZWJwYWNrTWlkZGxld2FyZShidW5kbGVyLCB7XG4gICAgICAgIC8vIElNUE9SVEFOVDogd2VicGFjayBtaWRkbGV3YXJlIGNhbid0IGFjY2VzcyBjb25maWcsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBwcm92aWRlIHB1YmxpY1BhdGggYnkgb3Vyc2VsdmVzXG4gICAgICAgIHB1YmxpY1BhdGg6IHdlYnBhY2tDb25maWdbMF0ub3V0cHV0LnB1YmxpY1BhdGgsXG5cbiAgICAgICAgLy8gUHJldHR5IGNvbG9yZWQgb3V0cHV0XG4gICAgICAgIHN0YXRzOiB3ZWJwYWNrQ29uZmlnWzBdLnN0YXRzLFxuXG4gICAgICAgIC8vIEZvciBvdGhlciBzZXR0aW5ncyBzZWVcbiAgICAgICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL3dlYnBhY2stZGV2LW1pZGRsZXdhcmVcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaG90TWlkZGxld2FyZXMgPSBidW5kbGVyXG4gICAgICAgIC5jb21waWxlcnNcbiAgICAgICAgLmZpbHRlcihjb21waWxlciA9PiBjb21waWxlci5vcHRpb25zLnRhcmdldCAhPT0gJ25vZGUnKVxuICAgICAgICAubWFwKGNvbXBpbGVyID0+IHdlYnBhY2tIb3RNaWRkbGV3YXJlKGNvbXBpbGVyKSk7XG5cbiAgICAgIGxldCBoYW5kbGVTZXJ2ZXJCdW5kbGVDb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5ydW5TZXJ2ZXIoKGVyciwgaG9zdCkgPT4ge1xuICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICBjb25zdCBicyA9IEJyb3dzZXJzeW5jLmNyZWF0ZSgpO1xuICAgICAgICAgICAgYnMuaW5pdCh7XG4gICAgICAgICAgICAgIC4uLih0aGlzLmRlYnVnID8ge30gOiB7IG5vdGlmeTogZmFsc2UsIHVpOiBmYWxzZSB9KSxcblxuICAgICAgICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgICAgIHRhcmdldDogaG9zdCxcbiAgICAgICAgICAgICAgICBtaWRkbGV3YXJlOiBbd3BNaWRkbGV3YXJlLCAuLi5ob3RNaWRkbGV3YXJlc10sXG4gICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byB3YXRjaCAnKi5qcycgaGVyZSwgd2VicGFjayB3aWxsIHRha2UgY2FyZSBvZiBpdCBmb3IgdXMsXG4gICAgICAgICAgICAgIC8vIGluY2x1ZGluZyBmdWxsIHBhZ2UgcmVsb2FkcyBpZiBITVIgd29uJ3Qgd29ya1xuICAgICAgICAgICAgICBmaWxlczogWydidWlsZC9jb250ZW50LyoqLyouKiddLFxuICAgICAgICAgICAgfSwgcmVzb2x2ZSk7XG4gICAgICAgICAgICBoYW5kbGVTZXJ2ZXJCdW5kbGVDb21wbGV0ZSA9ICgpID0+IHRoaXMucnVuU2VydmVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGJ1bmRsZXIucGx1Z2luKCdkb25lJywgKCkgPT4gaGFuZGxlU2VydmVyQnVuZGxlQ29tcGxldGUoKSk7XG4gICAgfSk7XG4gIH1cblxuIHJ1blNlcnZlcihjYikge1xuICAgY29uc3QgUlVOTklOR19SRUdFWFAgPSAvVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6XFwvXFwvKC4qPylcXC8vO1xuXG4gICAgY29uc3Qgb25TdGRPdXQgPSAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCk7XG4gICAgICBjb25zdCBtYXRjaCA9IGRhdGEudG9TdHJpbmcoJ3V0ZjgnKS5tYXRjaChSVU5OSU5HX1JFR0VYUCk7XG5cbiAgICAgIC8vIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRpbWUucmVwbGFjZSgvLiooXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLiovLCAnWyQxXSAnKSk7XG4gICAgICAvLyBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhKTtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuc3Rkb3V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25TdGRPdXQpO1xuICAgICAgICB0aGlzLnNlcnZlci5zdGRvdXQub24oJ2RhdGEnLCB4ID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKHgpKTtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IobnVsbCwgbWF0Y2hbMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICB0aGlzLnNlcnZlci5raWxsKCdTSUdURVJNJyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBvdXRwdXQgfSA9IHRoaXMud2VicGFja0NvbmZpZy5maW5kKHggPT4geC50YXJnZXQgPT09ICdub2RlJyk7XG4gICAgY29uc3Qgc2VydmVyUGF0aCA9IHBhdGguam9pbihvdXRwdXQucGF0aCwgb3V0cHV0LmZpbGVuYW1lKTtcbiAgICB0aGlzLnNlcnZlciA9IGNwLnNwYXduKCdub2RlJywgW3NlcnZlclBhdGhdLCB7XG4gICAgICBlbnY6IE9iamVjdC5hc3NpZ24oeyBOT0RFX0VOVjogJ2RldmVsb3BtZW50JyB9LCBwcm9jZXNzLmVudiksXG4gICAgICBzaWxlbnQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMuc2VydmVyLnN0ZG91dC5vbignZGF0YScsIG9uU3RkT3V0KTtcbiAgICB0aGlzLnNlcnZlci5zdGRlcnIub24oJ2RhdGEnLCB4ID0+IHByb2Nlc3Muc3RkZXJyLndyaXRlKHgpKTtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXI7XG4gIH1cblxufVxuXG4vLyBwcm9jZXNzLm9uKCdleGl0JywgKCkgPT4ge1xuLy8gICBpZiAoc2VydmVyKSB7XG4vLyAgICAgc2VydmVyLmtpbGwoJ1NJR1RFUk0nKTtcbi8vICAgfVxuLy8gfSk7XG4iXX0=