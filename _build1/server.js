module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _polyfill = __webpack_require__(1);
  
  var _polyfill2 = _interopRequireDefault(_polyfill);
  
  var _App = __webpack_require__(13);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _config = __webpack_require__(203);
  
  var _config2 = _interopRequireDefault(_config);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  (0, _polyfill2.default)();
  var app = new _App2.default({ config: _config2.default });
  app.run().then(function () {
    console.log('\uD83C\uDF83  The server is running at http://127.0.0.1:' + app.config.port + '/ [' + global.timing() + 'ms]');
  });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ready;
  if (true) {
    console.log('Compiling ...');
  }
  global.startedAt = Date.now();
  global.timing = function () {
    return Date.now() - global.startedAt;
  };
  // }
  __webpack_require__(2);
  __webpack_require__(3).default = __webpack_require__(4);
  // require('isomorphic-fetch');
  global.fetch = __webpack_require__(5).default;
  function ready() {
    if (true) {
      console.log('\uD83D\uDD25  Compiled [' + global.timing() + 'ms]');
    }
  }

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(4);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(6);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(7);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _config = __webpack_require__(8);
  
  var _config2 = _interopRequireDefault(_config);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = _config2.default.server({
    client: __webpack_require__(11).default,
    port: process.env.PORT || 8080,
    host: 'localhost',
    db: {
      uri: 'mongodb://publicdb.mgbeta.ru/lsk'
    },
    jwt: {
      secret: 'replaceMyPlease'
    },
    // sockets: {
    //   transports: ['websocket'],
    // },
    middlewares: __webpack_require__(12).default
  });

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _toConsumableArray2 = __webpack_require__(9);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    server: function serverConfig() {
      for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
        configs[_key] = arguments[_key];
      }
  
      return _lodash2.default.defaultsDeep.apply(_lodash2.default, [{}].concat((0, _toConsumableArray3.default)(_lodash2.default.reverse(configs))));
    },
    client: function clientConfig() {
      for (var _len2 = arguments.length, configs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        configs[_key2] = arguments[_key2];
      }
  
      return _lodash2.default.defaultsDeep.apply(_lodash2.default, [{}].concat((0, _toConsumableArray3.default)(_lodash2.default.reverse(configs))));
    }
  };

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _config = __webpack_require__(8);
  
  var _config2 = _interopRequireDefault(_config);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = _config2.default.client({
    io: {
      url: 'localhost:5000',
      port: 5000
    }
  });

/***/ },
/* 12 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    accessLogger: true,
    bodyParser: {
      json: true,
      urlencoded: {
        limit: '50mb',
        extended: true
      }
    },
    reqData: true,
    cookieParser: true,
    cors: false
  };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _get2 = __webpack_require__(20);
  
  var _get3 = _interopRequireDefault(_get2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _class, _temp2; // eslint-disable-line
  
  
  var _ReactApp2 = __webpack_require__(23);
  
  var _ReactApp3 = _interopRequireDefault(_ReactApp2);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _api = __webpack_require__(106);
  
  var _api2 = _interopRequireDefault(_api);
  
  var _api3 = __webpack_require__(107);
  
  var _api4 = _interopRequireDefault(_api3);
  
  var _routes = __webpack_require__(108);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(84);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // eslint-disable-line
  
  
  function castTask(task) {
    if (!task.answers) return task;
  
    var values = _lodash2.default.shuffle(_lodash2.default.range(task.answers.length));
  
    return (0, _extends3.default)({}, task.toObject(), {
      answersView: undefined,
      answers: undefined,
      checker: {
        type: 'match',
        value: values[0]
      },
      decision: {
        type: 'button',
        view: '2column',
        options: _lodash2.default.shuffle(task.answers.map(function (answer, index) {
          var res = {
            value: values[index],
            title: answer.title
          };
          if (answer.text) {
            res.text = answer.text;
          }
          return res;
        }))
      }
    });
  }
  
  var App = (_temp2 = _class = function (_ReactApp) {
    (0, _inherits3.default)(App, _ReactApp);
  
    function App() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, App);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || (0, _getPrototypeOf2.default)(App)).call.apply(_ref, [this].concat(args))), _this), _this.Provider = __webpack_require__(184).default, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getModels',
      value: function getModels() {
        return (0, _extends3.default)({}, (0, _get3.default)(App.prototype.__proto__ || (0, _getPrototypeOf2.default)(App.prototype), 'getModels', this).call(this), __webpack_require__(193).default(this));
      }
    }, {
      key: 'useRoutes',
      value: function useRoutes() {
        var _this2 = this;
  
        this.app.enable('trust proxy');
        this.app.all('/api', function (req, res) {
          return res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' });
        });
        this.app.use('/api/v1', this.getDocsRouter(_api4.default, {
          v: 1,
          path: '/api/v1'
        }));
        this.app.use('/api/v1', (0, _api2.default)(this));
  
        this.app.get('/game/create', function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
            var categoryId, _models, Task, Game, tasks, game;
  
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    categoryId = req.query.categoryId;
                    _models = _this2.models, Task = _models.Task, Game = _models.Game;
                    _context.next = 4;
                    return Task.find({ categoryId: categoryId });
  
                  case 4:
                    tasks = _context.sent;
  
                    tasks = _lodash2.default.sampleSize(tasks, 7);
                    tasks = tasks.map(castTask);
                    // tasks.de = _.shuffle(tasks.answers)
  
                    // return res.json({tasks})
                    game = new Game({ tasks: tasks, categoryId: categoryId });
                    _context.next = 10;
                    return game.save();
  
                  case 10:
                    return _context.abrupt('return', res.redirect('/game/' + game.id));
  
                  case 11:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));
  
          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }());
        this.app.post('/game/answer', function () {
          var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
            var id, Game, game, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    id = req.query.id;
                    Game = _this2.models.Game;
                    _context2.next = 4;
                    return Game.findById(id);
  
                  case 4:
                    game = _context2.sent;
  
                    game.answers = req.body.answers;
                    result = {
                      count: game.tasks.length,
                      correct: 0
                    };
  
  
                    game.answers.map(function (answer, index) {
                      result.correct += game.tasks[index].checker.value === answer;
                    });
                    result.score = result.correct / result.count;
                    game.result = result;
                    game.finishedAt = new Date();
                    _context2.next = 13;
                    return game.save();
  
                  case 13:
                    return _context2.abrupt('return', res.json(game));
  
                  case 14:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));
  
          return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
          };
        }());
        this.app.post('/game/cert', function () {
          var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
            var id, Game, game;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    id = req.query.id;
                    Game = _this2.models.Game;
                    _context3.next = 4;
                    return Game.findById(id);
  
                  case 4:
                    game = _context3.sent;
  
                    game.cert = req.body.cert;
                    _context3.next = 8;
                    return game.save();
  
                  case 8:
                    return _context3.abrupt('return', res.json(game));
  
                  case 9:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this2);
          }));
  
          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }());
        this.app.get('/game/buy', function () {
          var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
            var id, Game, game;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    id = req.query.id;
                    Game = _this2.models.Game;
                    _context4.next = 4;
                    return Game.findById(id);
  
                  case 4:
                    game = _context4.sent;
  
                    game.boughtAt = new Date();
                    _context4.next = 8;
                    return game.save();
  
                  case 8:
                    return _context4.abrupt('return', res.redirect('/game/' + game.id));
  
                  case 9:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this2);
          }));
  
          return function (_x7, _x8) {
            return _ref5.apply(this, arguments);
          };
        }());
      }
    }, {
      key: 'getStatics',
      value: function getStatics() {
        return (0, _extends3.default)({}, (0, _get3.default)(App.prototype.__proto__ || (0, _getPrototypeOf2.default)(App.prototype), 'getStatics', this).call(this), {
          '/': __dirname + '/../src/public'
        });
      }
    }, {
      key: 'getAssets',
      value: function getAssets() {
        return _assets2.default.main;
      } // eslint-disable-line
  
    }, {
      key: 'getUniversalRoutes',
      // eslint-disable-line
  
      value: function getUniversalRoutes() {
        return _routes2.default;
      }
    }]);
    return App;
  }(_ReactApp3.default), _class.Html = __webpack_require__(197).default, _temp2);
  exports.default = App;

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/get");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp2; // import ssr from './ssr'
  // eslint-disable-line import/no-unresolved
  
  
  var _universalRouter = __webpack_require__(24);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _history = __webpack_require__(25);
  
  var _CoreApp2 = __webpack_require__(26);
  
  var _CoreApp3 = _interopRequireDefault(_CoreApp2);
  
  var _assets = __webpack_require__(84);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _routes = __webpack_require__(85);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Html = __webpack_require__(101);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _Provider = __webpack_require__(105);
  
  var _Provider2 = _interopRequireDefault(_Provider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ReactApp = (_temp2 = _class = function (_CoreApp) {
    (0, _inherits3.default)(ReactApp, _CoreApp);
  
    function ReactApp() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, ReactApp);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReactApp.__proto__ || (0, _getPrototypeOf2.default)(ReactApp)).call.apply(_ref, [this].concat(args))), _this), _this.Provider = _Provider2.default, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(ReactApp, [{
      key: 'getAssets',
      value: function getAssets() {
        return _assets2.default.main;
      }
    }, {
      key: 'useDefaultRoute',
      value: function useDefaultRoute() {
        var _this2 = this;
  
        this.app.get('*', function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var htmlProps;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _this2.getHtmlProps(req);
  
                  case 3:
                    htmlProps = _context.sent;
  
                    if (!htmlProps.redirect) {
                      _context.next = 6;
                      break;
                    }
  
                    return _context.abrupt('return', res.redirect(htmlProps.redirect));
  
                  case 6:
                    res.status(htmlProps.status).send(new _this2.constructor.Html(htmlProps).render());
                    _context.next = 13;
                    break;
  
                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context['catch'](0);
  
                    console.log('err', _context.t0);
                    next(_context.t0);
  
                  case 13:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2, [[0, 9]]);
          }));
  
          return function (_x, _x2, _x3) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    }, {
      key: 'getUniversalRoutes',
      value: function getUniversalRoutes() {
        return _routes2.default;
      }
  
      // Synonims
  
    }, {
      key: 'getReqRootState',
      value: function getReqRootState(req) {
        return {
          token: req.token,
          user: req.user
        };
      }
    }, {
      key: 'createProvider',
      value: function createProvider(rootState, req) {
        return new this.Provider(rootState, req, this.config);
        // return new this.Provider(rootState, req)
      }
    }, {
      key: 'getReqCtx',
      value: function getReqCtx(req) {
        var rootState = this.getReqRootState(req);
        if (req.provider == null) {
          req.provider = this.createProvider(rootState, req);
        }
        var ctx = {
          req: req,
          config: this.config.client,
          rootState: rootState,
          provider: req.provider,
          history: (0, _history.createMemoryHistory)({
            initialEntries: [req.url]
          }),
          style: [],
          insertCss: function insertCss() {
            for (var _len2 = arguments.length, styles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              styles[_key2] = arguments[_key2];
            }
  
            // console.log(ctx.style);
            // console.log('styles', styles);
            styles.forEach(function (style) {
              return ctx.style.push(style._getCss());
            });
          }
        };
        return ctx;
      }
      // ureq, ures
  
    }, {
      key: 'getReqProps',
      value: function getReqProps(req) {
        var reqCtx = this.getReqCtx(req);
        return {
          path: req.path,
          query: req.query,
          app: this,
          ctx: reqCtx,
          appStore: reqCtx && reqCtx.provider,
          assets: this.getAssets(),
          status: 200
        };
      }
    }, {
      key: 'getHtmlProps',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req) {
          var reqProps, route;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.getReqProps(req);
  
                case 2:
                  reqProps = _context2.sent;
                  _context2.next = 5;
                  return _universalRouter2.default.resolve(this.getUniversalRoutes(), reqProps);
  
                case 5:
                  route = _context2.sent;
                  return _context2.abrupt('return', (0, _extends3.default)({}, reqProps, route, {
                    route: route,
                    children: route.component
                  }));
  
                case 7:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
  
        function getHtmlProps(_x4) {
          return _ref3.apply(this, arguments);
        }
  
        return getHtmlProps;
      }()
    }]);
    return ReactApp;
  }(_CoreApp3.default), _class.Html = _Html2.default, _temp2);
  exports.default = ReactApp;

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("history");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _keys = __webpack_require__(28);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _get3 = __webpack_require__(20);
  
  var _get4 = _interopRequireDefault(_get3);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _express = __webpack_require__(29);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _path = __webpack_require__(30);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _ExpressApp2 = __webpack_require__(31);
  
  var _ExpressApp3 = _interopRequireDefault(_ExpressApp2);
  
  var _sockets = __webpack_require__(38);
  
  var _sockets2 = _interopRequireDefault(_sockets);
  
  var _getMongoose = __webpack_require__(44);
  
  var _getMongoose2 = _interopRequireDefault(_getMongoose);
  
  var _getDocsTemplate = __webpack_require__(46);
  
  var _getDocsTemplate2 = _interopRequireDefault(_getDocsTemplate);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var CoreApp = function (_ExpressApp) {
    (0, _inherits3.default)(CoreApp, _ExpressApp);
  
    function CoreApp() {
      (0, _classCallCheck3.default)(this, CoreApp);
      return (0, _possibleConstructorReturn3.default)(this, (CoreApp.__proto__ || (0, _getPrototypeOf2.default)(CoreApp)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(CoreApp, [{
      key: 'init',
      value: function init() {
        this.log.trace('CoreApp init');
  
        this.db = this.getDatabase();
        this.requests = this.getRequests();
        this.log.trace('requests', (0, _keys2.default)(this.requests));
        this.responses = this.getResponses();
        this.log.trace('responses', (0, _keys2.default)(this.responses));
        this.errors = this.getErrors();
        this.log.trace('errors', (0, _keys2.default)(this.errors));
        this.middlewares = this.getMiddlewares();
        this.log.trace('middlewares', (0, _keys2.default)(this.middlewares));
        this.models = this.getModels();
        this.log.trace('models', (0, _keys2.default)(this.models));
        this.resourses = this.getResourses();
        this.log.trace('resourses', (0, _keys2.default)(this.resourses));
        this.helpers = this.getHelpers();
        this.log.trace('helpers', (0, _keys2.default)(this.helpers));
        this.statics = this.getResolvedStatics();
        this.log.trace('statics', this.statics);
  
        (0, _get4.default)(CoreApp.prototype.__proto__ || (0, _getPrototypeOf2.default)(CoreApp.prototype), 'init', this).apply(this, arguments);
      }
    }, {
      key: 'getMiddlewares',
      value: function getMiddlewares() {
        return __webpack_require__(47).default(this); // eslint-disable-line
      }
    }, {
      key: 'getModels',
      value: function getModels() {
        return __webpack_require__(64).default(this); // eslint-disable-line
      }
    }, {
      key: 'getDatabase',
      value: function getDatabase() {
        return this.config.db && (0, _getMongoose2.default)(this, this.config.db);
      }
    }, {
      key: 'getErrors',
      value: function getErrors() {
        return __webpack_require__(70).default(this); // eslint-disable-line
      }
    }, {
      key: 'getResourses',
      value: function getResourses() {
        return __webpack_require__(72).default(this); // eslint-disable-line
      }
    }, {
      key: 'getRequests',
      value: function getRequests() {
        return __webpack_require__(74).default(this); // eslint-disable-line
      }
    }, {
      key: 'getResponses',
      value: function getResponses() {
        return __webpack_require__(75).default(this); // eslint-disable-line
      }
    }, {
      key: 'getHelpers',
      value: function getHelpers() {
        return __webpack_require__(79).default(this); // eslint-disable-line
      }
    }, {
      key: 'getStatics',
      value: function getStatics() {
        return {};
      }
    }, {
      key: 'getResolvedStatics',
      value: function getResolvedStatics() {
        return _lodash2.default.mapValues(this.getStatics() || {}, function (p) {
          return _path2.default.resolve(p);
        });
      }
    }, {
      key: 'useStatics',
      value: function useStatics() {
        var _this2 = this;
  
        _lodash2.default.forEach(this.getResolvedStatics(), function (path, url) {
          _this2.app.use(url, _express2.default.static(path));
        });
      }
    }, {
      key: 'useStaticPublic',
      value: function useStaticPublic(publicPath) {
        var urlPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  
        // if (!publicPath) {
        //   publicPath = path.join(__dirname, 'public');
        // } else {
        //   publicPath = path.join(publicPath);
        // }
        // if (urlPath == null) {
        //   urlPath = '/';
        // }
        // this.statics[urlPath] = publicPath
        this.log.trace('DEPRECATED');
        // this.log.trace(`Static attach ${urlPath} => ${publicPath}`);
        // this.app.use(urlPath, express.static(publicPath));
      }
    }, {
      key: 'getUsingMiddlewares',
      value: function getUsingMiddlewares() {
        return [this.middlewares.extendReqRes, this.middlewares.reqLog, this.middlewares.accessLogger, this.middlewares.reqParser, this.middlewares.reqData, this.middlewares.parseToken, this.middlewares.parseUser];
      }
    }, {
      key: 'acl',
      value: function acl() {
        return function (req, res, next) {
          next();
        };
      }
    }, {
      key: 'getDocsRouter',
      value: function getDocsRouter(getDocs, params) {
        var _this3 = this;
  
        var api = this.asyncRouter();
        var docsParams = (0, _assign2.default)({}, params, {
          docs: (params.path || '/api') + '/docs',
          docsJson: (params.path || '/api') + '/docs/json'
        });
        api.all('/', function (req, res) {
          return res.json(docsParams);
        });
        api.all('/docs', function (req, res) {
          return res.send((0, _getDocsTemplate2.default)(_this3, docsParams));
        });
        api.all('/docs/json', function (req, res) {
          return res.json(getDocs(_this3, docsParams));
        });
        return api;
      }
    }, {
      key: 'createExpressApp',
      value: function createExpressApp() {
        var app = (0, _get4.default)(CoreApp.prototype.__proto__ || (0, _getPrototypeOf2.default)(CoreApp.prototype), 'createExpressApp', this).call(this);
  
        // asdasdsa();
        this.config.sockets && this.useSockets(app);
        return app;
      }
    }, {
      key: 'useSockets',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(app) {
          var _this4 = this;
  
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this.config.sockets) {
                    _context.next = 2;
                    break;
                  }
  
                  return _context.abrupt('return');
  
                case 2:
                  this.log.trace('CoreApp.useSockets');
                  // console.log(55555);
                  this.io = (0, _sockets2.default)(this);
                  // console.log(1111);
                  app.ws = function (route, callback) {
                    // console.log('app.ws this.io', this.io);
                    if (typeof callback !== 'function') throw '!ws callback(namespace)';
                    var namespace = _this4.io.of(route);
                    _this4.io.atachMiddlwares(namespace);
                    callback(namespace);
                  };
                  // console.log(4444);
                  // console.log('app', app, app.use, app.ws);
  
                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function useSockets(_x2) {
          return _ref.apply(this, arguments);
        }
  
        return useSockets;
      }()
    }, {
      key: 'runSockets',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var transports;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (this.config.sockets) {
                    _context2.next = 2;
                    break;
                  }
  
                  return _context2.abrupt('return');
  
                case 2:
                  this.io.serveClient(false);
                  this.io.attach(this.httpServer);
                  transports = this.config.sockets.transports || ['websocket'];
                  // console.log('transports', transports);
  
                  this.io.set('transports', transports);
  
                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
  
        function runSockets() {
          return _ref2.apply(this, arguments);
        }
  
        return runSockets;
      }()
    }, {
      key: 'useMiddlewares',
      value: function useMiddlewares() {
        var _this5 = this;
  
        this.beforeUseMiddlewares();
        var middlewares = _lodash2.default.flattenDeep(this.getUsingMiddlewares());
        middlewares.forEach(function (middleware) {
          middleware && typeof middleware === 'function' && _this5.app.use(middleware);
        });
      }
    }, {
      key: 'useDefaultRoute',
      value: function useDefaultRoute() {
        var _this6 = this;
  
        this.app.use(function (req, res, next) {
          var err = _this6.errors.e404('Route not found');
          next(err);
        });
      }
    }, {
      key: 'afterUseMiddlewares',
      value: function afterUseMiddlewares() {
        this.middlewares.catchError && this.app.use(this.middlewares.catchError);
      }
    }, {
      key: 'runDb',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.db) {
                    _context3.next = 2;
                    break;
                  }
  
                  return _context3.abrupt('return');
  
                case 2:
                  this.log.trace('CoreApp.runDb');
                  _context3.prev = 3;
                  return _context3.abrupt('return', this.db.run());
  
                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](3);
  
                  this.log.fatal(_context3.t0);
                  throw _context3.t0;
  
                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[3, 7]]);
        }));
  
        function runDb() {
          return _ref3.apply(this, arguments);
        }
  
        return runDb;
      }()
    }, {
      key: 'run',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
          var _get2;
  
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
  
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  this.log.trace('CoreApp.run');
                  _context4.next = 3;
                  return this.runDb();
  
                case 3:
                  _context4.next = 5;
                  return (_get2 = (0, _get4.default)(CoreApp.prototype.__proto__ || (0, _getPrototypeOf2.default)(CoreApp.prototype), 'run', this)).call.apply(_get2, [this].concat(args));
  
                case 5:
                  _context4.t0 = this.config.sockets;
  
                  if (!_context4.t0) {
                    _context4.next = 9;
                    break;
                  }
  
                  _context4.next = 9;
                  return this.runSockets();
  
                case 9:
                  _context4.next = 11;
                  return this.afterRun();
  
                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));
  
        function run() {
          return _ref4.apply(this, arguments);
        }
  
        return run;
      }()
    }, {
      key: 'afterRun',
      value: function afterRun() {}
    }]);
    return CoreApp;
  }(_ExpressApp3.default);
  
  exports.default = CoreApp;

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _class, _temp;
  
  var _bunyan = __webpack_require__(32);
  
  var _bunyan2 = _interopRequireDefault(_bunyan);
  
  var _express = __webpack_require__(29);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _http = __webpack_require__(33);
  
  var _mixin = __webpack_require__(34);
  
  var _mixin2 = _interopRequireDefault(_mixin);
  
  var _AsyncRouter = __webpack_require__(36);
  
  var _AsyncRouter2 = _interopRequireDefault(_AsyncRouter);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ExpressApp = (_temp = _class = function () {
    function ExpressApp() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck3.default)(this, ExpressApp);
      this.asyncRouter = _AsyncRouter2.default;
  
      (0, _assign2.default)(this, params);
      if (!this.log) this.log = this.getLogger(); // because CoreApp.log() before init
      try {
        this.init();
      } catch (err) {
        this.log.fatal('init err', err);
      }
    }
  
    (0, _createClass3.default)(ExpressApp, [{
      key: 'createExpressApp',
      value: function createExpressApp() {
        return (0, _express2.default)();
      }
    }, {
      key: 'getLogger',
      value: function getLogger(params) {
        var options = (0, _assign2.default)({
          name: 'app',
          src: (true),
          level: 'trace'
        }, this.config.logger || {});
        return _bunyan2.default.createLogger(options, params);
      }
    }, {
      key: 'init',
      value: function init() {
        this.log.trace('ExpressApp init');
        this.app = this.createExpressApp();
        this.httpServer = (0, _http.Server)(this.app);
  
        this.beforeUseMiddlewares();
        this.useMiddlewares();
        this.useRoutes();
        this.useStatics();
        this.useDefaultRoute();
        this.afterUseMiddlewares();
      }
    }, {
      key: 'beforeUseMiddlewares',
      value: function beforeUseMiddlewares() {}
    }, {
      key: 'useMiddlewares',
      value: function useMiddlewares() {}
    }, {
      key: 'useStatics',
      value: function useStatics() {}
    }, {
      key: 'useRoutes',
      value: function useRoutes() {}
    }, {
      key: 'useDefaultRoute',
      value: function useDefaultRoute() {
        var _this = this;
  
        this.app.use(function (req, res) {
          return res.send('Hello World from "' + _this.config.name + '"');
        });
      }
    }, {
      key: 'afterUseMiddlewares',
      value: function afterUseMiddlewares() {}
    }, {
      key: 'run',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _this2 = this;
  
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.log.trace('ExpressApp run');
  
                  return _context.abrupt('return', new _promise2.default(function (resolve) {
                    _this2.httpInstance = _this2.httpServer.listen(_this2.config.port, function () {
                      _this2.log.info('App running on port ' + _this2.config.port + '!');
                      resolve(_this2);
                    });
                  }));
  
                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function run() {
          return _ref.apply(this, arguments);
        }
  
        return run;
      }()
    }]);
    return ExpressApp;
  }(), _class.mixin = _mixin2.default, _temp);
  exports.default = ExpressApp;

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("bunyan");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("http");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(35);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  exports.default = function (Parent) {
    var Mixed = function (_Parent) {
      (0, _inherits3.default)(Mixed, _Parent);
  
      function Mixed() {
        (0, _classCallCheck3.default)(this, Mixed);
        return (0, _possibleConstructorReturn3.default)(this, (Mixed.__proto__ || (0, _getPrototypeOf2.default)(Mixed)).apply(this, arguments));
      }
  
      return Mixed;
    }(Parent);
  
    for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      mixins[_key - 1] = arguments[_key];
    }
  
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mixin = _step.value;
  
        for (var prop in mixin) {
          Mixed.prototype[prop] = mixin[prop];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  
    return Mixed;
  };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _expressAsyncRouter = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (params) {
    var paramsWithDefaultSender = (0, _assign2.default)({
      sender: function sender(req, res, val) {
        return res.ok(val);
      }
    }, params);
  
    return (0, _expressAsyncRouter.AsyncRouter)(paramsWithDefaultSender);
  };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _toConsumableArray2 = __webpack_require__(9);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var express = __webpack_require__(29);
  var consolevoid = {
    log: function log() {}
  };
  // var consolevoid = console
  var exp = {};
  // #endregion
  // #region Types and Constants
  var DEFAULT_SENDER = function DEFAULT_SENDER(req, res, val) {
    res.send(val);
  },
      SHORTCUTS_METHODS = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
  // #endregion
  // #region Public
  function AsyncRouter(options) {
    var sender = getSender(options),
        innerRouter = express.Router(options),
        asyncRouter = function asyncRouter() {
      return innerRouter.apply(this, arguments);
    };
    asyncRouter.__asyncRouter = true;
    asyncRouter.useRouter = function () {
      var r = express.Router();
      r.use.apply(r, arguments);
      this.use(r);
      return this;
    };
    wrapAllMatchers(asyncRouter, sender, innerRouter);
    asyncRouter.param = function param() {
      if (typeof arguments[1] === 'function' && arguments[1].length === 3) {
        innerRouter.param(arguments[0], wrapParamHandler(arguments[1]));
        return this;
      }
      innerRouter.param.apply(innerRouter, arguments);
      return this;
    };
    asyncRouter.route = function route(path) {
      var r = innerRouter.route(path);
      wrapAllMatchers(r, sender);
      return r;
    };
    asyncRouter.use = function use() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
        // if (arguments[_i] && arguments[_i].__asyncRouter) {
        //   return this.useRouter.apply(this, arguments);
        // }
      }
  
      innerRouter.use.apply(innerRouter, (0, _toConsumableArray3.default)(args.map(function (arg) {
        return typeof arg === 'function' && !arg.__asyncRouter ? wrapHandlerOrErrorHandler(arg) : arg;
      })));
      return this;
    };
    return asyncRouter;
  }
  exp.AsyncRouter = AsyncRouter;
  function create(options) {
    return AsyncRouter(options);
  }
  exp.create = create;
  // #endregion
  // #region Private Methods
  function getSender(options) {
    if (!options) {
      return DEFAULT_SENDER;
    }
    var send = options.send,
        sender = options.sender;
    delete options.send;
    delete options.sender;
    if (send !== false) {
      return sender || DEFAULT_SENDER;
    }
  }
  function wrapAllMatchers(route, sender, router) {
    consolevoid.log('wrapAllMatchers');
  
    router = router || route;
    SHORTCUTS_METHODS.forEach(function (method) {
      route[method] = wrapMatcher(router, router[method], sender);
    });
  }
  function wrapMatcher(router, routerMatcher, sender) {
    consolevoid.log('wrapMatcher');
  
    var _this = this;
    return function (name) {
      consolevoid.log('@wrapMatcher');
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var last = args.length - 1,
          mappedArgs = args.map(function (a, i) {
        return i === last ? wrapHandler(a, sender) : wrapHandlerOrErrorHandler(a);
      });
      routerMatcher.apply(router, [name].concat(mappedArgs));
      return _this;
    };
  }
  function wrapHandler(handler, sender) {
    consolevoid.log('wrapHandler');
  
    return function (req, res, next) {
      consolevoid.log('@wrapHandler');
  
      try {
        next = once(next);
        toCallback(handler.call(this, req, res, next), next, req, res, function (result) {
          if (sender && !res.headersSent) {
            return sender(req, res, result);
          }
        });
      } catch (err) {
        next(err);
      }
    };
  }
  function wrapParamHandler(handler) {
    consolevoid.log('wrapParamHandler');
  
    return function (req, res, next, param) {
      consolevoid.log('@wrapParamHandler');
      try {
        next = once(next);
        toCallback(handler.call(this, req, res, param), next, req, res);
      } catch (err) {
        next(err);
      }
    };
  }
  function wrapHandlerOrErrorHandler(handler) {
    consolevoid.log('wrapHandlerOrErrorHandler');
    if (handler.length === 4) {
      return function (err, req, res, next) {
        consolevoid.log('@wrapHandlerOrErrorHandler 4');
        try {
          next = once(next);
          toCallback(handler.call(this, err, req, res, next), next, req, res);
        } catch (err) {
          next(err);
        }
      };
    }
    return function (req, res, next) {
      consolevoid.log('@wrapHandlerOrErrorHandler !=4');
  
      try {
        next = once(next);
        toCallback(handler.call(this, req, res, next), next, req, res, handler.length === 3);
      } catch (err) {
        next(err);
      }
    };
  }
  function toCallback(thenable, next, req, res, end) {
    consolevoid.log('toCallback');
    if (!thenable || typeof thenable.then !== 'function') {
      consolevoid.log('tc 1', thenable);
  
      thenable = _promise2.default.resolve(thenable);
    }
    if (typeof end === 'function') {
      consolevoid.log('tc 2');
  
      thenable = thenable.then(end);
    }
    thenable.then(function () {
      consolevoid.log('tc 3 = !!next , !end , !res.headersSent', !!next, !end, !res.headersSent);
      // consolevoid.log(end);
      // next()
      if (next && !end && !res.headersSent) {
        next();
      }
    }, function (err) {
      consolevoid.log('tc 4');
      if (typeof err === 'string') {
        err = new Error(err);
      }
      next(err);
    });
  }
  function once(fn) {
    consolevoid.log('once');
    var called = false;
    return function () {
      consolevoid.log('@once');
      if (called) {
        return;
      }
      called = true;
      fn.apply(this, arguments);
    };
  }
  
  module.exports = exp;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _typeof2 = __webpack_require__(39);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _parseUser = __webpack_require__(40);
  
  var _parseUser2 = _interopRequireDefault(_parseUser);
  
  var _reqData = __webpack_require__(41);
  
  var _reqData2 = _interopRequireDefault(_reqData);
  
  var _socket = __webpack_require__(42);
  
  var _socket2 = _interopRequireDefault(_socket);
  
  var _socket3 = __webpack_require__(43);
  
  var _socket4 = _interopRequireDefault(_socket3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import addChatNamespace from './namespaces/chat'
  exports.default = function (ctx) {
    try {
      var _ret = function () {
        var io = (0, _socket4.default)();
        // console.log({io}, ctx.httpServer);
        // io.serveClient(false);
        // io.attach(ctx.httpServer);
        io.middlewares = {
          parseUser: (0, _parseUser2.default)(ctx),
          reqData: (0, _reqData2.default)(ctx),
          socketAsPromised: (0, _socket2.default)()
        };
        io.usedMiddlewares = [io.middlewares.parseUser, io.middlewares.reqData, io.middlewares.socketAsPromised];
        io.atachMiddlwares = function (namespace) {
          io.usedMiddlewares.map(function (middleware) {
            namespace.use(middleware);
          });
        };
        return {
          v: io
        };
      }();
  
      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    } catch (err) {
      console.log('err', err);
    }
  };
  // import isAuth from './middleware/isAuth'

/***/ },
/* 39 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function (socket, next) {
      var query = socket.handshake.query;
  
      var req = socket.request;
      var res = req.res;
  
      if (!req.query) {
        req.query = {};
      }
      (0, _assign2.default)(req.query, query);
  
      var parseUser = ctx.middlewares.parseUser;
  
      parseUser(req, res, function () {
        socket.user = req.user;
        return next();
      });
    };
  };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    return function (socket, next) {
      var query = socket.handshake.query;
  
      var req = socket.request;
      if (!req.query) {
        req.query = {};
      }
      socket.data = {};
      (0, _assign2.default)(socket.data, query, req.query);
      return next();
    };
  };

/***/ },
/* 42 */
/***/ function(module, exports) {

  module.exports = require("socket.io-as-promised");

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("socket.io");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _mongoose = __webpack_require__(45);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx, params) {
    ctx.log.trace('mongoose init');
  
    var mongoose = new _mongoose2.default.Mongoose();
    var defaultOptions = { server: { socketOptions: { keepAlive: 1 } } };
    var options = _lodash2.default.defaultsDeep({}, defaultOptions, params.options || {});
  
    mongoose.Promise = ctx.Promise || global.Promise;
  
    mongoose.run = function () {
      ctx.log.trace('mongoose run');
      return mongoose.connect(params.uri, options);
    };
    mongoose.reconnect = function () {
      ctx.log.trace('mongoose reconnect');
      mongoose.disconnect();
      mongoose.run();
    };
  
    var reconnectIteration = 0;
    mongoose.connection.on('connected', function () {
      ctx.log.info('mongoose connected');
      reconnectIteration = 0;
    });
    mongoose.connection.on('error', function (err) {
      ctx.log.error('mongoose error', err);
      var interval = reconnectIteration++ * 2000 + 1000;
      ctx.log.trace('mongoose reconnect after ' + interval + ' ms');
      setTimeout(mongoose.reconnect, interval);
    });
    mongoose.connection.on('disconnected', function () {
      ctx.log.trace('mongoose disconnected');
    });
  
    return mongoose;
  };

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("mongoose");

/***/ },
/* 46 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (params) {
    if (typeof params === 'string') {
      params = {
        url: params
      };
    }
    return '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>' + params.name + ' API docs</title>\n  <link rel="icon" type="image/png" href="//cdn.mgbeta.ru/swagger/images/favicon-32x32.png" sizes="32x32" />\n  <link rel="icon" type="image/png" href="//cdn.mgbeta.ru/swagger/images/favicon-16x16.png" sizes="16x16" />\n  <link href=\'//cdn.mgbeta.ru/swagger/css/typography.css\' media=\'screen\' rel=\'stylesheet\' type=\'text/css\'/>\n  <link href=\'//cdn.mgbeta.ru/swagger/css/reset.css\' media=\'screen\' rel=\'stylesheet\' type=\'text/css\'/>\n  <link href=\'//cdn.mgbeta.ru/swagger/css/screen.css\' media=\'screen\' rel=\'stylesheet\' type=\'text/css\'/>\n  <link href=\'//cdn.mgbeta.ru/swagger/css/reset.css\' media=\'print\' rel=\'stylesheet\' type=\'text/css\'/>\n  <link href=\'//cdn.mgbeta.ru/swagger/css/print.css\' media=\'print\' rel=\'stylesheet\' type=\'text/css\'/>\n  <link href=\'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\' media=\'print\' rel=\'stylesheet\' type=\'text/css\'/>\n  <style>\n    .token{\n      display: flex;\n      justify-content: center;\n      flex-direction: column;\n    }\n    .token__input{\n      width: 100%;\n      margin-top: 5px;\n    }\n    .text-center{\n      text-align: center;\n    }\n  </style>\n\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/object-assign-pollyfill.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/jquery-1.8.0.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/jquery.slideto.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/jquery.wiggle.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/jquery.ba-bbq.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/handlebars-4.0.5.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/lodash.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/backbone-min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/swagger-ui.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/highlight.9.1.0.pack.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/highlight.9.1.0.pack_extended.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/jsoneditor.min.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/marked.js\' type=\'text/javascript\'></script>\n  <script src=\'//cdn.mgbeta.ru/swagger/lib/swagger-oauth.js\' type=\'text/javascript\'></script>\n\n  <!-- Some basic translations -->\n  <!-- <script src=\'//cdn.mgbeta.ru/swagger/lang/translator.js\' type=\'text/javascript\'></script> -->\n  <!-- <script src=\'//cdn.mgbeta.ru/swagger/lang/ru.js\' type=\'text/javascript\'></script> -->\n  <!-- <script src=\'//cdn.mgbeta.ru/swagger/lang/en.js\' type=\'text/javascript\'></script> -->\n\n  <script type="text/javascript">\n    $(function () {\n      var url = window.location.search.match(/url=([^&]+)/);\n      if (url && url.length > 1) {\n        url = decodeURIComponent(url[1]);\n      } else {\n        // \u041F\u0443\u0442\u044C\n        url = "' + params.url + '";\n      }\n\n      hljs.configure({\n        highlightSizeThreshold: 5000\n      });\n\n      // Pre load translate...\n      if(window.SwaggerTranslator) {\n        window.SwaggerTranslator.translate();\n      }\n      window.swaggerUi = new SwaggerUi({\n        url: url,\n        dom_id: "swagger-ui-container",\n        supportedSubmitMethods: [\'get\', \'post\', \'put\', \'delete\', \'patch\'],\n        onComplete: function(swaggerApi, swaggerUi){\n          if(typeof initOAuth == "function") {\n            initOAuth({\n              clientId: "your-client-id",\n              clientSecret: "your-client-secret-if-required",\n              realm: "your-realms",\n              appName: "your-app-name",\n              scopeSeparator: " ",\n              additionalQueryStringParams: {}\n            });\n          }\n\n          if(window.SwaggerTranslator) {\n            window.SwaggerTranslator.translate();\n          }\n        },\n        onFailure: function(data) {\n          log("Unable to Load SwaggerUI");\n        },\n        docExpansion: "none",\n        jsonEditor: false,\n        defaultModelRendering: \'schema\',\n        showRequestHeaders: false\n      });\n\n      window.swaggerUi.load();\n\n      function log() {\n        if (\'console\' in window) {\n          console.log.apply(console, arguments);\n        }\n      }\n  });\n  </script>\n</head>\n\n<body class="swagger-section">\n<div id=\'header\'>\n  <div class="swagger-ui-wrap">\n    <a id="logo" href="/"><img class="logo__img" alt="swagger" height="30" width="30" src="//cdn.mgbeta.ru/swagger/images/logo_small.png" /><span class="logo__title">' + params.name + '</span></a>\n    <form id=\'api_selector\'>\n      <div class=\'input\'><input placeholder="//example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div>\n      <div id=\'auth_container\'></div>\n      <div class=\'input\'><a id="explore" class="header__btn" href="#" data-sw-translate>Explore</a></div>\n    </form>\n  </div>\n</div>\n<div class = "token swagger-section swagger-ui-wrap">\n  <h2 class = "text-center">Token</h2>\n  <input type = "text" name = "token form-control" class = "token__input" value = "' + (params.devToken || '') + '">\n</div>\n<div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>\n<div id="swagger-ui-container" class="swagger-ui-wrap"></div>\n<script type = "text/javascript">\n  $(document).ready(function(){\n    var localStorage = window.localStorage;\n    $(\'.token__input\').change(function(){\n      var el = $(this);\n      var token = el.val();\n      localStorage.setItem(\'token\', token);\n      swaggerUi.api.clientAuthorizations.add("x-access-token", new SwaggerClient.ApiKeyAuthorization("x-access-token", token, "header"));\n    })\n    var _token = localStorage.getItem(\'token\');\n    console.log(_token);\n    if(_token) {\n      $(\'.token__input\').val(_token);\n    }\n    swaggerUi.api.clientAuthorizations.add("x-access-token", new SwaggerClient.ApiKeyAuthorization("x-access-token", $(\'.token__input\').val(), "header"));\n  })\n</script>\n</body>\n</html>';
  };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require, _require2, _require3, _require4, _require5, _require6, _require7, _require8, _require9;
  
    // eslint-disable-line
    return {
      accessLogger: (_require = __webpack_require__(48)).default.apply(_require, arguments), // eslint-disable-line
      reqParser: (_require2 = __webpack_require__(50)).default.apply(_require2, arguments), // eslint-disable-line
      catchError: (_require3 = __webpack_require__(55)).default.apply(_require3, arguments), // eslint-disable-line
      isAuth: (_require4 = __webpack_require__(56)).default.apply(_require4, arguments), // eslint-disable-line
      parseUser: (_require5 = __webpack_require__(57)).default.apply(_require5, arguments), // eslint-disable-line
      parseToken: (_require6 = __webpack_require__(59)).default.apply(_require6, arguments), // eslint-disable-line
      reqData: (_require7 = __webpack_require__(60)).default.apply(_require7, arguments), // eslint-disable-line
      reqLog: (_require8 = __webpack_require__(61)).default.apply(_require8, arguments), // eslint-disable-line
      extendReqRes: (_require9 = __webpack_require__(63)).default.apply(_require9, arguments) };
  };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(49);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var cache = ['', ' ', '  ', '   ', '    ', '     ', '      ', '       ', '        ', '         '];
  
  function leftPad(str, len, ch) {
    // convert `str` to `string`
    str = '' + str;
    // `len` is the `pad`'s length now
    //
    var reverse = 0;
    if (len < 0) {
      len *= -1;
      reverse = 1;
    }
    len -= str.length;
    // doesn't need to pad
    if (len <= 0) return str;
    // `ch` defaults to `' '`
    if (!ch && ch !== 0) ch = ' ';
    // convert `ch` to `string`
    ch = '' + ch;
    // cache common use cases
    if (ch === ' ' && len < 10) return reverse ? str + cache[len] : cache[len] + str;
    // `pad` starts with an empty string
    var pad = '';
    // loop
    while (true) {
      // add `ch` to `pad` if `len` is odd
      if (len & 1) pad += ch;
      // divide `len` by 2, ditch the remainder
      len >>= 1;
      // "double" the `ch` so this operation count grows logarithmically on `len`
      // each time `ch` is "doubled", the `len` would need to be "doubled" too
      // similar to finding a value in binary search tree, hence O(log(n))
      if (len) ch += ch;
      // `len` is 0, exit the loop
      else break;
    }
    // pad `str`!
  
    return reverse ? str + pad : pad + str;
  }
  
  // "asd \x1b[41m \e[0;34m asdas" +
  
  function levelFn(data) {
    if (data.err || data.status >= 500 || data.duration > 10000) {
      // server internal error or error
      return 'error';
    } else if (data.status >= 400 || data.duration > 3000) {
      // client error
      return 'warn';
    }
    return 'info';
  }
  
  var urlPad = -20;
  
  function logStart(data) {
    return leftPad(data.method, 4) + ' ' + leftPad(data.url, urlPad) + ' #' + data.reqId; // + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
  }
  
  function logFinish(data) {
    var time = (data.duration || 0).toFixed(3);
    var method = leftPad(data.method, 4);
    var length = data.length || 0;
    return method + ' ' + leftPad(data.url, urlPad) + ' #' + data.reqId + ' ' + leftPad(data.status, 3) + ' ' + leftPad(time, 7) + 'ms ' + length + 'b ';
  }
  
  exports.default = function (ctx) {
    if (!_lodash2.default.has(ctx, 'config.middlewares.accessLogger')) return null;
    return function (req, res, next) {
      var data = {};
      var log = req.log.child({
        component: 'req'
      });
  
      data.reqId = req.reqId;
      data.method = req.method;
      if (req.ws) data.method = 'WS';
      data.host = req.headers.host;
      data.url = (req.baseUrl || '') + (req.url || '-');
      data.referer = req.header('referer') || req.header('referrer');
      data.ua = req.header('user-agent');
      data.ip = req.ip || req.connection.remoteAddress || req.socket && req.socket.remoteAddress || req.socket.socket && req.socket.socket.remoteAddress || '127.0.0.1';
  
      if (true) {
        log.debug(data, logStart(data));
        if (req.body) {
          log.trace((0, _stringify2.default)(req.body));
        }
      }
  
      var hrtime = process.hrtime();
      function logging() {
        data.status = res.statusCode;
        data.length = res.getHeader('Content-Length');
  
        var diff = process.hrtime(hrtime);
        data.duration = diff[0] * 1e3 + diff[1] * 1e-6;
  
        log[levelFn(data)](data, logFinish(data));
      }
      res.on('finish', logging);
      res.on('close', logging);
      next();
    };
  };

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(51);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _cookieParser = __webpack_require__(52);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(53);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _cors = __webpack_require__(54);
  
  var _cors2 = _interopRequireDefault(_cors);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    var middlewares = [];
    var preMiddlewares = [[_bodyParser2.default.json, _lodash2.default.get(ctx, 'config.middlewares.bodyParser.json'), _lodash2.default.get(ctx, 'defaultOptions.bodyParser.json')], [_bodyParser2.default.urlencoded, _lodash2.default.get(ctx, 'config.middlewares.bodyParser.urlencoded'), _lodash2.default.get(ctx, 'defaultOptions.bodyParser.urlencoded')], [_cookieParser2.default, _lodash2.default.get(ctx, 'config.middlewares.cookieParser'), _lodash2.default.get(ctx, 'defaultOptions.cookieParser')], [_cors2.default, _lodash2.default.get(ctx, 'config.middlewares.cors'), _lodash2.default.get(ctx, 'defaultOptions.cors')]];
    preMiddlewares.forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 3),
          middleware = _ref2[0],
          options1 = _ref2[1],
          options2 = _ref2[2];
  
      if (options1 === true && options2 !== false) {
        middlewares.push(middleware(options2));
      } else if (options1) {
        middlewares.push(middleware(options1));
      }
      // else ignore if (null, false, undefined)
    });
    return middlewares;
  };

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("cors");

/***/ },
/* 55 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function (err, req, res, next) {
      // eslint-disable-line
      if (req && req.log && req.log.error) {
        req.log.error({
          err: err,
          query: req.query,
          body: req.body,
          headers: req.headers
        }, (err || {}).stack);
      } else {
        console.log(err);
      }
      res.status(err.status || 500);
      if (res.err) return res.err(err);
      return res.json(err);
    };
  };

/***/ },
/* 56 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function isAuth(req, res, next) {
      if (req._errJwt) return next(req._errJwt);
      if (!req.user || !req.user._id) throw ctx.errors.e401('!req.user');
      next();
    };
  };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _expressJwt = __webpack_require__(58);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function parseUser(req, res, next) {
      if (!ctx.config.jwt) {
        // req.user = {}
        return next();
      }
      var options = {
        secret: ctx.config.jwt.secret,
        getToken: function getToken(req) {
          return req.token;
        }
      };
      (0, _expressJwt2.default)(options)(req, res, function (err) {
        if (err) req._errJwt = err;
        next();
      });
    };
  };

/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 59 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function parseToken(req, res, next) {
      var token = ctx.helpers.getToken(req);
      req.token = token;
      next();
    };
  };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    if (!_lodash2.default.has(ctx, 'config.middlewares.reqData')) return null;
    return function reqData(req, res, next) {
      req.data = req.allParams();
      next();
    };
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _uuid = __webpack_require__(62);
  
  var _uuid2 = _interopRequireDefault(_uuid);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function (req, res, next) {
      if (false) {
        req.reqId = _uuid2.default.v4();
      } else {
        global.reqId = 1 + (global.reqId || 0);
        req.reqId = global.reqId;
      }
      if (ctx.log) {
        req.log = ctx.log.child({
          reqId: req.reqId
        });
      }
      next();
    };
  };

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = require("uuid");

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function (req, res, next) {
      if (ctx.requests) {
        _lodash2.default.forEach(ctx.requests, function (val, key) {
          req[key] = val.bind(req);
        });
      }
      if (ctx.responses) {
        _lodash2.default.forEach(ctx.responses, function (val, key) {
          res[key] = val.bind(res);
        });
      }
      next();
    };
  };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require;
  
    return {
      User: (_require = __webpack_require__(65)).default.apply(_require, arguments)
    };
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  exports.getSchema = getSchema;
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _jsonwebtoken = __webpack_require__(66);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _bcryptjs = __webpack_require__(67);
  
  var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
  
  var _nodemailer = __webpack_require__(68);
  
  var _nodemailer2 = _interopRequireDefault(_nodemailer);
  
  var _UniversalSchema = __webpack_require__(69);
  
  var _UniversalSchema2 = _interopRequireDefault(_UniversalSchema);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var bcryptGenSalt = _promise2.default.promisify(_bcryptjs2.default.genSalt);
  var bcryptHash = _promise2.default.promisify(_bcryptjs2.default.hash);
  var bcryptCompare = _promise2.default.promisify(_bcryptjs2.default.compare);
  function getSchema(ctx) {
    // const mongoose = ctx.db
  
    var transporter = ctx.config.mail && ctx.config.mail.transport && _promise2.default.promisifyAll(_nodemailer2.default.createTransport(ctx.config.mail.transport));
  
    var schema = new _UniversalSchema2.default({
      username: {
        type: String,
        required: true,
        index: { unique: true },
        tolowercase: true,
        trim: true
      },
      password: {
        type: String,
        ref: function ref() {
          return ctx.models.v2.Profile.getMongooseName();
        }
      },
      name: {
        type: String
      },
      role: {
        type: String
      }
    }, {
  
      collection: 'user',
      timestamps: true
    });
  
    schema.statics.isValidEmail = function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    schema.statics.generatePassword = function () {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  
      return Math.random().toString(36).substr(2, length);
    };
    schema.methods.toJSON = function () {
      return _lodash2.default.omit(this.toObject(), ['password']);
    };
    schema.methods.getIdentity = function (params) {
      var object = _lodash2.default.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role']);
      if (!params) return object;
      return (0, _assign2.default)(object, params);
    };
    schema.methods.generateAuthToken = function (params) {
      return _jsonwebtoken2.default.sign(this.getIdentity(params), ctx.config.jwt.secret);
    };
    schema.methods.verifyPassword = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(password) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return bcryptCompare(password, this.password);
  
              case 2:
                return _context.abrupt('return', _context.sent);
  
              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
  
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();
    schema.methods.getEmail = function () {
      return this.email || this.toJSON().email || this.username || this.toJSON().username;
    };
    schema.methods.sendEmail = function (inputParams) {
      if (!transporter) throw '!transporter';
      var params = inputParams;
      if (typeof params === 'string') {
        params = { text: params };
      }
  
      var email = this.getEmail();
      var options = (0, _assign2.default)({ to: email }, ctx.config.mail.options, params);
      // console.log({options});
      return transporter.sendMailAsync(options);
    };
  
    // schema.methods.toJSON = function () {
    //   return _.omit(this.toObject(), ['password'])
    // }
    // schema.methods.getIdentity = function () {
    //   return _.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role'])
    // }
    // schema.methods.genAuthToken = function () {
    //   return jwt.sign(this.getIdentity(), ctx.config.jwt.secret)
    // }
    // schema.methods.verifyPassword = function (password) {
    //   return this.password === password
    // }
  
    var SALT_WORK_FACTOR = 10;
    schema.pre('save', function (next) {
      var _this = this;
  
      if (!this.isModified('password')) return next();
      return bcryptGenSalt(SALT_WORK_FACTOR).then(function (salt) {
        bcryptHash(_this.password, salt).then(function (hash) {
          _this.password = hash;
          next();
        });
      }).catch(next);
    });
  
    return schema;
  }
  
  exports.default = function (ctx) {
    var schema = getSchema(ctx);
    return ctx.db && ctx.db.model(schema.generateMongooseName('User'), schema.getMongooseSchema());
  };

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("bcryptjs");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("nodemailer");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _toConsumableArray2 = __webpack_require__(9);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _slicedToArray2 = __webpack_require__(51);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _mongoose = __webpack_require__(45);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var defaultParams = {
    filter: {},
    sort: {},
    limit: 20,
    populate: []
  };
  var defaultOptions = {
    timestamps: true
  };
  
  var UniversalSchema = function () {
    function UniversalSchema() {
      var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, UniversalSchema);
  
      this.schema = schema;
      this.options = (0, _assign2.default)({}, defaultOptions, options);
      this.statics = {
        findByParams: function findByParams(incomeParams) {
          var params = (0, _assign2.default)({}, defaultParams, incomeParams);
          return this.find(params.filter).sort(params.sort).limit(params.limit);
        }
      };
      this.methods = {};
      this.preMethods = {};
      this.postMethods = {};
      this.indexes = [];
      this.virtuals = [];
      // this.indexes = {}
    }
  
    (0, _createClass3.default)(UniversalSchema, [{
      key: 'extend',
      value: function extend(schema, options) {
        var _this = this;
  
        var object = new UniversalSchema();
        var fields = ['schema', 'options', 'statics', 'methods', 'preMethods', 'postMethods'];
        fields.forEach(function (key) {
          object[key] = (0, _assign2.default)({}, _this[key]);
        });
        (0, _assign2.default)(object.schema, schema);
        (0, _assign2.default)(object.options, options);
        return object;
      }
    }, {
      key: 'generateMongooseName',
      value: function generateMongooseName() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Model';
  
        return name + '_' + Date.now();
      }
    }, {
      key: 'getMongooseSchema',
      value: function getMongooseSchema() {
        var schema = new _mongoose2.default.Schema(this.schema, this.options);
        schema.statics = this.statics;
        schema.methods = this.methods;
        _lodash2.default.forEach(this.preMethods, function (val, key) {
          schema.pre(key, val);
        });
        _lodash2.default.forEach(this.postMethods, function (val, key) {
          schema.post(key, val);
        });
        _lodash2.default.forEach(this.virtuals, function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 3),
              args1 = _ref2[0],
              method = _ref2[1],
              args2 = _ref2[2];
  
          console.log('virtuals', method, args1);
          if (method == 'init') {
            schema.virtual.apply(schema, (0, _toConsumableArray3.default)(args1));
          } else {
            var _schema$virtual;
  
            (_schema$virtual = schema.virtual.apply(schema, (0, _toConsumableArray3.default)(args1)))[method].apply(_schema$virtual, (0, _toConsumableArray3.default)(args2));
          }
        });
        _lodash2.default.forEach(this.indexes, function (args) {
          schema.index.apply(schema, (0, _toConsumableArray3.default)(args));
        });
        return schema;
      }
    }, {
      key: 'pre',
      value: function pre(key, val) {
        this.preMethods[key] = val;
      }
    }, {
      key: 'post',
      value: function post(key, val) {
        this.postMethods[key] = val;
      }
    }, {
      key: 'virtual',
      value: function virtual() {
        var _this2 = this;
  
        for (var _len = arguments.length, args1 = Array(_len), _key = 0; _key < _len; _key++) {
          args1[_key] = arguments[_key];
        }
  
        if (args1.length > 1) {
          this.virtuals.push([args1, 'init']);
        }
        return {
          set: function set() {
            for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args2[_key2] = arguments[_key2];
            }
  
            _this2.virtuals.push([args1, 'set', args2]);
          },
          get: function get() {
            for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args2[_key3] = arguments[_key3];
            }
  
            _this2.virtuals.push([args1, 'get', args2]);
          }
        };
      }
    }, {
      key: 'index',
      value: function index() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
  
        this.indexes.push(args);
      }
    }]);
    return UniversalSchema;
  }();
  
  exports.default = UniversalSchema;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _AppError = __webpack_require__(71);
  
  var _AppError2 = _interopRequireDefault(_AppError);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return {
      e: function e(code, message, status) {
        return new _AppError2.default(code, message, status);
      },
      e500: function e500(message) {
        return new _AppError2.default(500, message, 500);
      },
      e404: function e404(message) {
        return new _AppError2.default(404, message, 404);
      },
      e403: function e403(message) {
        return new _AppError2.default(403, message, 403);
      },
      e401: function e401(message) {
        return new _AppError2.default(401, message, 401);
      }, // unauth
      e400: function e400(message) {
        return new _AppError2.default(400, message, 400);
      }
    };
  };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var AppError = function (_Error) {
    (0, _inherits3.default)(AppError, _Error);
  
    function AppError() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var message = arguments[1];
      var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
      (0, _classCallCheck3.default)(this, AppError);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (AppError.__proto__ || (0, _getPrototypeOf2.default)(AppError)).call(this, message));
  
      _this.name = _this.constructor.name;
      _this.code = code;
      _this.status = status;
      _this.message = message;
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(_this, _this.constructor);
      } else {
        _this.stack = new Error(message).stack;
      }
      return _this;
    }
  
    return AppError;
  }(Error);
  
  exports.default = AppError;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require;
  
    return {
      Auth: (_require = __webpack_require__(73)).default.apply(_require, arguments)
    };
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  exports.canonize = canonize;
  
  var _expressJwt = __webpack_require__(58);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function canonize(str) {
    return str.toLowerCase().trim();
  }
  
  exports.default = function (ctx) {
    var User = ctx.models.User;
    var resourse = {};
  
    resourse.validate = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req) {
        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return User.findById(req.user._id);
  
              case 2:
                user = _context.sent;
  
                if (user) {
                  _context.next = 5;
                  break;
                }
  
                throw ctx.errors.e404('Не найден user в базе');
  
              case 5:
                return _context.abrupt('return', {
                  __pack: 1,
                  jwt: req.user,
                  user: user
                });
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
  
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  
    resourse.silent = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req) {
        var params, username, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = req.allParams();
  
                if (params.username) params.username = canonize(params.username);
                if (params.email) params.email = canonize(params.email);
                username = '__s' + Date.now() + '__';
                user = new User((0, _assign2.default)({
                  username: username,
                  type: 'silent'
                }, params));
                _context2.next = 7;
                return user.save();
  
              case 7:
                return _context2.abrupt('return', {
                  __pack: 1,
                  signup: true,
                  user: user,
                  token: user.generateAuthToken()
                });
  
              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
  
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    resourse.getUserFields = function (req) {
      var params = req.allParams();
      if (params.login) {
        if (!params.username) params.username = params.login;
        if (!params.email && User.isValidEmail(params.login)) params.email = params.login; // if email
      }
      if (params.username) params.username = canonize(params.username);
      if (params.email) params.email = canonize(params.email);
      return params;
    };
    resourse.getUserCriteria = function (req) {
      var params = req.allParams();
      if (params.username) {
        return {
          username: canonize(params.username)
        };
      }
      if (params.email) {
        return {
          email: canonize(params.email)
        };
      }
      if (params.login) {
        return {
          $or: [{
            username: canonize(params.login)
          }, {
            email: canonize(params.login)
          }]
        };
      }
      throw ctx.errors.e400('Параметр username, email, login не передан');
    };
    resourse.signup = function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req) {
        var userFields, criteria, existUser, user, emailOptions, sended;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userFields = resourse.getUserFields(req);
                criteria = resourse.getUserCriteria(req);
                _context3.next = 4;
                return User.findOne(criteria);
  
              case 4:
                existUser = _context3.sent;
  
                if (!existUser) {
                  _context3.next = 7;
                  break;
                }
  
                throw ctx.errors.e400('Username with this email or username is registered');
  
              case 7:
                user = new User(userFields);
                _context3.next = 10;
                return user.save();
  
              case 10:
                emailOptions = {
                  subject: 'Регистрация на сайте',
                  text: 'Поздравляем с регистрацией'
                };
                sended = void 0;
                _context3.prev = 12;
                _context3.next = 15;
                return user.sendEmail(emailOptions);
  
              case 15:
                sended = true;
                _context3.next = 22;
                break;
  
              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3['catch'](12);
  
                ctx.log.warn(_context3.t0);
                sended = false;
  
              case 22:
                return _context3.abrupt('return', {
                  __pack: 1,
                  signup: true,
                  emailSended: sended,
                  user: user,
                  token: user.generateAuthToken()
                });
  
              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[12, 18]]);
      }));
  
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  
    resourse.login = function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req) {
        var params, criteria, user;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = req.allParams();
  
                if (params.password) {
                  _context4.next = 3;
                  break;
                }
  
                throw ctx.errors.e400('Параметр password не передан');
  
              case 3:
                criteria = resourse.getUserCriteria(req);
                _context4.next = 6;
                return User.findOne(criteria);
  
              case 6:
                user = _context4.sent;
  
                if (user) {
                  _context4.next = 9;
                  break;
                }
  
                throw ctx.errors.e404('Такой пользователь не найден');
  
              case 9:
                _context4.next = 11;
                return user.verifyPassword(params.password);
  
              case 11:
                if (_context4.sent) {
                  _context4.next = 13;
                  break;
                }
  
                throw ctx.errors.e400('Переданный пароль не подходит');
  
              case 13:
                return _context4.abrupt('return', {
                  __pack: 1,
                  user: user,
                  token: user.generateAuthToken()
                });
  
              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
  
      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }();
    resourse.recovery = function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req) {
        var criteria, user, password, emailOptions, sended;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // const params = req.allParams();
  
                criteria = resourse.getUserCriteria(req);
                _context5.next = 3;
                return User.findOne(criteria);
  
              case 3:
                user = _context5.sent;
  
                if (user) {
                  _context5.next = 6;
                  break;
                }
  
                throw ctx.errors.e404('Такой пользователь не найден');
  
              case 6:
                password = User.generatePassword();
  
                user.password = password;
                _context5.next = 10;
                return user.save();
  
              case 10:
                console.log('user', user);
                emailOptions = {
                  subject: 'Восстановление пароля на сайте',
                  text: '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C: ' + password
                };
                sended = void 0;
                _context5.prev = 13;
                _context5.next = 16;
                return user.sendEmail(emailOptions);
  
              case 16:
                sended = true;
                _context5.next = 23;
                break;
  
              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5['catch'](13);
  
                ctx.log.warn(_context5.t0);
                sended = false;
  
              case 23:
                return _context5.abrupt('return', {
                  __pack: 1,
                  emailSended: sended
                });
  
              case 24:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[13, 19]]);
      }));
  
      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }();
  
    return resourse;
  };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  exports.default = function (ctx) {
    // eslint-disable-line
    return {
      allParams: function allParams() {
        var params = {};
        (0, _assign2.default)(params, this.params);
        (0, _assign2.default)(params, this.body);
        (0, _assign2.default)(params, this.query);
  
        return params;
      }
    };
  };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require, _require2, _require3;
  
    // eslint-disable-line
    return {
      err: (_require = __webpack_require__(76)).default.apply(_require, arguments), // eslint-disable-line
      ok: (_require2 = __webpack_require__(77)).default.apply(_require2, arguments), // eslint-disable-line
      pack: (_require3 = __webpack_require__(78)).default.apply(_require3, arguments) };
  };

/***/ },
/* 76 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function err(err) {
      if (!err) {
        err = {
          code: 1,
          message: 'Неизвестная ошибка'
        };
      }
      if (typeof err === 'string') {
        err = {
          code: 1,
          message: err
        };
      }
      if (!err.code) {
        err.code = 1;
      }
      if (this.statusCode < 400) {
        this.status(500);
      }
      return this.pack(null, err);
    };
  };

/***/ },
/* 77 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function ok(data) {
      console.log('ok', data);
      var info = {
        code: 0,
        message: 'ok'
      };
      return this.pack(data, info);
    };
  };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function pack(data, info) {
      var pck = {
        code: info.code,
        message: info.message
      };
      if (data) {
        if (data.__pack) {
          console.log('__pack! !!!');
  
          (0, _assign2.default)(pck, _lodash2.default.omit(data, ['__pack']));
        } else {
          pck.data = data;
        }
      }
      if ((true) && info.err) {
        pck.err = info.err;
      }
      console.log('json', data);
      return this.json(pck);
    };
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require, _require2, _require3, _require4;
  
    return {
      checkNotFound: (_require = __webpack_require__(80)).default.apply(_require, arguments), // eslint-disable-line
      createResourse: (_require2 = __webpack_require__(81)).default.apply(_require2, arguments), // eslint-disable-line
      getToken: (_require3 = __webpack_require__(82)).default.apply(_require3, arguments), // eslint-disable-line
      wrapResourse: (_require4 = __webpack_require__(83)).default.apply(_require4, arguments) };
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function checkNotFound(data) {
      if (!data) throw ctx.errors.e404('Object not found');
      return _promise2.default.resolve(data);
    };
  };

/***/ },
/* 81 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function createResourse(Model) {
      return {
        list: function list() {
          return Model.find({});
        },
        create: function create(req) {
          var data = req.allParams();
          return Model.create(data);
        },
        get: function get(req) {
          var id = req.params.id;
          return Model.findById(id).then(ctx.helpers.checkNotFound);
        },
        update: function update(req) {
          var id = req.allParams().id;
          var data = req.allParams();
          return Model.findByIdAndUpdate(id, data, { new: true }).then(ctx.helpers.checkNotFound);
        },
        remove: function remove(req) {
          var id = req.allParams().id;
          return Model.findByIdAndRemove(id).then(ctx.helpers.checkNotFound);
        }
      };
    };
  };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function (ctx) {
    return function getToken(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.headers['x-access-token']) {
        return req.headers['x-access-token'];
      } else if (req.query && req.query.token) {
        return req.query.token;
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      if ((true) && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken;
      return null;
    };
  };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _AsyncRouter = __webpack_require__(36);
  
  var _AsyncRouter2 = _interopRequireDefault(_AsyncRouter);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (ctx) {
    return function wrapResourse(resourse) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
      var api = params.api || params.router || (0, _AsyncRouter2.default)();
      var prefix = params.prefix || '';
      var middleware = params.middleware || function () {};
      api.get(prefix + '/', middleware, resourse.list);
      api.post(prefix + '/', middleware, resourse.create);
      api.get(prefix + '/:id', middleware, resourse.get);
      api.all(prefix + '/:id/create', middleware, resourse.create);
      api.put(prefix + '/:id', middleware, resourse.update);
      api.all(prefix + '/:id/update', middleware, resourse.update);
      api.delete(prefix + '/:id', middleware, resourse.remove);
      api.all(prefix + '/:id/remove', middleware, resourse.remove);
      return api;
    };
  };

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HomePage = __webpack_require__(87);
  
  var _HomePage2 = _interopRequireDefault(_HomePage);
  
  var _CounterPage = __webpack_require__(98);
  
  var _CounterPage2 = _interopRequireDefault(_CounterPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import InitPage from './InitPage'
  // import IndexPage from './IndexPage'
  // import { LoginPage, RegisterPage } from './AuthPage'
  // import ErrorPage from './ErrorPage'
  // import App from '../App'
  var _ref = _react2.default.createElement(_HomePage2.default, null);
  
  var _ref2 = _react2.default.createElement(
    'div',
    null,
    'static'
  );
  
  var _ref3 = _react2.default.createElement(_CounterPage2.default, null);
  
  var _ref4 = _react2.default.createElement(
    'div',
    null,
    'Page Not Found'
  );
  
  exports.default = {
  
    path: '/',
  
    // Keep in mind, routes are evaluated in order
    children: [{
      path: '/',
      action: function action() {
        var _this = this;
  
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', {
                    title: 'HomePage',
                    component: _ref
                  });
  
                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      }
    }, {
      path: '/static',
      action: function action() {
        var _this2 = this;
  
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', {
                    title: 'StaticPage',
                    component: _ref2
                  });
  
                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      }
    }, {
      path: '/counter',
      action: function action() {
        var _this3 = this;
  
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', {
                    title: 'CounterPage',
                    component: _ref3
                  });
  
                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }))();
      }
    },
    // require('./home').default,
    // require('./contact').default,
    // require('./login').default,
    // require('./register').default,
    //
    // // place new routes before...
    // require('./content').default,
  
    {
  
      path: '*',
  
      action: function action() {
        return {
          title: "Page Not Found",
          component: _ref4,
          status: 404
        };
      }
    }],
  
    action: function action(_ref5) {
      var _this4 = this;
  
      var next = _ref5.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var route;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                route = void 0;
  
                // Execute each child route until one of them return the result
                // TODO: move this logic to the `next` function
                // console.log('action');
  
              case 1:
                _context4.next = 3;
                return next();
  
              case 3:
                route = _context4.sent;
  
              case 4:
                if (!route) {
                  _context4.next = 1;
                  break;
                }
  
              case 5:
  
                // Provide default values for title, description etc.
                route.title = (route.title || 'Untitled Page') + ' - Lego Starter Kit';
                route.description = route.description || '';
  
                return _context4.abrupt('return', route);
  
              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    }
  };
  
  // export default {
  //   path: '/',
  //   children: [
  //     {
  //       path: '/',
  //       action() {
  //         return <div>
  //           Main Page
  //         </div>
  //       },
  //     },
  //   ],
  //   async action({ next, render, context }) {
  //     const component = await next();
  //     if (component === undefined) return component;
  //     return render(component)
  //     //   <App context={context}>
  //     //     {component}
  //     //   </App>
  //     // );
  //   },
  // };

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _A = __webpack_require__(89);
  
  var _A2 = _interopRequireDefault(_A);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(
    'div',
    { styleName: 'root' },
    'Welcome to HomePageasdas',
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      _A2.default,
      { href: '/counter' },
      'Go to CounterPage'
    )
  );
  
  var HomePage = (_dec = (0, _importcss2.default)(__webpack_require__(96)), _dec(_class = function (_Component) {
    (0, _inherits3.default)(HomePage, _Component);
  
    function HomePage() {
      (0, _classCallCheck3.default)(this, HomePage);
      return (0, _possibleConstructorReturn3.default)(this, (HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(HomePage, [{
      key: 'render',
      value: function render() {
        return _ref;
      }
    }]);
    return HomePage;
  }(_react.Component)) || _class);
  exports.default = HomePage;

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("importcss");

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Link = __webpack_require__(90);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var A = (_dec = (0, _importcss2.default)(__webpack_require__(92)), _dec(_class = function (_Component) {
    (0, _inherits3.default)(A, _Component);
  
    function A() {
      (0, _classCallCheck3.default)(this, A);
      return (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(A, [{
      key: 'render',
      value: function render() {
        var bsStyle = this.props.bsStyle || 'primary';
        var className = [this.props.className, this.props.styles && this.props.styles.A, this.props.styles && this.props.styles['A_style_' + bsStyle]].filter(function (a) {
          return a;
        }).join(' ');
        return _react2.default.createElement(_Link2.default, (0, _extends3.default)({}, this.props, { className: className, href: this.props.href || this.props.to }));
      }
    }]);
    return A;
  }(_react.Component)) || _class);
  exports.default = A;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(91);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp2;
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          return;
        }
  
        event.preventDefault();
        _this.context.history.push(_this.props.to || _this.props.href);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            children = _props.children,
            props = (0, _objectWithoutProperties3.default)(_props, ['to', 'children']);
  
        return _react2.default.createElement(
          'a',
          (0, _extends3.default)({ href: to || this.props.href }, props, { onClick: this.handleClick }),
          children
        );
      }
    }]);
    return Link;
  }(_react.Component), _class.contextTypes = {
    history: _react.PropTypes.object.isRequired
  }, _temp2);
  exports.default = Link;

/***/ },
/* 91 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(93);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./A.css", function() {
          content = require("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./A.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, "._2kzi{text-decoration:underline}._37zj{color:#da3b37}.E2Fc{color:#c4c4c4}", ""]);
  
  // exports
  exports.locals = {
  	"A": "_2kzi",
  	"A_style_primary": "_37zj",
  	"A_style_secondary": "E2Fc"
  };

/***/ },
/* 94 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _stringify = __webpack_require__(49);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(51);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(35);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$replace = _ref.replace,
        replace = _ref$replace === undefined ? false : _ref$replace,
        _ref$prepend = _ref.prepend,
        prepend = _ref$prepend === undefined ? false : _ref$prepend;
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
          moduleId = _styles$i[0],
          css = _styles$i[1],
          media = _styles$i[2],
          sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap && btoa) {
        // skip IE9 and below, see http://caniuse.com/atob-btoa
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(97);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./HomePage.css", function() {
          content = require("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./HomePage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, ".HAL7{text-align:center;font-size:24pt}", ""]);
  
  // exports
  exports.locals = {
  	"root": "HAL7"
  };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _A = __webpack_require__(89);
  
  var _A2 = _interopRequireDefault(_A);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement('hr', null);
  
  var _ref2 = _react2.default.createElement(
    _A2.default,
    { href: '/' },
    'Go to HomePage'
  );
  
  var CounterPage = (_dec = (0, _importcss2.default)(__webpack_require__(99)), _dec(_class = function (_Component) {
    (0, _inherits3.default)(CounterPage, _Component);
  
    function CounterPage() {
      (0, _classCallCheck3.default)(this, CounterPage);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (CounterPage.__proto__ || (0, _getPrototypeOf2.default)(CounterPage)).call(this));
  
      _this.state = {
        counter: 10
      };
      return _this;
    }
  
    (0, _createClass3.default)(CounterPage, [{
      key: 'handleChange',
      value: function handleChange(change) {
        var _this2 = this;
  
        return function () {
          _this2.setState({
            counter: _this2.state.counter + change
          });
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { styleName: 'root' },
          'Welcome to CounterPage',
          _react2.default.createElement(
            'h1',
            null,
            this.state.counter
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.handleChange(-1) },
            '-1'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.handleChange(1) },
            '+1'
          ),
          _ref,
          _ref2
        );
      }
    }]);
    return CounterPage;
  }(_react.Component)) || _class);
  exports.default = CounterPage;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(100);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./CounterPage.css", function() {
          content = require("!!./../../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../postcss-loader/index.js?pack=default!./CounterPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, "._2XBW{text-align:center;font-size:18pt}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2XBW"
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Root = undefined;
  
  var _stringify = __webpack_require__(49);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp, _class2, _temp2;
  // import useragent from 'useragent'
  
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactTunnel = __webpack_require__(102);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _util = __webpack_require__(103);
  
  var _util2 = _interopRequireDefault(_util);
  
  var _server = __webpack_require__(104);
  
  var _server2 = _interopRequireDefault(_server);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Root = exports.Root = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Root, _Component);
  
    function Root(props) {
      (0, _classCallCheck3.default)(this, Root);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || (0, _getPrototypeOf2.default)(Root)).call(this, props));
  
      _this.state = props.ctx.rootState || {};
      return _this;
    }
  
    (0, _createClass3.default)(Root, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var html = document.getElementsByTagName("html")[0];
        html.className = html.className.replace('ua_js_no', 'ua_js_yes');
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;
  
        return {
          history: this.props.ctx && this.props.ctx.history || function () {},
          insertCss: this.props.ctx && this.props.ctx.insertCss || function () {},
          rootState: this.state,
          setRootState: function setRootState() {
            _this2.setState.apply(_this2, arguments);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        var provider = this.props.ctx.provider;
        return _react2.default.createElement(
          _reactTunnel.Provider,
          { provide: provider.provide.bind(provider) },
          function () {
            return _this3.props.component;
          }
        );
      }
    }]);
    return Root;
  }(_react.Component), _class.childContextTypes = {
    history: _react.PropTypes.object.isRequired,
    insertCss: _react.PropTypes.func.isRequired,
    rootState: _react.PropTypes.object.isRequired,
    setRootState: _react.PropTypes.func.isRequired
  }, _temp);
  var Html = (_temp2 = _class2 = function () {
    function Html(props) {
      (0, _classCallCheck3.default)(this, Html);
  
      this.props = props || {};
    }
  
    (0, _createClass3.default)(Html, [{
      key: 'getHtmlClass',
      value: function getHtmlClass(req) {
        var ua = {}; //useragent.is(req.headers['user-agent'])
        ua.js = false;
        return _lodash2.default.map(ua, function (val, key) {
          return 'ua_' + key + '_' + (val ? 'yes' : 'no');
        }).join(' ') || '';
      }
    }, {
      key: 'getRootState',
      value: function getRootState() {
        return this.props.ctx.rootState;
      }
    }, {
      key: 'renderStyle',
      value: function renderStyle() {
        // console.log('this.props.ctx', this.props.ctx);
        var styles = this.props.ctx.style || [];
        return '<style id="css">' + styles.join("\n") + '</style>';
      }
    }, {
      key: 'renderHead',
      value: function renderHead() {
        return '<title>' + this.props.title + '</title>\n<meta charset="utf-8">\n<meta http-equiv="x-ua-compatible" content="ie=edge" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n' + this.renderAssets('css') + '\n' + this.renderStyle() + '\n';
      }
    }, {
      key: 'renderRoot',
      value: function renderRoot() {
        var Root = this.constructor.Root;
        var component = _react2.default.createElement(
          Root,
          (0, _extends3.default)({}, this.props, { rootState: this.getRootState() }),
          this.props.children
        );
        return _server2.default.renderToStaticMarkup(component);
      }
    }, {
      key: 'renderAssets',
      value: function renderAssets(type) {
        var props = this.props;
  
        if (type === 'css' && props.assets && props.assets.css) {
          return '<link rel="stylesheet" href="' + props.assets.css + '">';
        }
        if (type === 'js' && props.assets && props.assets.js) {
          return '<script id="js" src="' + props.assets.js + '"></script>';
        }
        return '';
      }
    }, {
      key: 'renderFooter',
      value: function renderFooter() {
        var debug =  true ? '<!-- ' + _util2.default.inspect((0, _extends3.default)({}, this.props, { style: undefined, req: undefined, ctx: null })) + ' -->' : '';
        return (this.props.footerHtml || '') + '\n' + debug + '\n    ';
      }
    }, {
      key: 'render',
      value: function render() {
        var root = this.renderRoot(); // because async style render
        return '<!doctype html>\n<html class="' + this.getHtmlClass(this.props.req) + '">\n  <head>\n    ' + this.renderHead() + '\n  </head>\n  <body>\n    <div id="root"/>\n      ' + root + '\n    </div>\n    <script>\n      window.__ROOT_STATE__ = ' + (0, _stringify2.default)(this.getRootState()) + ';\n    </script>\n    ' + this.renderAssets('js') + '\n    ' + this.renderFooter() + '\n  </body>\n</html>\n    ';
      }
    }]);
    return Html;
  }(), _class2.Root = Root, _class2.Root = Root, _temp2);
  exports.default = Html;

/***/ },
/* 102 */
/***/ function(module, exports) {

  module.exports = require("react-tunnel");

/***/ },
/* 103 */
/***/ function(module, exports) {

  module.exports = require("util");

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import UserStore from './stores/UserStore';
  // import ProfileStore from './stores/ProfileStore';
  // import ApiClient from './api/api.client';
  
  var Provider = function () {
    // user = null;
    // api = null;
    function Provider() {
      // const token = props.token || (props.user && props.user.token)
      // // console.log('AppStore constructor token', token);
      // this.api = new ApiClient({ base: '/api/v1' });
      // if (token) {
      //   this.api.setAuthToken(token)
      // }
      // const userData = {
      //   token: props.token,
      //   user: props.user,
      // }
      // this.user = new UserStore(this, userData);
      // this.profile = new ProfileStore(this);
      // this.app = this;
      // if (__CLIENT__) {
      //   global.api = this.api
      // }
  
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck3.default)(this, Provider);
    }
  
    (0, _createClass3.default)(Provider, [{
      key: "provide",
      value: function provide() {
        return {
          asd: 123
        };
      }
    }]);
    return Provider;
  }();
  
  exports.default = Provider;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getApi;
  
  var _AsyncRouter = __webpack_require__(36);
  
  var _AsyncRouter2 = _interopRequireDefault(_AsyncRouter);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function getApi(ctx, params) {
    var api = ctx.asyncRouter();
  
    // api.all('/universal', createRoute({ ...ctx, models }));
    // ctx.app.ws('/universal', createSocketNamespace({ ...ctx, models }))
  
    // api.all('/universal-socket', createRoute({...ctx, models, socket: true}));
    api.all('/auth/login', ctx.resourses.Auth.login);
    api.all('/auth/signup', ctx.resourses.Auth.signup);
    api.all('/auth/recovery', ctx.resourses.Auth.recovery);
    api.all('/auth/recovery', ctx.resourses.Auth.recovery);
    // api.all('/rpc', createRpcRoute(ctx.models))
  
  
    api.all('*', function () {
      return 'Mobx API working';
    });
    return api;
  } // import { createRoute, createSocketNamespace } from 'universal-model';

/***/ },
/* 107 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getDocs;
  // import api from 'lego-starter-kit/api/api.client'
  // export default api
  
  function getDocs() {
    return {};
  }

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPage = __webpack_require__(109);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _client = __webpack_require__(124);
  
  var _client2 = _interopRequireDefault(_client);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import HomePage from './HomeWWS'
  exports.default = {
    path: '/',
    children: [(0, _extends3.default)({
      path: '/'
    }, __webpack_require__(125).default), (0, _extends3.default)({
      path: '/admin'
    }, __webpack_require__(134).default), (0, _extends3.default)({
      path: '/auth'
    }, __webpack_require__(161).default), (0, _extends3.default)({
      path: '/cabinet'
    }, __webpack_require__(181).default), {
      path: '*',
      action: function action() {
        throw 'Not found';
      }
    }],
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next,
          ctx = _ref.ctx;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var route;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                route = void 0;
                _context.prev = 1;
                _context.next = 4;
                return next();
  
              case 4:
                route = _context.sent;
                _context.next = 11;
                break;
  
              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);
  
                console.log('err!!!!!!!!!!!!!!!!!!!!!!!!!!!!', _context.t0);
                route = {
                  title: '!!!Error: ' + _context.t0,
                  component: _react2.default.createElement(
                    _ErrorPage2.default,
                    null,
                    'Error: ' + _context.t0
                  )
                };
  
              case 11:
                if (!route) route = {};
                route.title = (route.title || 'Untitled Page') + ' - ' + _client2.default.siteTitle;
                route.description = route.description || _client2.default.siteTitle;
                return _context.abrupt('return', route);
  
              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[1, 7]]);
      }))();
    }
  };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactstrap = __webpack_require__(110);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _refresh = __webpack_require__(112);
  
  var _refresh2 = _interopRequireDefault(_refresh);
  
  var _clear = __webpack_require__(113);
  
  var _clear2 = _interopRequireDefault(_clear);
  
  var _check = __webpack_require__(114);
  
  var _check2 = _interopRequireDefault(_check);
  
  var _Slide = __webpack_require__(115);
  
  var _Slide2 = _interopRequireDefault(_Slide);
  
  var _Link = __webpack_require__(120);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Header = __webpack_require__(121);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // @inject('app')
  
  // import importcss from 'importcss';
  // import { autobind } from 'core-decorators';
  // import { inject } from 'mobx-react';
  var _ref = _react2.default.createElement(_Header2.default, null);
  
  var _ref2 = _react2.default.createElement(
    _reactBootstrap.Button,
    {
      componentClass: _Link2.default,
      href: '/',
      block: true
    },
    '\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443'
  );
  
  var ErrorPage = function (_Component) {
    (0, _inherits3.default)(ErrorPage, _Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (ErrorPage.__proto__ || (0, _getPrototypeOf2.default)(ErrorPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'render',
      value: function render() {
        var type = this.props.type;
  
        console.log(this.props);
        return _react2.default.createElement(
          'div',
          null,
          _ref,
          _react2.default.createElement(
            _Slide2.default,
            {
              full: true,
              video: 'http://skill-branch.ru/video-background.webm',
              overlay: true
            },
            _react2.default.createElement(
              _reactBootstrap.Grid,
              null,
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { md: 4, mdOffset: 4 },
                  _react2.default.createElement(
                    _reactstrap.Card,
                    null,
                    _react2.default.createElement(
                      _reactstrap.CardBlock,
                      null,
                      _react2.default.createElement(
                        _reactstrap.CardTitle,
                        null,
                        this.props.title || 'Ошибка'
                      ),
                      _react2.default.createElement(
                        _reactstrap.CardText,
                        null,
                        this.props.children
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactstrap.Card,
                    null,
                    _react2.default.createElement(
                      _reactstrap.CardBlock,
                      { className: 'text-xs-center', style: { textAlign: 'center' } },
                      _ref2
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react.Component);
  
  exports.default = ErrorPage;

/***/ },
/* 110 */
/***/ function(module, exports) {

  module.exports = require("reactstrap");

/***/ },
/* 111 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ },
/* 112 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/md/refresh");

/***/ },
/* 113 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/md/clear");

/***/ },
/* 114 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/md/check");

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class, _class2, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _reactDriveIn = __webpack_require__(116);
  
  var _reactDriveIn2 = _interopRequireDefault(_reactDriveIn);
  
  var _classnames = __webpack_require__(117);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement('div', { styleName: 'Slide__noclick' });
  
  var Slide = (_dec = (0, _importcss2.default)(__webpack_require__(118)), _dec(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(Slide, _Component);
  
    function Slide() {
      (0, _classCallCheck3.default)(this, Slide);
      return (0, _possibleConstructorReturn3.default)(this, (Slide.__proto__ || (0, _getPrototypeOf2.default)(Slide)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Slide, [{
      key: 'renderVideo',
      value: function renderVideo(video) {
        // https://www.youtube.com/asdasd/asd/asd/watch?v=c-shIOFYCRU
        // https://youtu.be/C8PYHjRj-zk
        // https://www.youtube.com/embed/C8PYHjRj-zk
        // https://youtu.be/c-shIOFYCRU?t=3m26s
        //
        if (video.indexOf('youtube.com') !== -1 || video.indexOf('youtu.be') !== -1) {
          var code = video.split('watch?v=').pop().split('/').pop().split('?')[0];
          var playlist = 'https://www.youtube.com/embed/' + code + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=' + code;
          return _react2.default.createElement(
            'div',
            { styleName: 'Slide__video Slide__video_youtube' },
            _react2.default.createElement(
              'div',
              { styleName: 'Slide__videoForeground' },
              _react2.default.createElement('iframe', {
                styleName: 'video',
                frameBorder: '0',
                allowFullScreen: '1',
                width: '640',
                height: '360',
                src: playlist
              })
            )
          );
        }
        return _react2.default.createElement(
          'div',
          { styleName: 'Slide__video' },
          _react2.default.createElement(_reactDriveIn2.default, {
            show: video
          })
        );
      }
    }, {
      key: 'renderBg',
      value: function renderBg() {
        var overlay = this.props.overlay;
        var _props = this.props,
            video = _props.video,
            image = _props.image;
  
        if (overlay === true) {
          overlay = 'rgba(0,0,0,0.5)';
        }
  
        return _react2.default.createElement(
          'div',
          { styleName: 'Slide__bg' },
          _ref,
          this.props.overlay ? _react2.default.createElement('div', { styleName: 'Slide__overlay', style: { backgroundColor: overlay } }) : null,
          video ? this.renderVideo(video) : null,
          image ? _react2.default.createElement('div', {
            styleName: 'Slide__image',
            style: { backgroundImage: 'url(' + image + ')' }
          }) : null
        );
      }
    }, {
      key: 'renderInner',
      value: function renderInner() {
        var height = this.props.height;
        var _props2 = this.props,
            width = _props2.width,
            top = _props2.top,
            left = _props2.left,
            right = _props2.right,
            bottom = _props2.bottom,
            content = _props2.content,
            children = _props2.children,
            full = _props2.full;
  
        var style = {};
        if (full && !height) {
          height = '100vh';
        }
        if (height) {
          style.minHeight = height;
        }
        if (width) {
          style.minWidth = width;
        }
        return _react2.default.createElement(
          'div',
          { styleName: 'Slide__inner', style: style },
          top ? _react2.default.createElement(
            'div',
            { styleName: 'Slide__top' },
            top
          ) : null,
          _react2.default.createElement(
            'div',
            { styleName: 'Slide__middle' },
            left ? _react2.default.createElement(
              'div',
              { styleName: 'Slide__left' },
              left
            ) : null,
            _react2.default.createElement(
              'div',
              { styleName: 'Slide__center' },
              _react2.default.createElement(
                'div',
                { styleName: 'Slide__content' },
                content,
                children
              )
            ),
            right ? _react2.default.createElement(
              'div',
              { styleName: 'Slide__right' },
              right
            ) : null
          ),
          bottom ? _react2.default.createElement(
            'div',
            { styleName: 'Slide__bottom' },
            bottom
          ) : null
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            style = _props3.style,
            color = _props3.color,
            className = _props3.className,
            fixed = _props3.fixed,
            center = _props3.center,
            stretch = _props3.stretch;
  
        style.backgroundColor = color;
        return _react2.default.createElement(
          'div',
          {
            styleName: (0, _classnames2.default)({
              Slide: true,
              Slide_stretch: stretch,
              Slide_fixed: fixed,
              Slide_center: center
            }),
            className: className,
            style: style
          },
          this.renderBg(),
          this.renderInner()
        );
      }
    }]);
    return Slide;
  }(_react.Component), _class2.defaultProps = {
    color: 'transparent',
    overlay: false,
    video: null,
    stretch: false,
    full: false,
    image: null,
    width: null,
    height: null,
    top: null,
    left: null,
    right: null,
    bottom: null,
    content: null,
    children: null,
    className: '',
    style: {},
    fixed: false,
    center: false
  }, _temp)) || _class);
  exports.default = Slide;

/***/ },
/* 116 */
/***/ function(module, exports) {

  module.exports = require("react-drive-in");

/***/ },
/* 117 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(119);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./Slide.css", function() {
          content = require("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./Slide.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, ".fn9Z{position:relative}._1hqg{text-align:center;z-index:110}._3ud1 ._7h1Z{-webkit-box-align:stretch!important;-webkit-align-items:stretch!important;-ms-flex-align:stretch!important;align-items:stretch!important}._3ud1 .QPVr{height:100%}._3K9T .QPVr{margin-right:auto;margin-left:auto;width:100%}@media (min-width:768px) and (max-width:991px){._3K9T .QPVr{width:750px}}@media (min-width:992px) and (max-width:1199px){._3K9T .QPVr{width:970px}}@media (min-width:1200px) and (max-width:9998px){._3K9T .QPVr{width:1170px}}._1rq7{z-index:110;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}.ySfe{padding-top:40px}._7h1Z{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:20px 10px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:100%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;z-index:110}._1MT9{padding-bottom:40px}._29x_{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}._1Bxf{z-index:103}._1Bxf,._2maI{width:100%;height:100%;position:absolute;overflow:hidden;top:0;left:0}._2maI{z-index:102}._3cHL{width:100%;height:100%;overflow:hidden;top:0;left:0;z-index:101}._3cHL,._13aP{position:absolute}._13aP{display:block;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);left:50%;top:50%;width:1650px;height:930px}._3tsY,.sNVK iframe{width:100%;height:100%;position:absolute;overflow:hidden;top:0;left:0}._3tsY{z-index:100;-webkit-background-size:cover;background-size:cover;background-position:50%;background-repeat:no-repeat}///////////////// ._3bqu{position:absolute;width:1888px;height:1347.44px;top:0;left:0;overflow:hidden;opacity:1;margin-top:-170.72px;margin-left:-558px;-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:1s;-o-transition-duration:1s;transition-duration:1s}// Youtube .G5LQ{position:absolute;z-index:-2;top:0;left:0;background-position:50%}._1TI-,// Youtube .G5LQ{width:100%;height:100%;-webkit-background-size:cover;background-size:cover;background-repeat:no-repeat}._1TI-{background-attachment:scroll;background-position:50% 0}", ""]);
  
  // exports
  exports.locals = {
  	"Slide": "fn9Z",
  	"Slide_center": "_1hqg",
  	"Slide_stretch": "_3ud1",
  	"Slide__middle": "_7h1Z",
  	"Slide__content": "QPVr",
  	"Slide_fixed": "_3K9T",
  	"Slide__inner": "_1rq7",
  	"Slide__top": "ySfe",
  	"Slide__bottom": "_1MT9",
  	"Slide__left": "_2sLN",
  	"Slide__center": "_29x_",
  	"Slide__right": "_3GE3",
  	"Slide__noclick": "_1Bxf",
  	"Slide__overlay": "_2maI",
  	"Slide__video": "_3cHL",
  	"Slide__videoForeground": "_13aP",
  	"Slide__video_youtube": "sNVK",
  	"Slide__image": "_3tsY",
  	"video": "_3bqu",
  	"Slide__bg-video": "G5LQ",
  	"Slide__bg-video-inner": "_1TI-"
  };

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(91);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp2;
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          return;
        }
  
        event.preventDefault();
        _this.context.history.push(_this.props.to || _this.props.href);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            href = _props.href,
            children = _props.children,
            props = (0, _objectWithoutProperties3.default)(_props, ['to', 'href', 'children']);
  
        return _react2.default.createElement(
          'a',
          (0, _extends3.default)({ href: to || href }, props, { onClick: this.handleClick }),
          children
        );
      }
    }]);
    return Link;
  }(_react.Component), _class.defaultProps = {
    children: null,
    onClick: null,
    to: null,
    href: null
  }, _class.contextTypes = {
    history: _react.PropTypes.object.isRequired
  }, _temp2);
  exports.default = Link;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _mobxReact = __webpack_require__(122);
  
  var _Link = __webpack_require__(120);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _mobx = __webpack_require__(123);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(
    _reactBootstrap.Navbar.Header,
    null,
    _react2.default.createElement(
      _reactBootstrap.Navbar.Brand,
      null,
      _react2.default.createElement(
        _Link2.default,
        { href: '/' },
        'Example'
      )
    )
  );
  
  var _ref2 = _react2.default.createElement(
    _reactBootstrap.Nav,
    null,
    _react2.default.createElement(
      _reactBootstrap.NavItem,
      { eventKey: 1, componentClass: _Link2.default, href: '/' },
      '\u0413\u043B\u0430\u0432\u043D\u0430\u044F'
    ),
    _react2.default.createElement(
      _reactBootstrap.NavItem,
      { eventKey: 2, componentClass: _Link2.default, href: '/admin' },
      '\u0410\u0434\u043C\u0438\u043D\u043A\u0430'
    ),
    _react2.default.createElement(
      _reactBootstrap.NavDropdown,
      { eventKey: 3, title: 'Dropdown', id: 'basic-nav-dropdown' },
      _react2.default.createElement(
        _reactBootstrap.MenuItem,
        { eventKey: 3.1 },
        'Action'
      ),
      _react2.default.createElement(
        _reactBootstrap.MenuItem,
        { eventKey: 3.2 },
        'Another action'
      ),
      _react2.default.createElement(
        _reactBootstrap.MenuItem,
        { eventKey: 3.3 },
        'Something else here'
      ),
      _react2.default.createElement(_reactBootstrap.MenuItem, { divider: true }),
      _react2.default.createElement(
        _reactBootstrap.MenuItem,
        { eventKey: 3.3 },
        'Separated link'
      )
    )
  );
  
  var _ref3 = _react2.default.createElement(
    _reactBootstrap.MenuItem,
    { eventKey: 1.1, componentClass: _Link2.default, href: '/cabinet' },
    '\u041F\u0440\u043E\u0444\u0438\u043B\u044C'
  );
  
  var _ref4 = _react2.default.createElement(
    _reactBootstrap.MenuItem,
    { eventKey: 1.3, componentClass: _Link2.default, href: '/cabinet/settings' },
    '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438'
  );
  
  var _ref5 = _react2.default.createElement(_reactBootstrap.MenuItem, { divider: true });
  
  var _ref6 = _react2.default.createElement(
    _reactBootstrap.MenuItem,
    { eventKey: 1.4, componentClass: _Link2.default, href: '/auth/logout' },
    '\u0412\u044B\u0445\u043E\u0434'
  );
  
  var _ref7 = _react2.default.createElement(
    _reactBootstrap.NavItem,
    { eventKey: 2, componentClass: _Link2.default, href: '/auth' },
    '\u0412\u043E\u0439\u0442\u0438'
  );
  
  var Header = (_dec = (0, _mobxReact.inject)('auth', 'user'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Header, _Component);
  
    function Header() {
      (0, _classCallCheck3.default)(this, Header);
      return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Header, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            auth = _props.auth,
            user = _props.user;
  
        return _react2.default.createElement(
          _reactBootstrap.Navbar,
          { fixedTop: true },
          _ref,
          _ref2,
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { pullRight: true },
            auth.isAuth ? _react2.default.createElement(
              _reactBootstrap.NavDropdown,
              { eventKey: 1, title: user.name, id: 'user-dropdown' },
              _ref3,
              _ref4,
              _ref5,
              _ref6
            ) : null,
            !auth.isAuth ? _ref7 : null
          )
        );
      }
    }]);
    return Header;
  }(_react.Component)) || _class) || _class);
  exports.default = Header;

/***/ },
/* 122 */
/***/ function(module, exports) {

  module.exports = require("mobx-react");

/***/ },
/* 123 */
/***/ function(module, exports) {

  module.exports = require("mobx");

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _config = __webpack_require__(8);
  
  var _config2 = _interopRequireDefault(_config);
  
  var _client = __webpack_require__(11);
  
  var _client2 = _interopRequireDefault(_client);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = _config2.default.client(_client2.default, {
    siteTitle: 'The Site Title',
    api: {
      base: '/api/v1'
    },
    host:  true ? 'http://localhost:3000' : 'http://localhost:3000'
  });

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HomePage = __webpack_require__(126);
  
  var _HomePage2 = _interopRequireDefault(_HomePage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(_HomePage2.default, null);
  
  exports.default = {
    action: function action() {
      return {
        component: _ref
      };
    }
  };

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _reactstrap = __webpack_require__(110);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _Component2 = __webpack_require__(127);
  
  var _Component3 = _interopRequireDefault(_Component2);
  
  var _Slide = __webpack_require__(115);
  
  var _Slide2 = _interopRequireDefault(_Slide);
  
  var _A = __webpack_require__(128);
  
  var _A2 = _interopRequireDefault(_A);
  
  var _Header = __webpack_require__(121);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Header2.default, null),
    _react2.default.createElement(
      _Slide2.default,
      {
        full: true,
        video: 'http://skill-branch.ru/video-background.webm',
        overlay: true
      },
      _react2.default.createElement(
        _reactBootstrap.Grid,
        null,
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { md: 4, mdOffset: 4 },
            _react2.default.createElement(
              _reactstrap.Card,
              null,
              _react2.default.createElement(
                _reactstrap.CardBlock,
                null,
                _react2.default.createElement(
                  _reactstrap.CardTitle,
                  null,
                  '\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C'
                ),
                '\u042D\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u0440, \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C lego-starter-kit'
              ),
              _react2.default.createElement(
                _reactstrap.CardFooter,
                { className: 'text-xs-center' },
                _react2.default.createElement(
                  _A2.default,
                  { href: 'https://github.com/isuvorov/lego-starter-kit' },
                  '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435'
                )
              )
            )
          )
        )
      )
    )
  );
  
  var HomePage = (_dec = (0, _importcss2.default)(__webpack_require__(132)), _dec(_class = function (_Component) {
    (0, _inherits3.default)(HomePage, _Component);
  
    function HomePage() {
      (0, _classCallCheck3.default)(this, HomePage);
      return (0, _possibleConstructorReturn3.default)(this, (HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(HomePage, [{
      key: 'render',
      value: function render() {
        return _ref;
      }
    }]);
    return HomePage;
  }(_Component3.default)) || _class);
  exports.default = HomePage;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Component = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Component, _React$Component);
  
    function Component() {
      (0, _classCallCheck3.default)(this, Component);
      return (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Component, [{
      key: 'setStateAsync',
      value: function setStateAsync(state) {
        var _this2 = this;
  
        return new _promise2.default(function (resolve) {
          return _this2.setState(state, resolve);
        });
      }
    }, {
      key: 'getStatePath',
      value: function getStatePath(path) {
        return _lodash2.default.get(this.state, path);
      }
    }, {
      key: 'setStatePath',
      value: function setStatePath(path, value) {
        var state = _lodash2.default.cloneDeep(this.state);
        _lodash2.default.set(state, path, value);
        return this.setStateAsync(state);
      }
    }, {
      key: 'redirect',
      value: function redirect() {
        var _context$history;
  
        (_context$history = this.context.history).push.apply(_context$history, arguments);
      }
    }]);
    return Component;
  }(_react2.default.Component), _class.contextTypes = {
    history: _react.PropTypes.object.isRequired
  }, _temp);
  exports.default = Component;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _defineProperty2 = __webpack_require__(129);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class, _class2, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _classnames = __webpack_require__(117);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Link = __webpack_require__(120);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var A = (_dec = (0, _importcss2.default)(__webpack_require__(130)), _dec(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(A, _Component);
  
    function A() {
      (0, _classCallCheck3.default)(this, A);
      return (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(A, [{
      key: 'render',
      value: function render() {
        var _cx;
  
        var _props = this.props,
            bsStyle = _props.bsStyle,
            className = _props.className,
            href = _props.href,
            to = _props.to;
  
        return _react2.default.createElement(_Link2.default, (0, _extends3.default)({}, this.props, {
          styleName: (0, _classnames2.default)((_cx = {}, (0, _defineProperty3.default)(_cx, className, className), (0, _defineProperty3.default)(_cx, 'A', true), (0, _defineProperty3.default)(_cx, 'A_style_' + bsStyle, bsStyle), _cx)),
          href: href || to
        }));
      }
    }]);
    return A;
  }(_react.Component), _class2.defaultProps = {
    bsStyle: 'primary',
    className: null,
    href: null,
    to: null
  }, _temp)) || _class);
  exports.default = A;

/***/ },
/* 129 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(131);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./A.css", function() {
          content = require("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./A.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, "._12qk{text-decoration:underline;cursor:pointer}.qO6m{color:#108ee9}.qO6m:hover{color:#49a9ee}._4AXj{color:#d9d9d9}._4AXj:hover{color:#656565}", ""]);
  
  // exports
  exports.locals = {
  	"A": "_12qk",
  	"A_style_primary": "qO6m",
  	"A_style_secondary": "_4AXj"
  };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(133);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../node_modules/postcss-loader/index.js?pack=default!./HomePage.css", function() {
          content = require("!!./../../../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../node_modules/postcss-loader/index.js?pack=default!./HomePage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, "", ""]);
  
  // exports


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _getData = __webpack_require__(135);
  
  var _getData2 = _interopRequireDefault(_getData);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _reactBootstrapTable = __webpack_require__(136);
  
  var _AdminLayout = __webpack_require__(137);
  
  var _AdminLayout2 = _interopRequireDefault(_AdminLayout);
  
  var _reactstrap = __webpack_require__(110);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = _react2.default.createElement(
    'h1',
    null,
    '\u0418\u0433\u0440\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439'
  );
  
  var _ref3 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { isKey: true, dataField: 'id' },
    'ID'
  );
  
  var _ref4 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'fullname' },
    '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C'
  );
  
  var _ref5 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'category' },
    '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F'
  );
  
  var _ref6 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'result' },
    'result'
  );
  
  var _ref7 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'correct' },
    'correct'
  );
  
  var _ref8 = _react2.default.createElement(
    _reactBootstrap.Row,
    null,
    _react2.default.createElement(
      _reactBootstrap.Col,
      { md: 4 },
      _react2.default.createElement(
        _reactstrap.Card,
        null,
        _react2.default.createElement(_reactstrap.CardImg, { top: true, width: '100%', src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180', alt: 'Card image cap' }),
        _react2.default.createElement(
          _reactstrap.CardBlock,
          null,
          _react2.default.createElement(
            _reactstrap.CardTitle,
            null,
            'Card title'
          ),
          _react2.default.createElement(
            _reactstrap.CardSubtitle,
            null,
            'Card subtitle'
          ),
          _react2.default.createElement(
            _reactstrap.CardText,
            null,
            'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            null,
            'Button2'
          )
        )
      )
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { md: 4 },
      _react2.default.createElement(
        _reactstrap.Card,
        null,
        _react2.default.createElement(_reactstrap.CardImg, { top: true, width: '100%', src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180', alt: 'Card image cap' }),
        _react2.default.createElement(
          _reactstrap.CardBlock,
          null,
          _react2.default.createElement(
            _reactstrap.CardTitle,
            null,
            'Card title'
          ),
          _react2.default.createElement(
            _reactstrap.CardSubtitle,
            null,
            'Card subtitle'
          ),
          _react2.default.createElement(
            _reactstrap.CardText,
            null,
            'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            null,
            'Button2'
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            null,
            'Button'
          )
        )
      )
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { md: 4 },
      _react2.default.createElement(
        _reactstrap.Card,
        null,
        _react2.default.createElement(_reactstrap.CardImg, { top: true, width: '100%', src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180', alt: 'Card image cap' }),
        _react2.default.createElement(
          _reactstrap.CardBlock,
          null,
          _react2.default.createElement(
            _reactstrap.CardTitle,
            null,
            'Card title'
          ),
          _react2.default.createElement(
            _reactstrap.CardSubtitle,
            null,
            'Card subtitle'
          ),
          _react2.default.createElement(
            _reactstrap.CardText,
            null,
            'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            null,
            'Button'
          )
        )
      )
    )
  );
  
  var _ref9 = _react2.default.createElement(
    'h1',
    null,
    '\u0418\u0433\u0440\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439'
  );
  
  var _ref10 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { isKey: true, dataField: 'id' },
    'ID'
  );
  
  var _ref11 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'fullname' },
    '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C'
  );
  
  var _ref12 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'category' },
    '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F'
  );
  
  var _ref13 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'result' },
    'result'
  );
  
  var _ref14 = _react2.default.createElement(
    _reactBootstrapTable.TableHeaderColumn,
    { dataField: 'correct' },
    'correct'
  );
  
  exports.default = {
    action: function action(_ref) {
      var _this = this;
  
      var app = _ref.app,
          ctx = _ref.ctx,
          next = _ref.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var data, categories, games, children;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _getData2.default)(ctx, app);
  
              case 2:
                data = _context.sent;
                categories = _lodash2.default.keyBy(data.categories, 'categoryId');
  
                console.log('data', data);
                games = data.games.map(function (game) {
                  var fullname = ['lastname', 'firstname', 'middlename'].map(function (k) {
                    return game.cert && game.cert[k];
                  }).filter(function (k) {
                    return k;
                  }).join(' ');
                  return {
                    id: game._id,
                    fullname: fullname,
                    category: categories[game.categoryId] && categories[game.categoryId].title,
                    result: game.result && Math.round(game.result.score * 100) + '%',
                    correct: game.result && game.result.correct + '/' + game.result.count
                  };
                });
                children = _react2.default.createElement(
                  _AdminLayout2.default,
                  null,
                  _ref2,
                  _react2.default.createElement(
                    _reactBootstrapTable.BootstrapTable,
                    { data: games, striped: true, hover: true },
                    _ref3,
                    _ref4,
                    _ref5,
                    _ref6,
                    _ref7
                  )
                );
  
                // const res = {
                //   _type: 'response',
                //   layout: AdminLayout,
                //   children,
                //   component: children,
                // }
  
                return _context.abrupt('return', {
                  component: _react2.default.createElement(
                    _AdminLayout2.default,
                    null,
                    _ref8,
                    _ref9,
                    _react2.default.createElement(
                      _reactBootstrapTable.BootstrapTable,
                      { data: games, striped: true, hover: true },
                      _ref10,
                      _ref11,
                      _ref12,
                      _ref13,
                      _ref14
                    )
                  )
                });
  
              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, app) {
      var _app$models, Category, Game, categories, games, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!ctx.rootState) ctx.rootState = {};
  
              _app$models = app.models, Category = _app$models.Category, Game = _app$models.Game;
              _context.next = 4;
              return Category.find();
  
            case 4:
              categories = _context.sent;
              _context.next = 7;
              return Game.find();
  
            case 7:
              games = _context.sent;
              data = {
                games: games,
                categories: categories
              };
  
  
              ctx.rootState.pageData = data;
              return _context.abrupt("return", ctx.rootState.pageData);
  
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 136 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap-table");

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _dashboard = __webpack_require__(138);
  
  var _dashboard2 = _interopRequireDefault(_dashboard);
  
  var _LayoutWrapper = __webpack_require__(139);
  
  var _LayoutWrapper2 = _interopRequireDefault(_LayoutWrapper);
  
  var _PageWrapper = __webpack_require__(140);
  
  var _PageWrapper2 = _interopRequireDefault(_PageWrapper);
  
  var _PageHeader = __webpack_require__(141);
  
  var _PageHeader2 = _interopRequireDefault(_PageHeader);
  
  var _Breadcrumb = __webpack_require__(142);
  
  var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
  
  var _PageContent = __webpack_require__(144);
  
  var _PageContent2 = _interopRequireDefault(_PageContent);
  
  var _HeaderWrapper = __webpack_require__(145);
  
  var _HeaderWrapper2 = _interopRequireDefault(_HeaderWrapper);
  
  var _Logo = __webpack_require__(146);
  
  var _Logo2 = _interopRequireDefault(_Logo);
  
  var _MiniLogo = __webpack_require__(147);
  
  var _MiniLogo2 = _interopRequireDefault(_MiniLogo);
  
  var _LargeLogo = __webpack_require__(148);
  
  var _LargeLogo2 = _interopRequireDefault(_LargeLogo);
  
  var _Navbar = __webpack_require__(149);
  
  var _Navbar2 = _interopRequireDefault(_Navbar);
  
  var _UserMenu = __webpack_require__(152);
  
  var _UserMenu2 = _interopRequireDefault(_UserMenu);
  
  var _SidebarWrapper = __webpack_require__(157);
  
  var _SidebarWrapper2 = _interopRequireDefault(_SidebarWrapper);
  
  var _UserPanel = __webpack_require__(158);
  
  var _UserPanel2 = _interopRequireDefault(_UserPanel);
  
  var _FooterWrapper = __webpack_require__(160);
  
  var _FooterWrapper2 = _interopRequireDefault(_FooterWrapper);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import 'lsk-admin/Admin/sass/AdminLTE.g.scss';
  
  var _ref = _react2.default.createElement(
    _Logo2.default,
    null,
    _react2.default.createElement(
      _MiniLogo2.default,
      null,
      _react2.default.createElement(
        'b',
        null,
        'S'
      ),
      'b'
    ),
    _react2.default.createElement(
      _LargeLogo2.default,
      null,
      _react2.default.createElement(
        'b',
        null,
        'Skill'
      ),
      'Branch'
    )
  );
  
  var _ref2 = _react2.default.createElement(
    _SidebarWrapper2.default,
    null,
    _react2.default.createElement(_UserPanel2.default, {
      image: 'https://remont3.ru/templates/umedia/dleimages/noavatar.png',
      name: 'John Doe'
    })
  );
  
  var _ref3 = _react2.default.createElement(_dashboard2.default, null);
  
  var _ref4 = _react2.default.createElement(
    _FooterWrapper2.default,
    null,
    _react2.default.createElement(
      'div',
      { className: 'pull-right hidden-xs' },
      _react2.default.createElement(
        'b',
        null,
        'Version'
      ),
      ' 0.0.1'
    ),
    _react2.default.createElement(
      'strong',
      null,
      _react2.default.createElement(
        'span',
        null,
        'Copyright \xA9 2016-2017 '
      ),
      _react2.default.createElement(
        'a',
        { href: 'http://github.com/isuvorov/lego-starter-kit' },
        'Lego-starter-kit'
      ),
      '.'
    ),
    ' All rights reserved.'
  );
  
  var AdminLayout = function (_Component) {
    (0, _inherits3.default)(AdminLayout, _Component);
  
    function AdminLayout() {
      (0, _classCallCheck3.default)(this, AdminLayout);
      return (0, _possibleConstructorReturn3.default)(this, (AdminLayout.__proto__ || (0, _getPrototypeOf2.default)(AdminLayout)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(AdminLayout, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _LayoutWrapper2.default,
          { color: 'black' },
          _react2.default.createElement(
            _HeaderWrapper2.default,
            null,
            _ref,
            _react2.default.createElement(
              _Navbar2.default,
              { controlbar: false },
              _react2.default.createElement(_UserMenu2.default
              // onLinkClick={action('onLinkClick')}
              // onButtonClick={action('onButtonClick')}
              , { image: 'https://remont3.ru/templates/umedia/dleimages/noavatar.png',
                name: 'John Doe',
                title: 'Mr. John Doe',
                description: 'Javascript Full Stack Software Engineer',
                links: [{ key: 1, text: 'Link 1' }, { key: 2, text: 'Link 2' }, { key: 3, text: 'Link 3' }],
                buttons: [{ key: 1, text: 'Profile', align: 'left' }, { key: 2, text: 'Logout' }]
              })
            )
          ),
          _ref2,
          _react2.default.createElement(
            _PageWrapper2.default,
            null,
            _react2.default.createElement(
              _PageHeader2.default,
              {
                title: 'Simple page',
                description: 'description about the simple page'
              },
              _react2.default.createElement(_Breadcrumb2.default, {
                items: [{ key: 1, icon: _ref3, title: 'Home', url: '/' }, { key: 2, title: 'Pages' }, { key: 3, title: 'Simple' }]
              })
            ),
            _react2.default.createElement(
              _PageContent2.default,
              null,
              this.props.children
            )
          ),
          _ref4
        );
      }
    }]);
    return AdminLayout;
  }(_react.Component);
  
  exports.default = AdminLayout;

/***/ },
/* 138 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/dashboard");

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(117);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    color: _react.PropTypes.string,
    fixed: _react.PropTypes.bool,
    children: _react.PropTypes.node
  };
  
  var defaultProps = {
    color: 'black',
    fixed: false
  };
  
  var _ref = _react2.default.createElement('div', { className: 'control-sidebar-bg' });
  
  var LayoutWrapper = function (_Component) {
    (0, _inherits3.default)(LayoutWrapper, _Component);
  
    function LayoutWrapper() {
      (0, _classCallCheck3.default)(this, LayoutWrapper);
      return (0, _possibleConstructorReturn3.default)(this, (LayoutWrapper.__proto__ || (0, _getPrototypeOf2.default)(LayoutWrapper)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(LayoutWrapper, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'wrapper' },
          this.props.children,
          _ref
        );
      }
    }]);
    return LayoutWrapper;
  }(_react.Component);
  
  LayoutWrapper.defaultProps = defaultProps;
  
  exports.default = LayoutWrapper;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  var PageWrapper = function (_Component) {
    (0, _inherits3.default)(PageWrapper, _Component);
  
    function PageWrapper() {
      (0, _classCallCheck3.default)(this, PageWrapper);
      return (0, _possibleConstructorReturn3.default)(this, (PageWrapper.__proto__ || (0, _getPrototypeOf2.default)(PageWrapper)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(PageWrapper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (window.$ && window.$.AdminLTE) {
          // window.$.AdminLTE.layout.fix();
          /* eslint-disable */
          window.$('.layout-boxed > .wrapper').css('overflow', 'hidden');
          var a = window.$('.main-footer').outerHeight() || 0,
              b = window.$('.main-header').outerHeight() + a,
              c = window.$(window).height(),
              d = window.$('.sidebar').height() || 0;
  
          if (window.$('body').hasClass('fixed')) {
            window.$('.content-wrapper, .right-side').css('min-height', c - a);
          } else {
            var e = void 0;
            c >= d ? (window.$('.content-wrapper, .right-side').css('min-height', c - b), e = c - b) : (window.$('.content-wrapper, .right-side').css('min-height', d), e = d);
  
            var f = window.$(window.$.AdminLTE.options.controlSidebarOptions.selector);
            typeof f !== 'undefined' && f.height() > e && window.$('.content-wrapper, .right-side').css('min-height', f.height());
          }
          /* eslint-enable */
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'content-wrapper' },
          this.props.children
        );
      }
    }]);
    return PageWrapper;
  }(_react.Component);
  
  exports.default = PageWrapper;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    children: _react.PropTypes.node
  };
  
  function PageHeader(_ref) {
    var title = _ref.title,
        description = _ref.description,
        children = _ref.children;
  
    return _react2.default.createElement(
      'section',
      { className: 'content-header' },
      _react2.default.createElement(
        'h1',
        null,
        title,
        ' ',
        _react2.default.createElement(
          'small',
          null,
          description
        )
      ),
      children
    );
  }
  
  exports.default = PageHeader;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BreadcrumbItem = __webpack_require__(143);
  
  var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    items: _react.PropTypes.array
  };
  
  var Breadcrumb = function (_Component) {
    (0, _inherits3.default)(Breadcrumb, _Component);
  
    function Breadcrumb(props) {
      (0, _classCallCheck3.default)(this, Breadcrumb);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Breadcrumb.__proto__ || (0, _getPrototypeOf2.default)(Breadcrumb)).call(this, props));
  
      _this.renderItems = _this.renderItems.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(Breadcrumb, [{
      key: 'renderItems',
      value: function renderItems() {
        return this.props.items.map(function (item) {
          return _react2.default.createElement(_BreadcrumbItem2.default, item);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'ol',
          { className: 'breadcrumb' },
          this.renderItems()
        );
      }
    }]);
    return Breadcrumb;
  }(_react.Component);
  
  exports.default = Breadcrumb;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(117);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    title: _react.PropTypes.string,
    url: _react.PropTypes.string
  };
  
  function renderIcon(icon) {
    if (typeof icon === 'string') {
      return _react2.default.createElement('i', { className: icon });
    }
    return icon;
  }
  
  function BreadcrumbItem(_ref) {
    var icon = _ref.icon,
        title = _ref.title,
        url = _ref.url;
  
    return _react2.default.createElement(
      'li',
      { className: (0, _classnames2.default)({ active: !url }) },
      url ? _react2.default.createElement(
        'a',
        { href: url },
        icon ? renderIcon(icon) : '',
        ' ',
        title
      ) : title
    );
  }
  
  exports.default = BreadcrumbItem;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function PageContent(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "section",
      { className: "content" },
      children
    );
  }
  
  exports.default = PageContent;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function HeaderWrapper(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "header",
      { className: "main-header" },
      children
    );
  }
  
  exports.default = HeaderWrapper;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node,
    onClick: _react.PropTypes.func
  };
  
  function Logo(_ref) {
    var children = _ref.children,
        onClick = _ref.onClick;
  
    return _react2.default.createElement(
      'a',
      { className: 'logo', style: { cursor: 'pointer' }, onClick: onClick },
      children
    );
  }
  
  exports.default = Logo;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node,
    onClick: _react.PropTypes.func
  };
  
  function MiniLogo(_ref) {
    var children = _ref.children,
        onClick = _ref.onClick;
  
    return _react2.default.createElement(
      "span",
      { className: "logo-mini", onClick: onClick },
      children
    );
  }
  
  exports.default = MiniLogo;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node,
    onClick: _react.PropTypes.func
  };
  
  function LargeLogo(_ref) {
    var children = _ref.children,
        onClick = _ref.onClick;
  
    return _react2.default.createElement(
      "span",
      { className: "logo-lg", onClick: onClick },
      children
    );
  }
  
  exports.default = LargeLogo;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _bars = __webpack_require__(150);
  
  var _bars2 = _interopRequireDefault(_bars);
  
  var _sliders = __webpack_require__(151);
  
  var _sliders2 = _interopRequireDefault(_sliders);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    controlbarIcon: _react.PropTypes.node,
    children: _react.PropTypes.node
  };
  
  var defaultProps = {
    controlbarIcon: _react2.default.createElement(_sliders2.default, null),
    controlbar: true
  };
  
  function renderIcon(icon) {
    if (typeof icon === 'string') {
      return _react2.default.createElement('i', { className: icon });
    }
    return icon;
  }
  
  var _ref2 = _react2.default.createElement(
    'span',
    { className: 'sr-only' },
    'Toggle navigation'
  );
  
  var _ref3 = _react2.default.createElement(_bars2.default, null);
  
  function Navbar(_ref) {
    var controlbarIcon = _ref.controlbarIcon,
        children = _ref.children,
        controlbar = _ref.controlbar;
  
    return _react2.default.createElement(
      'nav',
      { className: 'navbar navbar-static-top', role: 'navigation' },
      _react2.default.createElement(
        'a',
        {
          className: 'sidebar-toggle',
          'data-toggle': 'offcanvas',
          role: 'button',
          style: { cursor: 'pointer' }
        },
        _ref2,
        _ref3
      ),
      _react2.default.createElement(
        'div',
        { className: 'navbar-custom-menu' },
        _react2.default.createElement(
          'ul',
          { className: 'nav navbar-nav' },
          children,
          controlbar ? _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { 'data-toggle': 'control-sidebar', style: { cursor: 'pointer' } },
              renderIcon(controlbarIcon)
            )
          ) : null
        )
      )
    );
  }
  
  Navbar.defaultProps = defaultProps;
  
  exports.default = Navbar;

/***/ },
/* 150 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/bars");

/***/ },
/* 151 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/sliders");

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UserMenuBody = __webpack_require__(153);
  
  var _UserMenuBody2 = _interopRequireDefault(_UserMenuBody);
  
  var _UserMenuLink = __webpack_require__(154);
  
  var _UserMenuLink2 = _interopRequireDefault(_UserMenuLink);
  
  var _UserMenuFooter = __webpack_require__(155);
  
  var _UserMenuFooter2 = _interopRequireDefault(_UserMenuFooter);
  
  var _UserMenuButton = __webpack_require__(156);
  
  var _UserMenuButton2 = _interopRequireDefault(_UserMenuButton);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    image: _react.PropTypes.string,
    name: _react.PropTypes.string,
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    links: _react.PropTypes.array,
    buttons: _react.PropTypes.array,
    onLinkClick: _react.PropTypes.func,
    onButtonClick: _react.PropTypes.func
  };
  
  var defaultProps = {
    image: '/images/no-avatar.png',
    name: 'Full Name',
    title: 'Title',
    description: 'Description',
    links: [],
    buttons: []
  };
  
  function UserMenu(_ref) {
    var image = _ref.image,
        name = _ref.name,
        title = _ref.title,
        description = _ref.description,
        links = _ref.links,
        buttons = _ref.buttons,
        onLinkClick = _ref.onLinkClick,
        onButtonClick = _ref.onButtonClick;
  
    return _react2.default.createElement(
      'li',
      { className: 'dropdown user user-menu' },
      _react2.default.createElement(
        'a',
        {
          className: 'dropdown-toggle',
          'data-toggle': 'dropdown',
          style: { cursor: 'pointer' }
        },
        _react2.default.createElement('img', { src: image, className: 'user-image', alt: 'User' }),
        _react2.default.createElement(
          'span',
          { className: 'hidden-xs' },
          name
        )
      ),
      _react2.default.createElement(
        'ul',
        { className: 'dropdown-menu' },
        _react2.default.createElement(
          'li',
          { className: 'user-header' },
          _react2.default.createElement('img', { src: image, className: 'img-circle', alt: 'User' }),
          _react2.default.createElement(
            'p',
            null,
            title,
            _react2.default.createElement(
              'small',
              null,
              description
            )
          )
        ),
        _react2.default.createElement(
          _UserMenuBody2.default,
          null,
          links.map(function (link) {
            return _react2.default.createElement(_UserMenuLink2.default, (0, _extends3.default)({}, link, {
              onClick: function onClick() {
                return onLinkClick(link);
              }
            }));
          })
        ),
        _react2.default.createElement(
          _UserMenuFooter2.default,
          null,
          buttons.map(function (button) {
            return _react2.default.createElement(_UserMenuButton2.default, (0, _extends3.default)({}, button, {
              onClick: function onClick() {
                return onButtonClick(button);
              }
            }));
          })
        )
      )
    );
  }
  
  UserMenu.defaultProps = defaultProps;
  
  exports.default = UserMenu;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function UserMenuBody(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "li",
      { className: "user-body" },
      _react2.default.createElement(
        "div",
        { className: "row" },
        children
      )
    );
  }
  
  exports.default = UserMenuBody;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    text: _react.PropTypes.string,
    onClick: _react.PropTypes.func
  };
  
  function UserMenuLink(_ref) {
    var text = _ref.text,
        onClick = _ref.onClick;
  
    return _react2.default.createElement(
      'div',
      { className: 'col-xs-4 text-center' },
      _react2.default.createElement(
        'a',
        { style: { cursor: 'pointer' }, onClick: onClick },
        text
      )
    );
  }
  
  exports.default = UserMenuLink;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function UserMenuFooter(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "li",
      { className: "user-footer" },
      children
    );
  }
  
  exports.default = UserMenuFooter;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    text: _react.PropTypes.string,
    align: _react.PropTypes.string,
    onClick: _react.PropTypes.func
  };
  
  var defaultProps = {
    text: 'Button',
    align: 'right'
  };
  
  function UserMenuButton(_ref) {
    var text = _ref.text,
        align = _ref.align,
        onClick = _ref.onClick;
  
    return _react2.default.createElement(
      'div',
      { className: 'pull-' + align },
      _react2.default.createElement(
        'a',
        {
          className: 'btn btn-default btn-flat',
          onClick: onClick
        },
        text
      )
    );
  }
  
  UserMenuButton.defaultProps = defaultProps;
  
  exports.default = UserMenuButton;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function SidebarWrapper(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "aside",
      { className: "main-sidebar" },
      _react2.default.createElement(
        "section",
        { className: "sidebar" },
        children
      )
    );
  }
  
  exports.default = SidebarWrapper;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _circle = __webpack_require__(159);
  
  var _circle2 = _interopRequireDefault(_circle);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    image: _react.PropTypes.string,
    name: _react.PropTypes.string,
    statusIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    statusText: _react.PropTypes.string
  };
  
  var defaultProps = {
    image: '/images/no-avatar.png',
    name: 'Full Name',
    statusIcon: _react2.default.createElement(
      'i',
      { className: 'text-success' },
      _react2.default.createElement(_circle2.default, null)
    ),
    statusText: 'Online'
  };
  
  function renderIcon(icon) {
    if (typeof icon === 'string') {
      return _react2.default.createElement('i', { className: icon });
    }
    return icon;
  }
  
  function UserPanel(_ref) {
    var image = _ref.image,
        name = _ref.name,
        statusIcon = _ref.statusIcon,
        statusText = _ref.statusText;
  
    return _react2.default.createElement(
      'div',
      { className: 'user-panel' },
      _react2.default.createElement(
        'div',
        { className: 'pull-left image' },
        _react2.default.createElement('img', { src: image, className: 'img-circle', alt: 'User' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'pull-left info' },
        _react2.default.createElement(
          'p',
          null,
          name
        ),
        _react2.default.createElement(
          'a',
          null,
          renderIcon(statusIcon),
          ' ',
          statusText
        )
      )
    );
  }
  
  UserPanel.defaultProps = defaultProps;
  
  exports.default = UserPanel;

/***/ },
/* 159 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/circle");

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var propTypes = {
    children: _react.PropTypes.node
  };
  
  function FooterWrapper(_ref) {
    var children = _ref.children;
  
    return _react2.default.createElement(
      "footer",
      { className: "main-footer" },
      children
    );
  }
  
  exports.default = FooterWrapper;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _AuthPage = __webpack_require__(162);
  
  var _AuthPage2 = _interopRequireDefault(_AuthPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = _react2.default.createElement(_AuthPage2.default, { type: 'login' });
  
  var _ref3 = _react2.default.createElement(_AuthPage2.default, { type: 'recovery' });
  
  var _ref4 = _react2.default.createElement(_AuthPage2.default, { type: 'signup' });
  
  var _ref6 = _react2.default.createElement(
    'div',
    null,
    'Loading'
  );
  
  exports.default = {
    children: [{
      path: '/(login|)',
      action: function action(_ref) {
        var appStore = _ref.appStore;
  
        console.log('appStore', appStore.auth);
        return {
          title: 'Cabinet',
          component: _ref2
        };
      }
    }, {
      path: '/recovery',
      action: function action() {
        return {
          title: 'recovery',
          component: _ref3
        };
      }
    }, {
      path: '/signup',
      action: function action() {
        return {
          title: 'signup',
          component: _ref4
        };
      }
    }, {
      path: '/logout',
      action: function action(_ref5) {
        var appStore = _ref5.appStore;
  
        if (true) return {
          component: _ref6
        };
        appStore.auth.logout();
        //  console.log('appStore', appStore);
        return { redirect: '/' };
        //  return {
        //    title: 'signup',
        //    component: <AuthPage type="signup" />,
        //  };
      }
    }]
  };

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getOwnPropertyDescriptor = __webpack_require__(163);
  
  var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _dec2, _class, _desc, _value, _class2;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _coreDecorators = __webpack_require__(164);
  
  var _mobxReact = __webpack_require__(122);
  
  var _sample = __webpack_require__(165);
  
  var _sample2 = _interopRequireDefault(_sample);
  
  var _reactstrap = __webpack_require__(110);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _envelope = __webpack_require__(166);
  
  var _envelope2 = _interopRequireDefault(_envelope);
  
  var _lock = __webpack_require__(167);
  
  var _lock2 = _interopRequireDefault(_lock);
  
  var _vk = __webpack_require__(168);
  
  var _vk2 = _interopRequireDefault(_vk);
  
  var _odnoklassniki = __webpack_require__(169);
  
  var _odnoklassniki2 = _interopRequireDefault(_odnoklassniki);
  
  var _facebook = __webpack_require__(170);
  
  var _facebook2 = _interopRequireDefault(_facebook);
  
  var _twitter = __webpack_require__(171);
  
  var _twitter2 = _interopRequireDefault(_twitter);
  
  var _twitch = __webpack_require__(172);
  
  var _twitch2 = _interopRequireDefault(_twitch);
  
  var _tumblr = __webpack_require__(173);
  
  var _tumblr2 = _interopRequireDefault(_tumblr);
  
  var _instagram = __webpack_require__(174);
  
  var _instagram2 = _interopRequireDefault(_instagram);
  
  var _refresh = __webpack_require__(112);
  
  var _refresh2 = _interopRequireDefault(_refresh);
  
  var _clear = __webpack_require__(113);
  
  var _clear2 = _interopRequireDefault(_clear);
  
  var _check = __webpack_require__(114);
  
  var _check2 = _interopRequireDefault(_check);
  
  var _Component2 = __webpack_require__(127);
  
  var _Component3 = _interopRequireDefault(_Component2);
  
  var _Slide = __webpack_require__(115);
  
  var _Slide2 = _interopRequireDefault(_Slide);
  
  var _Link = __webpack_require__(120);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _A = __webpack_require__(128);
  
  var _A2 = _interopRequireDefault(_A);
  
  var _Form = __webpack_require__(175);
  
  var _Form2 = _interopRequireDefault(_Form);
  
  var _Header = __webpack_require__(121);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
  
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
  
    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
  
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
  
    return desc;
  }
  
  var _ref2 = _react2.default.createElement(
    _A2.default,
    { href: '/auth/recovery' },
    '\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?'
  );
  
  var _ref3 = _react2.default.createElement(_Header2.default, null);
  
  var _ref4 = _react2.default.createElement(_refresh2.default, null);
  
  var _ref5 = _react2.default.createElement(_check2.default, null);
  
  var _ref6 = _react2.default.createElement(_clear2.default, null);
  
  var _ref7 = _react2.default.createElement(
    _reactstrap.CardText,
    null,
    '\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?'
  );
  
  var _ref8 = _react2.default.createElement(
    _reactBootstrap.Button,
    {
      componentClass: _Link2.default,
      href: '/auth',
      block: true
    },
    '\u0412\u043E\u0439\u0442\u0438'
  );
  
  var _ref9 = _react2.default.createElement(
    _reactstrap.CardText,
    null,
    '\u0412\u044B \u0435\u0448\u0435 \u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B?'
  );
  
  var _ref10 = _react2.default.createElement(
    _reactBootstrap.Button,
    {
      componentClass: _Link2.default,
      href: '/auth/signup',
      block: true
    },
    '\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442'
  );
  
  var AuthPage = (_dec = (0, _mobxReact.inject)('app'), _dec2 = (0, _importcss2.default)(__webpack_require__(179)), _dec(_class = _dec2(_class = (_class2 = function (_Component) {
    (0, _inherits3.default)(AuthPage, _Component);
  
    function AuthPage() {
      (0, _classCallCheck3.default)(this, AuthPage);
      return (0, _possibleConstructorReturn3.default)(this, (AuthPage.__proto__ || (0, _getPrototypeOf2.default)(AuthPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(AuthPage, [{
      key: 'handleSubmit',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
          var auth, res, _res, _res2;
  
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  auth = this.props.app.auth;
                  // try {
  
                  if (!(this.props.type === 'login')) {
                    _context.next = 6;
                    break;
                  }
  
                  _context.next = 4;
                  return auth.login(data);
  
                case 4:
                  res = _context.sent;
  
                  this.redirect('/');
  
                case 6:
                  if (!(this.props.type === 'signup')) {
                    _context.next = 11;
                    break;
                  }
  
                  _context.next = 9;
                  return auth.signup(data);
  
                case 9:
                  _res = _context.sent;
  
                  this.redirect('/');
  
                case 11:
                  if (!(this.props.type === 'recovery')) {
                    _context.next = 16;
                    break;
                  }
  
                  _context.next = 14;
                  return auth.recovery(data);
  
                case 14:
                  _res2 = _context.sent;
  
                  global.toast({
                    type: 'success',
                    title: 'Письмо с восстановлением пароля отправлено на почту.'
                  });
  
                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function handleSubmit(_x) {
          return _ref.apply(this, arguments);
        }
  
        return handleSubmit;
      }()
    }, {
      key: 'render',
      value: function render() {
        var type = this.props.type;
  
        if (!type) type = 'login';
        var status = null;
        var fields = [{
          name: 'login',
          title: 'Email',
          control: {
            placeholder: 'Например, utkin@mail.ru'
          }
        }, {
          name: 'password',
          title: 'Пароль',
          control: {
            type: 'password'
          }
        }, {
          name: 'name',
          title: 'Имя',
          control: {
            placeholder: 'Например, Василий'
          }
        }];
        if (type === 'login') {
          fields = fields.slice(0, 2);
          fields[1].help = _react2.default.createElement(
            'div',
            { style: { textAlign: 'right' } },
            _ref2
          );
        }
        if (type === 'recovery') {
          fields = fields.slice(0, 1);
        }
  
        return _react2.default.createElement(
          'div',
          null,
          _ref3,
          _react2.default.createElement(
            _Slide2.default,
            {
              full: true,
              video: 'http://skill-branch.ru/video-background.webm',
              overlay: true
              // overlay='rgba()'
            },
            _react2.default.createElement(
              _reactBootstrap.Grid,
              null,
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { md: 4, mdOffset: 4 },
                  _react2.default.createElement(
                    _reactstrap.Card,
                    null,
                    _react2.default.createElement(
                      _reactstrap.CardBlock,
                      null,
                      _react2.default.createElement(
                        _reactstrap.CardTitle,
                        null,
                        type === 'login' ? '\u0412\u0445\u043E\u0434' : null,
                        type === 'signup' ? '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F' : null,
                        type === 'recovery' ? '\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C' : null
                      ),
                      _react2.default.createElement(_Form2.default, {
                        fields: fields,
                        validators: {
                          login: {
                            presence: {
                              message: 'Поле не должно быть пустым.'
                            },
                            email: {
                              message: 'Введите корректный адрес почты.'
                            }
                          },
                          password: {
                            presence: {
                              message: 'Поле не должно быть пустым'
                            },
                            length: {
                              minimum: 6,
                              message: 'Пароль должен быть больше 6 символов.'
                            }
                          },
                          name: {
                            presence: {
                              message: 'Поле не должно быть пустым'
                            }
                          }
                        },
                        onSubmit: this.handleSubmit
                        // onError={this.handleSubmit}
                        , submitButton: _react2.default.createElement(
                          _reactBootstrap.Button,
                          {
                            type: 'submit',
                            bsStyle: 'primary',
                            disabled: !!status,
                            style: {
                              position: 'relative'
                            }
                          },
                          _react2.default.createElement(
                            'span',
                            { style: { visibility: !status ? 'visible' : 'hidden' } },
                            type === 'login' ? '\u0412\u043E\u0439\u0442\u0438' : null,
                            type === 'signup' ? '\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442' : null,
                            type === 'recovery' ? '\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C' : null
                          ),
                          status ? _react2.default.createElement(
                            'div',
                            { styleName: 'button-icon-status' },
                            status === 'wait' ? _ref4 : null,
                            status === 'ok' ? _ref5 : null,
                            status === 'error' ? _ref6 : null
                          ) : null
                        )
                      })
                    )
                  ),
                  type === 'signup' ? _react2.default.createElement(
                    _reactstrap.Card,
                    null,
                    _react2.default.createElement(
                      _reactstrap.CardBlock,
                      { className: 'text-xs-center', style: { textAlign: 'center' } },
                      _ref7,
                      _ref8
                    )
                  ) : null,
                  type !== 'signup' ? _react2.default.createElement(
                    _reactstrap.Card,
                    null,
                    _react2.default.createElement(
                      _reactstrap.CardBlock,
                      { className: 'text-xs-center', style: { textAlign: 'center' } },
                      _ref9,
                      _ref10
                    )
                  ) : null
                )
              )
            )
          )
        );
      }
    }]);
    return AuthPage;
  }(_Component3.default), (_applyDecoratedDescriptor(_class2.prototype, 'handleSubmit', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleSubmit'), _class2.prototype)), _class2)) || _class) || _class);
  exports.default = AuthPage;

/***/ },
/* 163 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-own-property-descriptor");

/***/ },
/* 164 */
/***/ function(module, exports) {

  module.exports = require("core-decorators");

/***/ },
/* 165 */
/***/ function(module, exports) {

  module.exports = require("lodash/sample");

/***/ },
/* 166 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/envelope");

/***/ },
/* 167 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/lock");

/***/ },
/* 168 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/vk");

/***/ },
/* 169 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/odnoklassniki");

/***/ },
/* 170 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/facebook");

/***/ },
/* 171 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/twitter");

/***/ },
/* 172 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/twitch");

/***/ },
/* 173 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/tumblr");

/***/ },
/* 174 */
/***/ function(module, exports) {

  module.exports = require("react-icons/lib/fa/instagram");

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getOwnPropertyDescriptor = __webpack_require__(163);
  
  var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
  
  var _defineProperty2 = __webpack_require__(129);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _slicedToArray2 = __webpack_require__(51);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _extends2 = __webpack_require__(22);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class, _desc, _value, _class2, _class3, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _coreDecorators = __webpack_require__(164);
  
  var _importcss = __webpack_require__(88);
  
  var _importcss2 = _interopRequireDefault(_importcss);
  
  var _classnames = __webpack_require__(117);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _validate = __webpack_require__(176);
  
  var _validate2 = _interopRequireDefault(_validate);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _Component2 = __webpack_require__(127);
  
  var _Component3 = _interopRequireDefault(_Component2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
  
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
  
    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
  
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
  
    return desc;
  }
  
  var _ref3 = _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null);
  
  // eslint-disable-line
  var Form = (_dec = (0, _importcss2.default)(__webpack_require__(177)), _dec(_class = (_class2 = (_temp = _class3 = function (_Component) {
    (0, _inherits3.default)(Form, _Component);
  
    function Form(props) {
      (0, _classCallCheck3.default)(this, Form);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));
  
      var data = props.data;
      if (!data) {
        data = {};
        _this.getFields(props.fields).forEach(function (field) {
          data[field.name] = field.value;
        });
      }
      _this.state = {
        data: data,
        errors: props.errors || {} };
      return _this;
    }
  
    (0, _createClass3.default)(Form, [{
      key: 'getFields',
      value: function getFields(fields) {
        if (!fields) fields = this.props.fields; // eslint-disable-line
        return fields.map(function (field) {
          if (typeof field === 'string') {
            return {
              name: field,
              title: field
            };
          }
          return (0, _extends3.default)({
            name: field.name || field.path
          }, field);
        });
      }
    }, {
      key: 'getFieldNames',
      value: function getFieldNames() {
        this.getFields();
      }
    }, {
      key: 'getError',
      value: function getError(name) {
        var errors = this.state.errors;
  
        return errors && errors[name] || {};
      }
    }, {
      key: 'getData',
      value: function getData() {
        return this.state.data;
      }
    }, {
      key: 'getValidatorResults',
      value: function getValidatorResults() {
        var validators = this.props.validators;
  
        return (0, _validate2.default)(this.state.data, validators);
      }
    }, {
      key: 'validate',
      value: function validate() {
        var results = this.getValidatorResults();
        var errors = {};
        for (var item in results) {
          var re = new RegExp('^' + item + ' (.+)$', 'i');
  
          var _re$exec = re.exec(results[item][0]),
              _re$exec2 = (0, _slicedToArray3.default)(_re$exec, 2),
              message = _re$exec2[1];
  
          errors[item] = {
            state: 'error',
            message: message
          };
        }
        if (_lodash2.default.size(errors) > 0) {
          this.onError(errors);
          return false;
        }
        return true;
      }
    }, {
      key: 'onError',
      value: function onError(errors) {
        var onError = this.props.onError;
  
        this.setState({ errors: errors });
        if (onError) onError(errors);
      }
    }, {
      key: 'onSubmit',
      value: function onSubmit(data) {
        var onSubmit = this.props.onSubmit;
  
        this.setState({ errors: {} });
        if (onSubmit) onSubmit(this.getData());
      }
    }, {
      key: 'handleSubmit',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();
                  if (this.validate()) {
                    this.onSubmit();
                  }
  
                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function handleSubmit(_x) {
          return _ref.apply(this, arguments);
        }
  
        return handleSubmit;
      }()
    }, {
      key: 'handleChangeField',
      value: function handleChangeField(path) {
        var _this2 = this;
  
        var onChange = this.props.onChange;
  
        return function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(e) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this2.setStatePath(path, e.target.value);
  
                  case 2:
                    if (onChange) {
                      onChange(_this2.getData());
                    }
  
                  case 3:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));
  
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }();
      }
    }, {
      key: 'renderFieldInner',
      value: function renderFieldInner(item) {
        var control = _react2.default.createElement(_reactBootstrap.FormControl, (0, _extends3.default)({
          type: 'text',
          value: this.getStatePath('data.' + item.name) || '',
          onChange: this.handleChangeField('data.' + item.name)
        }, item.control));
        return _react2.default.createElement(
          'div',
          null,
          item.icon ? _react2.default.createElement(
            _reactBootstrap.InputGroup,
            null,
            _react2.default.createElement(
              _reactBootstrap.InputGroup.Addon,
              null,
              item.icon
            ),
            control
          ) : null,
          !item.icon ? control : null,
          _ref3,
          item.help ? _react2.default.createElement(
            _reactBootstrap.HelpBlock,
            null,
            item.help
          ) : null,
          this.getError(item.name).state ? _react2.default.createElement(
            _reactBootstrap.HelpBlock,
            null,
            this.getError(item.name).message
          ) : null
        );
      }
    }, {
      key: 'renderField',
      value: function renderField(item, i) {
        var horizontal = this.props.horizontal;
  
        if (horizontal) {
          return _react2.default.createElement(
            _reactBootstrap.FormGroup,
            {
              key: i,
              controlId: item.name,
              validationState: this.getError(item.name).state
            },
            _react2.default.createElement(
              _reactBootstrap.Col,
              { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
              item.title
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { sm: 10 },
              this.renderFieldInner(item)
            )
          );
        }
        return _react2.default.createElement(
          _reactBootstrap.FormGroup,
          {
            key: i,
            controlId: item.name,
            validationState: this.getError(item.name).state
          },
          item.title ? _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            item.title
          ) : null,
          this.renderFieldInner(item)
        );
      }
    }, {
      key: 'renderFields',
      value: function renderFields(fields) {
        return fields.map(this.renderField);
      }
    }, {
      key: 'renderSubmitButton',
      value: function renderSubmitButton() {
        var _props = this.props,
            submitButton = _props.submitButton,
            align = _props.align,
            bsStyle = _props.bsStyle;
  
        var style = (0, _classnames2.default)((0, _defineProperty3.default)({}, 'align-' + align, align));
        if (typeof submitButton === 'string') {
          return _react2.default.createElement(
            'div',
            { styleName: style },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { type: 'submit', bsStyle: bsStyle },
              submitButton
            )
          );
        }
        return _react2.default.createElement(
          'div',
          { styleName: style },
          submitButton
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            form = _props2.form,
            horizontal = _props2.horizontal,
            fields = _props2.fields;
  
        if (form) {
          return _react2.default.createElement(
            'div',
            null,
            this.renderFields(this.getFields(fields)),
            this.renderSubmitButton()
          );
        }
        return _react2.default.createElement(
          _reactBootstrap.Form,
          { horizontal: horizontal, onSubmit: this.handleSubmit },
          this.renderFields(this.getFields(fields)),
          this.renderSubmitButton()
        );
      }
    }]);
    return Form;
  }(_Component3.default), _class3.defaultProps = {
    data: null,
    errors: null,
    fields: null,
    validators: null,
    onError: null,
    onSubmit: null,
    onChange: null,
    horizontal: false,
    submitButton: 'Отправить',
    form: false,
    align: 'center',
    bsStyle: 'primary'
  }, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'getData', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getData'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleSubmit', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleSubmit'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChangeField', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleChangeField'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'renderField', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'renderField'), _class2.prototype)), _class2)) || _class);
  exports.default = Form;

/***/ },
/* 176 */
/***/ function(module, exports) {

  module.exports = require("validate.js");

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(178);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./Form.css", function() {
          content = require("!!./../../../../css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../postcss-loader/index.js?pack=default!./Form.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, "._2plt{text-align:right}._2jXL{text-align:left}._2chB{text-align:center}", ""]);
  
  // exports
  exports.locals = {
  	"align-right": "_2plt",
  	"align-left": "_2jXL",
  	"align-center": "_2chB"
  };

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(180);
      var insertCss = __webpack_require__(95);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../node_modules/postcss-loader/index.js?pack=default!./AuthPage.css", function() {
          content = require("!!./../../../../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"modules\":true,\"localIdentName\":\"[hash:base64:4]\",\"minimize\":true}!./../../../../../node_modules/postcss-loader/index.js?pack=default!./AuthPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, ".input-group-addon svg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._2nPg{float:right;font-size:.85em;padding:5px 0}._7VSv{width:54px;height:25px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:1.3em;-webkit-animation-name:_5hry;-o-animation-name:_5hry;animation-name:_5hry;-webkit-animation-duration:.5s;-o-animation-duration:.5s;animation-duration:.5s}._7VSv,._7VSv svg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._7VSv.KfAq svg{-webkit-animation:KfAq .8s linear infinite;-o-animation:KfAq .8s linear infinite;animation:KfAq .8s linear infinite}._12UD,._12UD svg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._12UD{padding:11.2px 14.4px;padding:.7rem .9rem;font-size:19.2px;font-size:1.2rem}._12UD.b9vP{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD.b9vP:hover{background-color:#6441a4;border:none;color:#fff;z-index:inherit}._12UD.yguc{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD.yguc:hover{background-color:#41abe0;border:none;color:#fff;z-index:inherit}._12UD._1Z3Y{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD._1Z3Y:hover{background-color:#ee8208;border:none;color:#fff;z-index:inherit}._12UD._116D{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD._116D:hover{background-color:#507299;border:none;color:#fff;z-index:inherit}._12UD._30sC{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD._30sC:hover{background-color:#36465d;border:none;color:#fff;z-index:inherit}._12UD.QUjt{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD.QUjt:hover{background-color:#262626;border:none;color:#fff;z-index:inherit}._12UD._1_rW{background-color:transparent;border:none;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out;transition:.2s ease-in-out}._12UD._1_rW:hover{background-color:#4867aa;border:none;color:#fff;z-index:inherit}@-webkit-keyframes KfAq{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-o-keyframes KfAq{to{-o-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes KfAq{to{-webkit-transform:rotate(1turn);-o-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes _5hry{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@-o-keyframes _5hry{0%{transform:perspective(400px) rotateX(90deg);-o-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);-o-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes _5hry{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;-o-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;-o-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}", ""]);
  
  // exports
  exports.locals = {
  	"recovery-password": "_2nPg",
  	"button-icon-status": "_7VSv",
  	"flipInX": "_5hry",
  	"spin": "KfAq",
  	"btn-social": "_12UD",
  	"is-twitch": "b9vP",
  	"is-twitter": "yguc",
  	"is-odnoklassniki": "_1Z3Y",
  	"is-vkontakte": "_116D",
  	"is-tumblr": "_30sC",
  	"is-instagram": "QUjt",
  	"is-facebook": "_1_rW"
  };

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ProfilePage = __webpack_require__(182);
  
  var _ProfilePage2 = _interopRequireDefault(_ProfilePage);
  
  var _SettingsPage = __webpack_require__(183);
  
  var _SettingsPage2 = _interopRequireDefault(_SettingsPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(_ProfilePage2.default, null);
  
  var _ref2 = _react2.default.createElement(_SettingsPage2.default, null);
  
  var _ref3 = _react2.default.createElement(_ProfilePage2.default, null);
  
  exports.default = {
    // path: '/',
    children: [{
      path: '/',
      action: function action() {
        return {
          title: 'Cabinet',
          component: _ref
        };
      }
    }, {
      path: '/settings',
      action: function action() {
        return {
          title: 'Settings',
          component: _ref2
        };
      }
    }, {
      path: '/profile',
      action: function action() {
        return {
          title: 'profile',
          component: _ref3
        };
      }
    }, {
      path: '*',
      action: function action() {
        throw 'Not found in cabinet';
      }
    }],
    action: function action(_ref4) {
      var _this = this;
  
      var next = _ref4.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var route;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                route = _context.sent;
                return _context.abrupt('return', route);
  
              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class, _class2, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _mobxReact = __webpack_require__(122);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _reactstrap = __webpack_require__(110);
  
  var _Header = __webpack_require__(121);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(
    _reactBootstrap.Row,
    null,
    _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12 },
      _react2.default.createElement(_Header2.default, null)
    )
  );
  
  var ProfilePage = (_dec = (0, _mobxReact.inject)('user'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(ProfilePage, _Component);
  
    function ProfilePage() {
      (0, _classCallCheck3.default)(this, ProfilePage);
      return (0, _possibleConstructorReturn3.default)(this, (ProfilePage.__proto__ || (0, _getPrototypeOf2.default)(ProfilePage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ProfilePage, [{
      key: 'render',
      value: function render() {
        var user = this.props.user;
        return _react2.default.createElement(
          _reactBootstrap.Grid,
          null,
          _ref,
          _react2.default.createElement(
            _reactBootstrap.Row,
            { style: { marginTop: 80 } },
            _react2.default.createElement(
              _reactBootstrap.Col,
              { md: 6, xs: 12 },
              _react2.default.createElement(
                _reactstrap.Card,
                { style: { marginTop: 20 } },
                _react2.default.createElement(
                  _reactstrap.CardBlock,
                  null,
                  _react2.default.createElement(
                    'h3',
                    null,
                    user.username
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    user.name
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return ProfilePage;
  }(_react.Component), _class2.defaultProps = {
    user: {}
  }, _temp)) || _class) || _class);
  exports.default = ProfilePage;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _dec, _class, _class2, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _mobxReact = __webpack_require__(122);
  
  var _reactBootstrap = __webpack_require__(111);
  
  var _reactstrap = __webpack_require__(110);
  
  var _Header = __webpack_require__(121);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = _react2.default.createElement(
    _reactBootstrap.Row,
    null,
    _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12 },
      _react2.default.createElement(_Header2.default, null)
    )
  );
  
  var _ref2 = _react2.default.createElement(
    'h4',
    null,
    '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435'
  );
  
  var _ref3 = _react2.default.createElement(
    _reactBootstrap.ControlLabel,
    null,
    '\u042E\u0437\u0435\u0440\u043D\u0435\u0439\u043C'
  );
  
  var _ref4 = _react2.default.createElement(
    _reactBootstrap.ControlLabel,
    null,
    '\u0418\u043C\u044F'
  );
  
  var ProfilePage = (_dec = (0, _mobxReact.inject)('user'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(ProfilePage, _Component);
  
    function ProfilePage() {
      (0, _classCallCheck3.default)(this, ProfilePage);
      return (0, _possibleConstructorReturn3.default)(this, (ProfilePage.__proto__ || (0, _getPrototypeOf2.default)(ProfilePage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ProfilePage, [{
      key: 'changeField',
      value: function changeField(field) {
        var _this2 = this;
  
        return function (e) {
          _this2.props.user.editField(field, e.target.value);
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var user = this.props.user;
        return _react2.default.createElement(
          _reactBootstrap.Grid,
          null,
          _ref,
          _react2.default.createElement(
            _reactBootstrap.Row,
            { style: { marginTop: 80 } },
            _react2.default.createElement(
              _reactBootstrap.Col,
              { md: 6, xs: 12 },
              _react2.default.createElement(
                _reactstrap.Card,
                { style: { margin: '20px 0' } },
                _react2.default.createElement(
                  _reactstrap.CardBlock,
                  null,
                  _ref2,
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'username' },
                    _ref3,
                    _react2.default.createElement(_reactBootstrap.FormControl, {
                      type: 'text',
                      value: user.username,
                      placeholder: '\u042E\u0437\u0435\u0440\u043D\u0435\u0439\u043C',
                      onChange: this.changeField('username')
                    })
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'name' },
                    _ref4,
                    _react2.default.createElement(_reactBootstrap.FormControl, {
                      type: 'text',
                      value: user.name,
                      placeholder: '\u0418\u043C\u044F',
                      onChange: this.changeField('name')
                    })
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return ProfilePage;
  }(_react.Component), _class2.defaultProps = {
    user: {}
  }, _temp)) || _class) || _class);
  exports.default = ProfilePage;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _AuthStore = __webpack_require__(185);
  
  var _AuthStore2 = _interopRequireDefault(_AuthStore);
  
  var _UserStore = __webpack_require__(188);
  
  var _UserStore2 = _interopRequireDefault(_UserStore);
  
  var _api = __webpack_require__(191);
  
  var _api2 = _interopRequireDefault(_api);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var AppStore = function () {
    function AppStore(state, req, config) {
      (0, _classCallCheck3.default)(this, AppStore);
  
      var api =  true ? config.client.api : config.api;
      var user = req.user || state.user;
      this.api = new _api2.default(api);
      this.auth = new _AuthStore2.default(this, { state: state, req: req });
      this.user = new _UserStore2.default(this, user);
    }
  
    (0, _createClass3.default)(AppStore, [{
      key: 'provide',
      value: function provide() {
        return {
          app: this,
          auth: this.auth,
          user: this.user,
          api: this.api
        };
      }
    }]);
    return AppStore;
  }();
  
  exports.default = AppStore;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getOwnPropertyDescriptor = __webpack_require__(163);
  
  var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _desc, _value, _class;
  
  var _mobx = __webpack_require__(123);
  
  var _reactCookie = __webpack_require__(186);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _isEmpty = __webpack_require__(187);
  
  var _isEmpty2 = _interopRequireDefault(_isEmpty);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
  
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
  
    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
  
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
  
    return desc;
  }
  
  var AuthStore = (_class = function () {
    function AuthStore(store, data) {
      (0, _classCallCheck3.default)(this, AuthStore);
      this.token = null;
  
      this.store = store;
      this.data = data;
      this.authenticate();
    }
  
    (0, _createClass3.default)(AuthStore, [{
      key: 'authenticate',
      value: function authenticate() {
        if (false) return this.authOnClient();
        if (true) return this.authOnServer();
        return null;
      }
    }, {
      key: 'authOnServer',
      value: function authOnServer() {
        if (!this.isErrorJWT && this.isToken && this.isUser) {
          this.setToken(this.data.req.token);
          this.updateUser(this.data.req.user);
        } else {
          this.logout();
        }
      }
    }, {
      key: 'authOnClient',
      value: function authOnClient() {
        if (this.isToken && this.isUser) {
          this.setToken(_reactCookie2.default.load('token'));
          this.updateUser(this.data.state.user);
        } else {
          this.logout();
        }
      }
    }, {
      key: 'checkAuthData',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(!this.isToken || !this.isUser)) {
                    _context.next = 4;
                    break;
                  }
  
                  _context.next = 3;
                  return this.logout();
  
                case 3:
                  return _context.abrupt('return', false);
  
                case 4:
                  return _context.abrupt('return', true);
  
                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function checkAuthData() {
          return _ref.apply(this, arguments);
        }
  
        return checkAuthData;
      }()
    }, {
      key: 'logout',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.unsetToken();
                  this.updateUser();
  
                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
  
        function logout() {
          return _ref2.apply(this, arguments);
        }
  
        return logout;
      }()
    }, {
      key: 'unsetToken',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  this.store.api.setAuthToken(null);
                  _reactCookie2.default.remove('token');
                  this.token = null;
  
                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));
  
        function unsetToken() {
          return _ref3.apply(this, arguments);
        }
  
        return unsetToken;
      }()
    }, {
      key: 'setToken',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(token) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.checkAuthData();
  
                case 2:
                  if (!_context4.sent) {
                    _context4.next = 6;
                    break;
                  }
  
                  this.store.api.setAuthToken(token);
                  _reactCookie2.default.save('token', token);
                  this.token = token;
  
                case 6:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));
  
        function setToken(_x) {
          return _ref4.apply(this, arguments);
        }
  
        return setToken;
      }()
    }, {
      key: 'signup',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
          var res;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.store.api.authSignup(data);
  
                case 2:
                  res = _context5.sent;
                  _context5.next = 5;
                  return this.setToken(res.token);
  
                case 5:
                  _context5.next = 7;
                  return this.updateUser(res.user);
  
                case 7:
                  return _context5.abrupt('return', res);
  
                case 8:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));
  
        function signup(_x2) {
          return _ref5.apply(this, arguments);
        }
  
        return signup;
      }()
    }, {
      key: 'login',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data) {
          var res;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.store.api.authLogin(data);
  
                case 2:
                  res = _context6.sent;
                  _context6.next = 5;
                  return this.setToken(res.token);
  
                case 5:
                  _context6.next = 7;
                  return this.updateUser(res.user);
  
                case 7:
                  return _context6.abrupt('return', res);
  
                case 8:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));
  
        function login(_x3) {
          return _ref6.apply(this, arguments);
        }
  
        return login;
      }()
    }, {
      key: 'recovery',
      value: function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
          var res;
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.store.api.authRecovery(data);
  
                case 2:
                  res = _context7.sent;
                  return _context7.abrupt('return', res);
  
                case 4:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));
  
        function recovery(_x4) {
          return _ref7.apply(this, arguments);
        }
  
        return recovery;
      }()
    }, {
      key: 'updateUser',
      value: function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  this.store.user.update(data);
  
                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));
  
        function updateUser() {
          return _ref8.apply(this, arguments);
        }
  
        return updateUser;
      }()
    }, {
      key: 'isAuth',
      get: function get() {
        return this.store.user._id;
      }
    }, {
      key: 'isErrorJWT',
      get: function get() {
        return this.data.req._errJwt;
      }
    }, {
      key: 'isToken',
      get: function get() {
        return this.data.req.token !== 'undefined' || !this.data.req.token || _reactCookie2.default.load('token');
      }
    }, {
      key: 'isUser',
      get: function get() {
        return this.data.req.user ? this.data.req.user._id : this.data.state.user && this.data.state.user._id;
      }
    }]);
    return AuthStore;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'updateUser', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateUser'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isAuth', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isAuth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isErrorJWT', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isErrorJWT'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isToken', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isToken'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isUser', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isUser'), _class.prototype)), _class);
  exports.default = AuthStore;

/***/ },
/* 186 */
/***/ function(module, exports) {

  module.exports = require("react-cookie");

/***/ },
/* 187 */
/***/ function(module, exports) {

  module.exports = require("lodash/isEmpty");

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _defineProperty = __webpack_require__(189);
  
  var _defineProperty2 = _interopRequireDefault(_defineProperty);
  
  var _getOwnPropertyDescriptor = __webpack_require__(163);
  
  var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _desc, _value, _class, _descriptor, _descriptor2;
  
  var _mobx = __webpack_require__(123);
  
  var _set = __webpack_require__(190);
  
  var _set2 = _interopRequireDefault(_set);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    (0, _defineProperty2.default)(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
  
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
  
    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
  
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
  
    return desc;
  }
  
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  
  var UserStore = (_class = function () {
    function UserStore(store, user) {
      (0, _classCallCheck3.default)(this, UserStore);
  
      _initDefineProp(this, 'username', _descriptor, this);
  
      _initDefineProp(this, 'name', _descriptor2, this);
  
      this.store = store;
      if (user) this.update(user);
    }
  
    (0, _createClass3.default)(UserStore, [{
      key: 'update',
      value: function update(user) {
        for (var item in user) {
          (0, _set2.default)(this, item, user[item]);
        }
      }
    }, {
      key: 'editField',
      value: function editField() {
        var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var text = arguments[1];
  
        if (field) this[field] = text;
      }
    }, {
      key: 'toJS',
      get: function get() {
        var self = (0, _mobx.toJS)(this);
        delete self.store;
        return self;
      }
    }, {
      key: 'profileLink',
      get: function get() {
        return '/user/' + this._id;
      }
    }]);
    return UserStore;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'username', [_mobx.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_mobx.observable], {
    enumerable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, 'editField', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'editField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toJS', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toJS'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'profileLink', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'profileLink'), _class.prototype)), _class);
  exports.default = UserStore;

/***/ },
/* 189 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/define-property");

/***/ },
/* 190 */
/***/ function(module, exports) {

  module.exports = require("lodash/set");

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _stringify = __webpack_require__(49);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _api = __webpack_require__(192);
  
  var _api2 = _interopRequireDefault(_api);
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ApiClient = function (_ApiClientBase) {
    (0, _inherits3.default)(ApiClient, _ApiClientBase);
  
    function ApiClient() {
      (0, _classCallCheck3.default)(this, ApiClient);
      return (0, _possibleConstructorReturn3.default)(this, (ApiClient.__proto__ || (0, _getPrototypeOf2.default)(ApiClient)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ApiClient, [{
      key: 'throwError',
      value: function throwError(_ref) {
        var err = _ref.err;
  
        console.log('throwError', err);
        var message = err && err.message || err;
        var error = new Error(_lodash2.default.isPlainObject(message) ? (0, _stringify2.default)(message) : message);
  
        var title = err && err.statusText || 'Ошибка';
        var text = err && err.data && err.data.message || error.message;
  
        global.toast({
          title: title,
          text: text
        });
  
        // throw error;
      }
  
      // async authSignup(params) {
      //   const body = {
      //     first_name: params.name,
      //     email: params.email,
      //     password: params.password,
      //   };
      //   const res = await this.fetch('/users/registration/post/', {
      //     method: 'POST',
      //     body,
      //   });
      //   return this.authLogin({
      //     token: res.token,
      //   });
      // }
      //
      // async authLogin(params) {
      //   let token;
      //   if (!params.token) {
      //     const body = {
      //       username: params.email,
      //       password: params.password,
      //     };
      //     // console.log({body});
      //     const data = await this.fetch('/users/token/post/', {
      //       method: 'POST',
      //       body,
      //     });
      //     token = data.token;
      //   } else {
      //     token = params.token;
      //   }
      //
      //   // const data2 = await this.fetch('/users/login/post/', {
      //   //   method: 'POST',
      //   //   headers: {
      //   //     Authorization:`Token ${token}`
      //   //   },
      //   //   body,
      //   // })
      //   // console.log({data2});
      //   //
      //   const user = await this.fetch('/users/me/', {
      //     method: 'GET',
      //     headers: {
      //       Authorization: `Token ${token}`,
      //     },
      //   });
      //   return {
      //     token,
      //     user,
      //   };
      //   // console.log({data2});
      //
      //   // data.token =
      //   // const res = await this.fetch('/users/registration/post/', {
      //   //   method: 'POST',
      //   //   body,
      //   // })
      //   // const json = await res.json()
      //   // return json
      // }
  
    }]);
    return ApiClient;
  }(_api2.default);
  
  exports.default = ApiClient;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _assign = __webpack_require__(27);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _regenerator = __webpack_require__(14);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(49);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(15);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _promise = __webpack_require__(3);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _keys = __webpack_require__(28);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  exports.trim = trim;
  
  var _lodash = __webpack_require__(10);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function trim(initialStr) {
    var begin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var symbol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  
    if (initialStr == null) return initialStr;
    var str = initialStr;
    if (end && str[str.length - 1] === symbol) {
      str = str.substr(0, str.length - 1);
    }
    if (begin && str[0] === symbol) {
      str = str.substr(1);
    }
    if (str !== initialStr) return trim(str, begin, end, symbol);
    return str;
  } // import fetch from 'node-fetch';
  
  
  function queryParams(params) {
    return (0, _keys2.default)(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
  }
  
  var ApiClient = function () {
    function ApiClient(params) {
      (0, _classCallCheck3.default)(this, ApiClient);
  
      this.base = trim(params.base, false);
      this.prefix = trim(params.prefix);
      if (params.auth) {
        this.setAuth(params.auth);
      }
    }
  
    (0, _createClass3.default)(ApiClient, [{
      key: 'setAuthToken',
      value: function setAuthToken(authToken) {
        this.authToken = authToken;
      }
    }, {
      key: 'setAuth',
      value: function setAuth(authParams) {
        this.authParams = authParams;
        if (this.authParams.token) {
          this.authToken = this.authParams.token;
        }
      }
    }, {
      key: 'authFetch',
      value: function authFetch() {
        if (!this.authToken) {
          return _promise2.default.reject('!this.authToken');
        }
        return this.fetch.apply(this, arguments);
      }
    }, {
      key: 'authLogin',
      value: function authLogin(data) {
        return this.fetch('auth/login', {
          method: 'POST',
          body: data
        });
      }
    }, {
      key: 'authSignup',
      value: function authSignup(data) {
        return this.fetch('auth/signup', {
          method: 'POST',
          body: data
        });
      }
    }, {
      key: 'authValidate',
      value: function authValidate(data) {
        return this.fetch('auth/validate', {
          method: 'GET',
          body: data
        });
      }
    }, {
      key: 'authRecovery',
      value: function authRecovery(data) {
        return this.fetch('auth/recovery', {
          method: 'POST',
          body: data
        });
      }
    }, {
      key: 'getUser',
      value: function getUser(id) {
        return this.fetch('user/' + id, {
          method: 'GET'
        });
      }
  
      // onError(err) {
      //   console.log('pack.err', err)
      //   throw err
      // }
  
    }, {
      key: 'throwError',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
          var err = _ref2.err;
          var message;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log('throwError', err);
                  message = err && err.message || err;
                  throw new Error(_lodash2.default.isPlainObject(message) ? (0, _stringify2.default)(message) : message);
  
                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
  
        function throwError(_x4) {
          return _ref.apply(this, arguments);
        }
  
        return throwError;
      }()
    }, {
      key: 'afterFetch',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
          var json = _ref4.json,
              res = _ref4.res;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(res.status >= 400)) {
                    _context2.next = 3;
                    break;
                  }
  
                  _context2.next = 3;
                  return this.throwError({
                    err: {
                      status: res.status,
                      statusText: res.statusText,
                      data: json
                    },
                    res: res
                  });
  
                case 3:
                  if (!json.err) {
                    _context2.next = 6;
                    break;
                  }
  
                  _context2.next = 6;
                  return this.throwError({
                    err: json.err,
                    json: json,
                    res: res
                  });
  
                case 6:
                  return _context2.abrupt('return', json);
  
                case 7:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
  
        function afterFetch(_x5) {
          return _ref3.apply(this, arguments);
        }
  
        return afterFetch;
      }()
    }, {
      key: 'createUrl',
      value: function createUrl(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
        // console.log('createUrl', path);
        var prefix = options.prefix || this.prefix || '';
        if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
          return path;
        }
        var url = void 0;
        if (path[0] === '/' && !prefix) {
          url = [this.base, path.substr(1)];
        } else if (prefix) {
          url = [this.base, prefix, path];
        } else {
          url = [this.base, path];
        }
        // console.log('url', url);
        return url.join('/');
      }
    }, {
      key: 'getFetch',
      value: function getFetch(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
        var options = (0, _assign2.default)({}, params);
  
        if (options.data && !options.body) {
          options.body = options.data;
        }
        if (_lodash2.default.isPlainObject(options.body)) {
          options.body = (0, _stringify2.default)(options.body);
        }
        if (!options.headers) options.headers = {};
        if (!options.headers.Accept) options.headers.Accept = 'application/json';
        if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8';
        if (options.headers['Content-Type'] === '!') {
          delete options.headers['Content-Type'];
        }
        if (!options.headers.Authorization && this.authToken) {
          options.headers.Authorization = 'Bearer ' + this.authToken;
        }
  
        if (options.queryParams || options.qs) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams || options.qs);
        }
  
        return fetch(this.createUrl(url), options);
      }
    }, {
      key: 'fetch',
      value: function fetch() {
        var _this = this;
  
        return this.getFetch.apply(this, arguments).then(function () {
          var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(res) {
            var text, json;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    text = void 0;
                    json = void 0;
                    _context3.prev = 2;
                    _context3.next = 5;
                    return res.text();
  
                  case 5:
                    text = _context3.sent;
  
                    json = JSON.parse(text);
                    _context3.next = 13;
                    break;
  
                  case 9:
                    _context3.prev = 9;
                    _context3.t0 = _context3['catch'](2);
                    _context3.next = 13;
                    return _this.throwError({
                      err: {
                        status: res.status,
                        statusText: res.statusText,
                        // text: text,
                        message: text
                      },
                      res: res
                    });
  
                  case 13:
                    return _context3.abrupt('return', _this.afterFetch({
                      json: json,
                      text: text,
                      res: res
                    }));
  
                  case 14:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this, [[2, 9]]);
          }));
  
          return function (_x8) {
            return _ref5.apply(this, arguments);
          };
        }());
      }
    }]);
    return ApiClient;
  }();
  
  exports.default = ApiClient;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.default = function () {
    var _require, _require2, _require3;
  
    return {
      Category: (_require = __webpack_require__(194)).default.apply(_require, arguments),
      // Tag: require('./Tag').default(...arguments),
      // Pet: require('./Pet').default(...arguments),
      // Counter: require('./Counter').default(...arguments),
      Task: (_require2 = __webpack_require__(195)).default.apply(_require2, arguments),
      Game: (_require3 = __webpack_require__(196)).default.apply(_require3, arguments)
    };
  };

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSchema = getSchema;
  
  var _UniversalSchema = __webpack_require__(69);
  
  var _UniversalSchema2 = _interopRequireDefault(_UniversalSchema);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // eslint-disable-line
  
  function getSchema(ctx) {
    // eslint-disable-line
    // const mongoose = ctx.db;
    var schema = new _UniversalSchema2.default({
      categoryId: {
        type: String
      },
      tags: {
        type: [String]
      },
      title: {
        type: String
      },
      subtitle: {
        type: String
      },
      image: {
        type: String
      }
    });
  
    return schema;
  }
  
  exports.default = function (ctx) {
    var schema = getSchema(ctx);
    return ctx.db.model('Category', schema.getMongooseSchema(), 'category');
  };

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSchema = getSchema;
  
  var _UniversalSchema = __webpack_require__(69);
  
  var _UniversalSchema2 = _interopRequireDefault(_UniversalSchema);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // eslint-disable-line
  
  function getSchema(ctx) {
    // eslint-disable-line
    // const mongoose = ctx.db;
    var schema = new _UniversalSchema2.default({
      platform: {
        type: String
      },
      categoryId: {
        type: String
      },
      question: {
        type: Object
      },
      answers: {
        type: Array
      },
      title: {
        type: String
      }
    }, {
      strict: false
    });
  
    return schema;
  }
  
  exports.default = function (ctx) {
    var schema = getSchema(ctx);
    return ctx.db.model('Task', schema.getMongooseSchema(), 'task');
  };

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSchema = getSchema;
  
  var _UniversalSchema = __webpack_require__(69);
  
  var _UniversalSchema2 = _interopRequireDefault(_UniversalSchema);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // eslint-disable-line
  
  
  function getSchema(ctx) {
    // eslint-disable-line
    // const mongoose = ctx.db;
    var schema = new _UniversalSchema2.default({
      userId: {
        type: String
      },
      categoryId: {
        type: String
      },
      tasks: {
        type: Array
      },
      answers: {
        type: Array
      },
      result: {
        type: Object
      },
      boughtAt: {
        type: Date
      },
      finishedAt: {
        type: Date
      },
      cert: {
        type: Object
      }
    });
  
    return schema;
  }
  
  exports.default = function (ctx) {
    var schema = getSchema(ctx);
    return ctx.db.model('Game', schema.getMongooseSchema(), 'game');
  };

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Root = undefined;
  
  var _get2 = __webpack_require__(20);
  
  var _get3 = _interopRequireDefault(_get2);
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _class, _temp;
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Html = __webpack_require__(101);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _mobxReact = __webpack_require__(122);
  
  var _ToastContainer = __webpack_require__(198);
  
  var _ToastContainer2 = _interopRequireDefault(_ToastContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(200);
  __webpack_require__(201);
  
  var _ref = _react2.default.createElement(_ToastContainer2.default, null);
  
  var Root = exports.Root = function (_HtmlBase$Root) {
    (0, _inherits3.default)(Root, _HtmlBase$Root);
  
    function Root() {
      (0, _classCallCheck3.default)(this, Root);
      return (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || (0, _getPrototypeOf2.default)(Root)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Root, [{
      key: 'render',
      value: function render() {
        var stores = this.props.ctx.provider && this.props.ctx.provider.provide() || this.props.ctx.stores || {};
        return _react2.default.createElement(
          _mobxReact.Provider,
          stores,
          _react2.default.createElement(
            'div',
            null,
            this.props.component,
            _ref
          )
        );
      }
    }]);
    return Root;
  }(_Html2.default.Root);
  
  var Html = (_temp = _class = function (_HtmlBase) {
    (0, _inherits3.default)(Html, _HtmlBase);
  
    function Html() {
      (0, _classCallCheck3.default)(this, Html);
      return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Html, [{
      key: 'renderHead',
  
      // renderStyle() {
      //   return `<style id="css"></style>`
      // }
  
      value: function renderHead() {
        // <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet"/>
        // <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.5/css/bootstrap-flex.min.css" rel="stylesheet"/>
        // <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
        return (0, _get3.default)(Html.prototype.__proto__ || (0, _getPrototypeOf2.default)(Html.prototype), 'renderHead', this).call(this) + '\n\n';
      }
    }, {
      key: 'renderFooter',
      value: function renderFooter() {
        return (0, _get3.default)(Html.prototype.__proto__ || (0, _getPrototypeOf2.default)(Html.prototype), 'renderFooter', this).call(this) + '\n' + __webpack_require__(202) + '\n';
      }
    }]);
    return Html;
  }(_Html2.default), _class.Root = Root, _temp);
  exports.default = Html;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  
  var _getPrototypeOf = __webpack_require__(16);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(17);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(18);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(19);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(21);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(86);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactToastr = __webpack_require__(199);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ToastMessageFactory = (0, _react.createFactory)(_reactToastr.ToastMessage.animation);
  
  var ToastContainer2 = function (_Component) {
    (0, _inherits3.default)(ToastContainer2, _Component);
  
    function ToastContainer2() {
      (0, _classCallCheck3.default)(this, ToastContainer2);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ToastContainer2.__proto__ || (0, _getPrototypeOf2.default)(ToastContainer2)).call(this));
  
      global.errors = [];
      // global.throwError = global.errors.push;
      global.toast = function () {
        var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  
        console.log('throwError', err);
        if (!err.type) err.type = 'error';
        if (!err.title) {
          if (err.type === 'error') {
            err.title = 'Ошибка';
          } else {
            err.title = 'Успех';
          }
        }
        if (!err.text) {
          if (err.type === 'error') {
            err.text = 'Что-то пошло не так';
          } else {
            err.text = 'Успех';
          }
        }
        global.errors.push(err);
      };
      return _this;
    }
  
    (0, _createClass3.default)(ToastContainer2, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;
  
        this.interval = setInterval(function () {
          while (_this2.check()) {}
        }, 1000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.interval);
      }
    }, {
      key: 'check',
      value: function check() {
        if (!global.errors.length) return false;
        var error = global.errors[0];
        global.errors = global.errors.slice(1);
        this.addAlert(error);
        return true;
      }
    }, {
      key: 'addAlert',
      value: function addAlert(_ref) {
        var title = _ref.title,
            text = _ref.text,
            type = _ref.type;
  
        this.toast[type](title, text, {
          preventDuplicates: false,
          closeButton: true
        });
      }
    }, {
      key: 'clearAlert',
      value: function clearAlert() {
        this.toast.clear();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        return _react2.default.createElement(_reactToastr.ToastContainer, {
          ref: function ref(e) {
            return _this3.toast = e;
          },
          toastMessageFactory: ToastMessageFactory,
          className: 'toast-bottom-right'
        });
      }
    }]);
    return ToastContainer2;
  }(_react.Component);
  
  exports.default = ToastContainer2;

/***/ },
/* 199 */
/***/ function(module, exports) {

  module.exports = require("react-toastr");

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic);", ""]);
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}\n\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,:after,:before{background:transparent!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:transparent}body{font-family:Lato,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.42857;color:#2c3e50;background-color:#fff}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#18bc9c;text-decoration:none}a:focus,a:hover{color:#18bc9c;text-decoration:underline}a:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.img-responsive{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{padding:4px;line-height:1.42857;background-color:#fff;border:1px solid #ecf0f1;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:21px;margin-bottom:21px;border:0;border-top:1px solid #ecf0f1}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:Lato,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:400;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#b4bcc2}.h1,.h2,.h3,h1,h2,h3{margin-top:21px;margin-bottom:10.5px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:10.5px;margin-bottom:10.5px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:39px}.h2,h2{font-size:32px}.h3,h3{font-size:26px}.h4,h4{font-size:19px}.h5,h5{font-size:15px}.h6,h6{font-size:13px}p{margin:0 0 10.5px}.lead{margin-bottom:21px;font-size:17px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:22.5px}}.small,small{font-size:86%}.mark,mark{background-color:#f39c12;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.initialism,.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#b4bcc2}.text-primary{color:#2c3e50}a.text-primary:focus,a.text-primary:hover{color:#1a252f}.text-success{color:#fff}a.text-success:focus,a.text-success:hover{color:#e6e6e6}.text-info{color:#fff}a.text-info:focus,a.text-info:hover{color:#e6e6e6}.text-warning{color:#fff}a.text-warning:focus,a.text-warning:hover{color:#e6e6e6}.text-danger{color:#fff}a.text-danger:focus,a.text-danger:hover{color:#e6e6e6}.bg-primary{color:#fff;background-color:#2c3e50}a.bg-primary:focus,a.bg-primary:hover{background-color:#1a252f}.bg-success{background-color:#18bc9c}a.bg-success:focus,a.bg-success:hover{background-color:#128f76}.bg-info{background-color:#3498db}a.bg-info:focus,a.bg-info:hover{background-color:#217dbb}.bg-warning{background-color:#f39c12}a.bg-warning:focus,a.bg-warning:hover{background-color:#c87f0a}.bg-danger{background-color:#e74c3c}a.bg-danger:focus,a.bg-danger:hover{background-color:#d62c1a}.page-header{padding-bottom:9.5px;margin:42px 0 21px;border-bottom:1px solid transparent}ol,ul{margin-top:0;margin-bottom:10.5px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-inline,.list-unstyled{padding-left:0;list-style:none}.list-inline{margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:21px}dd,dt{line-height:1.42857}dt{font-weight:700}dd{margin-left:0}.dl-horizontal dd:after,.dl-horizontal dd:before{content:\" \";display:table}.dl-horizontal dd:after{clear:both}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #b4bcc2}.initialism{font-size:90%}blockquote{padding:10.5px 21px;margin:0 0 21px;font-size:18.75px;border-left:5px solid #ecf0f1}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857;color:#b4bcc2}blockquote .small:before,blockquote footer:before,blockquote small:before{content:\"\\2014   \\A0\"}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #ecf0f1;border-left:0;text-align:right}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:\"\"}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:\"\\A0   \\2014\"}address{margin-bottom:21px;font-style:normal;line-height:1.42857}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,Courier New,monospace}code{color:#c7254e;background-color:#f9f2f4;border-radius:4px}code,kbd{padding:2px 4px;font-size:90%}kbd{color:#fff;background-color:#333;border-radius:3px;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.25);box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;-webkit-box-shadow:none;box-shadow:none}pre{display:block;padding:10px;margin:0 0 10.5px;font-size:14px;line-height:1.42857;word-break:break-all;word-wrap:break-word;color:#7b8a8b;background-color:#ecf0f1;border:1px solid #ccc;border-radius:4px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.container:after,.container:before{content:\" \";display:table}.container:after{clear:both}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.container-fluid:after,.container-fluid:before{content:\" \";display:table}.container-fluid:after{clear:both}.row{margin-left:-15px;margin-right:-15px}.row:after,.row:before{content:\" \";display:table}.row:after{clear:both}.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12,.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12,.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12,.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{float:left}.col-xs-1{width:8.33333%}.col-xs-2{width:16.66667%}.col-xs-3{width:25%}.col-xs-4{width:33.33333%}.col-xs-5{width:41.66667%}.col-xs-6{width:50%}.col-xs-7{width:58.33333%}.col-xs-8{width:66.66667%}.col-xs-9{width:75%}.col-xs-10{width:83.33333%}.col-xs-11{width:91.66667%}.col-xs-12{width:100%}.col-xs-pull-0{right:auto}.col-xs-pull-1{right:8.33333%}.col-xs-pull-2{right:16.66667%}.col-xs-pull-3{right:25%}.col-xs-pull-4{right:33.33333%}.col-xs-pull-5{right:41.66667%}.col-xs-pull-6{right:50%}.col-xs-pull-7{right:58.33333%}.col-xs-pull-8{right:66.66667%}.col-xs-pull-9{right:75%}.col-xs-pull-10{right:83.33333%}.col-xs-pull-11{right:91.66667%}.col-xs-pull-12{right:100%}.col-xs-push-0{left:auto}.col-xs-push-1{left:8.33333%}.col-xs-push-2{left:16.66667%}.col-xs-push-3{left:25%}.col-xs-push-4{left:33.33333%}.col-xs-push-5{left:41.66667%}.col-xs-push-6{left:50%}.col-xs-push-7{left:58.33333%}.col-xs-push-8{left:66.66667%}.col-xs-push-9{left:75%}.col-xs-push-10{left:83.33333%}.col-xs-push-11{left:91.66667%}.col-xs-push-12{left:100%}.col-xs-offset-0{margin-left:0}.col-xs-offset-1{margin-left:8.33333%}.col-xs-offset-2{margin-left:16.66667%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-4{margin-left:33.33333%}.col-xs-offset-5{margin-left:41.66667%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-7{margin-left:58.33333%}.col-xs-offset-8{margin-left:66.66667%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-10{margin-left:83.33333%}.col-xs-offset-11{margin-left:91.66667%}.col-xs-offset-12{margin-left:100%}@media (min-width:768px){.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12{float:left}.col-sm-1{width:8.33333%}.col-sm-2{width:16.66667%}.col-sm-3{width:25%}.col-sm-4{width:33.33333%}.col-sm-5{width:41.66667%}.col-sm-6{width:50%}.col-sm-7{width:58.33333%}.col-sm-8{width:66.66667%}.col-sm-9{width:75%}.col-sm-10{width:83.33333%}.col-sm-11{width:91.66667%}.col-sm-12{width:100%}.col-sm-pull-0{right:auto}.col-sm-pull-1{right:8.33333%}.col-sm-pull-2{right:16.66667%}.col-sm-pull-3{right:25%}.col-sm-pull-4{right:33.33333%}.col-sm-pull-5{right:41.66667%}.col-sm-pull-6{right:50%}.col-sm-pull-7{right:58.33333%}.col-sm-pull-8{right:66.66667%}.col-sm-pull-9{right:75%}.col-sm-pull-10{right:83.33333%}.col-sm-pull-11{right:91.66667%}.col-sm-pull-12{right:100%}.col-sm-push-0{left:auto}.col-sm-push-1{left:8.33333%}.col-sm-push-2{left:16.66667%}.col-sm-push-3{left:25%}.col-sm-push-4{left:33.33333%}.col-sm-push-5{left:41.66667%}.col-sm-push-6{left:50%}.col-sm-push-7{left:58.33333%}.col-sm-push-8{left:66.66667%}.col-sm-push-9{left:75%}.col-sm-push-10{left:83.33333%}.col-sm-push-11{left:91.66667%}.col-sm-push-12{left:100%}.col-sm-offset-0{margin-left:0}.col-sm-offset-1{margin-left:8.33333%}.col-sm-offset-2{margin-left:16.66667%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-4{margin-left:33.33333%}.col-sm-offset-5{margin-left:41.66667%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-7{margin-left:58.33333%}.col-sm-offset-8{margin-left:66.66667%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-10{margin-left:83.33333%}.col-sm-offset-11{margin-left:91.66667%}.col-sm-offset-12{margin-left:100%}}@media (min-width:992px){.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12{float:left}.col-md-1{width:8.33333%}.col-md-2{width:16.66667%}.col-md-3{width:25%}.col-md-4{width:33.33333%}.col-md-5{width:41.66667%}.col-md-6{width:50%}.col-md-7{width:58.33333%}.col-md-8{width:66.66667%}.col-md-9{width:75%}.col-md-10{width:83.33333%}.col-md-11{width:91.66667%}.col-md-12{width:100%}.col-md-pull-0{right:auto}.col-md-pull-1{right:8.33333%}.col-md-pull-2{right:16.66667%}.col-md-pull-3{right:25%}.col-md-pull-4{right:33.33333%}.col-md-pull-5{right:41.66667%}.col-md-pull-6{right:50%}.col-md-pull-7{right:58.33333%}.col-md-pull-8{right:66.66667%}.col-md-pull-9{right:75%}.col-md-pull-10{right:83.33333%}.col-md-pull-11{right:91.66667%}.col-md-pull-12{right:100%}.col-md-push-0{left:auto}.col-md-push-1{left:8.33333%}.col-md-push-2{left:16.66667%}.col-md-push-3{left:25%}.col-md-push-4{left:33.33333%}.col-md-push-5{left:41.66667%}.col-md-push-6{left:50%}.col-md-push-7{left:58.33333%}.col-md-push-8{left:66.66667%}.col-md-push-9{left:75%}.col-md-push-10{left:83.33333%}.col-md-push-11{left:91.66667%}.col-md-push-12{left:100%}.col-md-offset-0{margin-left:0}.col-md-offset-1{margin-left:8.33333%}.col-md-offset-2{margin-left:16.66667%}.col-md-offset-3{margin-left:25%}.col-md-offset-4{margin-left:33.33333%}.col-md-offset-5{margin-left:41.66667%}.col-md-offset-6{margin-left:50%}.col-md-offset-7{margin-left:58.33333%}.col-md-offset-8{margin-left:66.66667%}.col-md-offset-9{margin-left:75%}.col-md-offset-10{margin-left:83.33333%}.col-md-offset-11{margin-left:91.66667%}.col-md-offset-12{margin-left:100%}}@media (min-width:1200px){.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12{float:left}.col-lg-1{width:8.33333%}.col-lg-2{width:16.66667%}.col-lg-3{width:25%}.col-lg-4{width:33.33333%}.col-lg-5{width:41.66667%}.col-lg-6{width:50%}.col-lg-7{width:58.33333%}.col-lg-8{width:66.66667%}.col-lg-9{width:75%}.col-lg-10{width:83.33333%}.col-lg-11{width:91.66667%}.col-lg-12{width:100%}.col-lg-pull-0{right:auto}.col-lg-pull-1{right:8.33333%}.col-lg-pull-2{right:16.66667%}.col-lg-pull-3{right:25%}.col-lg-pull-4{right:33.33333%}.col-lg-pull-5{right:41.66667%}.col-lg-pull-6{right:50%}.col-lg-pull-7{right:58.33333%}.col-lg-pull-8{right:66.66667%}.col-lg-pull-9{right:75%}.col-lg-pull-10{right:83.33333%}.col-lg-pull-11{right:91.66667%}.col-lg-pull-12{right:100%}.col-lg-push-0{left:auto}.col-lg-push-1{left:8.33333%}.col-lg-push-2{left:16.66667%}.col-lg-push-3{left:25%}.col-lg-push-4{left:33.33333%}.col-lg-push-5{left:41.66667%}.col-lg-push-6{left:50%}.col-lg-push-7{left:58.33333%}.col-lg-push-8{left:66.66667%}.col-lg-push-9{left:75%}.col-lg-push-10{left:83.33333%}.col-lg-push-11{left:91.66667%}.col-lg-push-12{left:100%}.col-lg-offset-0{margin-left:0}.col-lg-offset-1{margin-left:8.33333%}.col-lg-offset-2{margin-left:16.66667%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-4{margin-left:33.33333%}.col-lg-offset-5{margin-left:41.66667%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-7{margin-left:58.33333%}.col-lg-offset-8{margin-left:66.66667%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-10{margin-left:83.33333%}.col-lg-offset-11{margin-left:91.66667%}.col-lg-offset-12{margin-left:100%}}table{background-color:transparent}caption{padding-top:8px;padding-bottom:8px;color:#b4bcc2}caption,th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:21px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857;vertical-align:top;border-top:1px solid #ecf0f1}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ecf0f1}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ecf0f1}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ecf0f1}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover{background-color:#ecf0f1}table col[class*=col-]{position:static;float:none;display:table-column}table td[class*=col-],table th[class*=col-]{position:static;float:none;display:table-cell}.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#ecf0f1}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#dde4e6}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#18bc9c}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#15a589}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#3498db}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#258cd1}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#f39c12}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#e08e0b}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#e74c3c}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#e43725}.table-responsive{overflow-x:auto;min-height:.01%}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15.75px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ecf0f1}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset{margin:0;min-width:0}fieldset,legend{padding:0;border:0}legend{display:block;width:100%;margin-bottom:21px;font-size:22.5px;line-height:inherit;color:#2c3e50;border-bottom:1px solid transparent}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}input[type=search]{-webkit-box-sizing:border-box;box-sizing:border-box}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px\\9;line-height:normal}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=checkbox]:focus,input[type=file]:focus,input[type=radio]:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{padding-top:11px}.form-control,output{display:block;font-size:15px;line-height:1.42857;color:#2c3e50}.form-control{width:100%;height:45px;padding:10px 15px;background-color:#fff;background-image:none;border:1px solid #dce4ec;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out}.form-control:focus{border-color:#2c3e50;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(44,62,80,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(44,62,80,.6)}.form-control::-moz-placeholder{color:#acb6c0;opacity:1}.form-control:-ms-input-placeholder{color:#acb6c0}.form-control::-webkit-input-placeholder{color:#acb6c0}.form-control::-ms-expand{border:0;background-color:transparent}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#ecf0f1;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}input[type=search]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date].form-control,input[type=datetime-local].form-control,input[type=month].form-control,input[type=time].form-control{line-height:45px}.input-group-sm>.input-group-btn>input[type=date].btn,.input-group-sm>.input-group-btn>input[type=datetime-local].btn,.input-group-sm>.input-group-btn>input[type=month].btn,.input-group-sm>.input-group-btn>input[type=time].btn,.input-group-sm>input[type=date].form-control,.input-group-sm>input[type=date].input-group-addon,.input-group-sm>input[type=datetime-local].form-control,.input-group-sm>input[type=datetime-local].input-group-addon,.input-group-sm>input[type=month].form-control,.input-group-sm>input[type=month].input-group-addon,.input-group-sm>input[type=time].form-control,.input-group-sm>input[type=time].input-group-addon,.input-group-sm input[type=date],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],.input-group-sm input[type=time],input[type=date].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm,input[type=time].input-sm{line-height:35px}.input-group-lg>.input-group-btn>input[type=date].btn,.input-group-lg>.input-group-btn>input[type=datetime-local].btn,.input-group-lg>.input-group-btn>input[type=month].btn,.input-group-lg>.input-group-btn>input[type=time].btn,.input-group-lg>input[type=date].form-control,.input-group-lg>input[type=date].input-group-addon,.input-group-lg>input[type=datetime-local].form-control,.input-group-lg>input[type=datetime-local].input-group-addon,.input-group-lg>input[type=month].form-control,.input-group-lg>input[type=month].input-group-addon,.input-group-lg>input[type=time].form-control,.input-group-lg>input[type=time].input-group-addon,.input-group-lg input[type=date],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],.input-group-lg input[type=time],input[type=date].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg,input[type=time].input-lg{line-height:66px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:21px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox-inline input[type=checkbox],.checkbox input[type=checkbox],.radio-inline input[type=radio],.radio input[type=radio]{position:absolute;margin-left:-20px;margin-top:4px\\9}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:400;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}.checkbox-inline.disabled,.checkbox.disabled label,.radio-inline.disabled,.radio.disabled label,fieldset[disabled] .checkbox-inline,fieldset[disabled] .checkbox label,fieldset[disabled] .radio-inline,fieldset[disabled] .radio label,fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.form-control-static{padding-top:11px;padding-bottom:11px;margin-bottom:0;min-height:36px}.form-control-static.input-lg,.form-control-static.input-sm,.input-group-lg>.form-control-static.form-control,.input-group-lg>.form-control-static.input-group-addon,.input-group-lg>.input-group-btn>.form-control-static.btn,.input-group-sm>.form-control-static.form-control,.input-group-sm>.form-control-static.input-group-addon,.input-group-sm>.input-group-btn>.form-control-static.btn{padding-left:0;padding-right:0}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn,.input-sm{height:35px;padding:6px 9px;font-size:13px;line-height:1.5;border-radius:3px}.input-group-sm>.input-group-btn>select.btn,.input-group-sm>select.form-control,.input-group-sm>select.input-group-addon,select.input-sm{height:35px;line-height:35px}.input-group-sm>.input-group-btn>select[multiple].btn,.input-group-sm>.input-group-btn>textarea.btn,.input-group-sm>select[multiple].form-control,.input-group-sm>select[multiple].input-group-addon,.input-group-sm>textarea.form-control,.input-group-sm>textarea.input-group-addon,select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:35px;padding:6px 9px;font-size:13px;line-height:1.5;border-radius:3px}.form-group-sm select.form-control{height:35px;line-height:35px}.form-group-sm select[multiple].form-control,.form-group-sm textarea.form-control{height:auto}.form-group-sm .form-control-static{height:35px;min-height:34px;padding:7px 9px;font-size:13px;line-height:1.5}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn,.input-lg{height:66px;padding:18px 27px;font-size:19px;line-height:1.33333;border-radius:6px}.input-group-lg>.input-group-btn>select.btn,.input-group-lg>select.form-control,.input-group-lg>select.input-group-addon,select.input-lg{height:66px;line-height:66px}.input-group-lg>.input-group-btn>select[multiple].btn,.input-group-lg>.input-group-btn>textarea.btn,.input-group-lg>select[multiple].form-control,.input-group-lg>select[multiple].input-group-addon,.input-group-lg>textarea.form-control,.input-group-lg>textarea.input-group-addon,select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:66px;padding:18px 27px;font-size:19px;line-height:1.33333;border-radius:6px}.form-group-lg select.form-control{height:66px;line-height:66px}.form-group-lg select[multiple].form-control,.form-group-lg textarea.form-control{height:auto}.form-group-lg .form-control-static{height:66px;min-height:40px;padding:19px 27px;font-size:19px;line-height:1.33333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:56.25px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:45px;height:45px;line-height:45px;text-align:center;pointer-events:none}.form-group-lg .form-control+.form-control-feedback,.input-group-lg+.form-control-feedback,.input-group-lg>.form-control+.form-control-feedback,.input-group-lg>.input-group-addon+.form-control-feedback,.input-group-lg>.input-group-btn>.btn+.form-control-feedback,.input-lg+.form-control-feedback{width:66px;height:66px;line-height:66px}.form-group-sm .form-control+.form-control-feedback,.input-group-sm+.form-control-feedback,.input-group-sm>.form-control+.form-control-feedback,.input-group-sm>.input-group-addon+.form-control-feedback,.input-group-sm>.input-group-btn>.btn+.form-control-feedback,.input-sm+.form-control-feedback{width:35px;height:35px;line-height:35px}.has-success .checkbox,.has-success .checkbox-inline,.has-success.checkbox-inline label,.has-success.checkbox label,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.radio-inline label,.has-success.radio label{color:#fff}.has-success .form-control{border-color:#fff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff}.has-success .input-group-addon{color:#fff;border-color:#fff;background-color:#18bc9c}.has-success .form-control-feedback,.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning.checkbox-inline label,.has-warning.checkbox label,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.radio-inline label,.has-warning.radio label{color:#fff}.has-warning .form-control{border-color:#fff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff}.has-warning .input-group-addon{color:#fff;border-color:#fff;background-color:#f39c12}.has-error .checkbox,.has-error .checkbox-inline,.has-error.checkbox-inline label,.has-error.checkbox label,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.radio-inline label,.has-error.radio label,.has-warning .form-control-feedback{color:#fff}.has-error .form-control{border-color:#fff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #fff}.has-error .input-group-addon{color:#fff;border-color:#fff;background-color:#e74c3c}.has-error .form-control-feedback{color:#fff}.has-feedback label~.form-control-feedback{top:26px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#597ea2}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:11px}.form-horizontal .checkbox,.form-horizontal .radio{min-height:32px}.form-horizontal .form-group{margin-left:-15px;margin-right:-15px}.form-horizontal .form-group:after,.form-horizontal .form-group:before{content:\" \";display:table}.form-horizontal .form-group:after{clear:both}@media (min-width:768px){.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:11px}}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:19px;font-size:19px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:7px;font-size:13px}}.btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:10px 15px;font-size:15px;line-height:1.42857;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#fff;text-decoration:none}.btn.active,.btn:active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-default{color:#fff;background-color:#95a5a6;border-color:#95a5a6}.btn-default.focus,.btn-default:focus{color:#fff;background-color:#798d8f;border-color:#566566}.btn-default.active,.btn-default:active,.btn-default:hover,.open>.btn-default.dropdown-toggle{color:#fff;background-color:#798d8f;border-color:#74898a}.btn-default.active.focus,.btn-default.active:focus,.btn-default.active:hover,.btn-default:active.focus,.btn-default:active:focus,.btn-default:active:hover,.open>.btn-default.dropdown-toggle.focus,.open>.btn-default.dropdown-toggle:focus,.open>.btn-default.dropdown-toggle:hover{color:#fff;background-color:#687b7c;border-color:#566566}.btn-default.active,.btn-default:active,.open>.btn-default.dropdown-toggle{background-image:none}.btn-default.disabled.focus,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled].focus,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#95a5a6;border-color:#95a5a6}.btn-default .badge{color:#95a5a6;background-color:#fff}.btn-primary{color:#fff;background-color:#2c3e50;border-color:#2c3e50}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#1a252f;border-color:#000}.btn-primary.active,.btn-primary:active,.btn-primary:hover,.open>.btn-primary.dropdown-toggle{color:#fff;background-color:#1a252f;border-color:#161f29}.btn-primary.active.focus,.btn-primary.active:focus,.btn-primary.active:hover,.btn-primary:active.focus,.btn-primary:active:focus,.btn-primary:active:hover,.open>.btn-primary.dropdown-toggle.focus,.open>.btn-primary.dropdown-toggle:focus,.open>.btn-primary.dropdown-toggle:hover{color:#fff;background-color:#0d1318;border-color:#000}.btn-primary.active,.btn-primary:active,.open>.btn-primary.dropdown-toggle{background-image:none}.btn-primary.disabled.focus,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled].focus,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#2c3e50;border-color:#2c3e50}.btn-primary .badge{color:#2c3e50;background-color:#fff}.btn-success{color:#fff;background-color:#18bc9c;border-color:#18bc9c}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#128f76;border-color:#0a4b3e}.btn-success.active,.btn-success:active,.btn-success:hover,.open>.btn-success.dropdown-toggle{color:#fff;background-color:#128f76;border-color:#11866f}.btn-success.active.focus,.btn-success.active:focus,.btn-success.active:hover,.btn-success:active.focus,.btn-success:active:focus,.btn-success:active:hover,.open>.btn-success.dropdown-toggle.focus,.open>.btn-success.dropdown-toggle:focus,.open>.btn-success.dropdown-toggle:hover{color:#fff;background-color:#0e6f5c;border-color:#0a4b3e}.btn-success.active,.btn-success:active,.open>.btn-success.dropdown-toggle{background-image:none}.btn-success.disabled.focus,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled].focus,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#18bc9c;border-color:#18bc9c}.btn-success .badge{color:#18bc9c;background-color:#fff}.btn-info{color:#fff;background-color:#3498db;border-color:#3498db}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#217dbb;border-color:#16527a}.btn-info.active,.btn-info:active,.btn-info:hover,.open>.btn-info.dropdown-toggle{color:#fff;background-color:#217dbb;border-color:#2077b2}.btn-info.active.focus,.btn-info.active:focus,.btn-info.active:hover,.btn-info:active.focus,.btn-info:active:focus,.btn-info:active:hover,.open>.btn-info.dropdown-toggle.focus,.open>.btn-info.dropdown-toggle:focus,.open>.btn-info.dropdown-toggle:hover{color:#fff;background-color:#1c699d;border-color:#16527a}.btn-info.active,.btn-info:active,.open>.btn-info.dropdown-toggle{background-image:none}.btn-info.disabled.focus,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled].focus,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#3498db;border-color:#3498db}.btn-info .badge{color:#3498db;background-color:#fff}.btn-warning{color:#fff;background-color:#f39c12;border-color:#f39c12}.btn-warning.focus,.btn-warning:focus{color:#fff;background-color:#c87f0a;border-color:#7f5006}.btn-warning.active,.btn-warning:active,.btn-warning:hover,.open>.btn-warning.dropdown-toggle{color:#fff;background-color:#c87f0a;border-color:#be780a}.btn-warning.active.focus,.btn-warning.active:focus,.btn-warning.active:hover,.btn-warning:active.focus,.btn-warning:active:focus,.btn-warning:active:hover,.open>.btn-warning.dropdown-toggle.focus,.open>.btn-warning.dropdown-toggle:focus,.open>.btn-warning.dropdown-toggle:hover{color:#fff;background-color:#a66908;border-color:#7f5006}.btn-warning.active,.btn-warning:active,.open>.btn-warning.dropdown-toggle{background-image:none}.btn-warning.disabled.focus,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled].focus,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f39c12;border-color:#f39c12}.btn-warning .badge{color:#f39c12;background-color:#fff}.btn-danger{color:#fff;background-color:#e74c3c;border-color:#e74c3c}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#d62c1a;border-color:#921e12}.btn-danger.active,.btn-danger:active,.btn-danger:hover,.open>.btn-danger.dropdown-toggle{color:#fff;background-color:#d62c1a;border-color:#cd2a19}.btn-danger.active.focus,.btn-danger.active:focus,.btn-danger.active:hover,.btn-danger:active.focus,.btn-danger:active:focus,.btn-danger:active:hover,.open>.btn-danger.dropdown-toggle.focus,.open>.btn-danger.dropdown-toggle:focus,.open>.btn-danger.dropdown-toggle:hover{color:#fff;background-color:#b62516;border-color:#921e12}.btn-danger.active,.btn-danger:active,.open>.btn-danger.dropdown-toggle{background-image:none}.btn-danger.disabled.focus,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled].focus,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#e74c3c;border-color:#e74c3c}.btn-danger .badge{color:#e74c3c;background-color:#fff}.btn-link{color:#18bc9c;font-weight:400;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#18bc9c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#b4bcc2;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:18px 27px;font-size:19px;line-height:1.33333;border-radius:6px}.btn-group-sm>.btn,.btn-sm{padding:6px 9px;font-size:13px;line-height:1.5;border-radius:3px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:13px;line-height:1.5;border-radius:3px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height,visibility;-o-transition-property:height,visibility;transition-property:height,visibility;-webkit-transition-duration:.35s;-o-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-top:4px solid\\9;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:15px;text-align:left;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);-webkit-background-clip:padding-box;background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857;color:#7b8a8b;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{text-decoration:none;color:#fff;background-color:#2c3e50}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;outline:0;background-color:#2c3e50}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#b4bcc2}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:13px;line-height:1.42857;color:#b4bcc2;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px dashed;border-bottom:4px solid\\9;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:768px){.navbar-right .dropdown-menu{right:0;left:auto}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar:after,.btn-toolbar:before{content:\" \";display:table}.btn-toolbar:after{clear:both}.btn-toolbar .btn,.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group-lg.btn-group>.btn+.dropdown-toggle,.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-group-lg>.btn .caret,.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-group-lg>.btn .caret,.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before{content:\" \";display:table}.btn-group-vertical>.btn-group:after{clear:both}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio],[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group .form-control:focus{z-index:3}.input-group-addon,.input-group-btn,.input-group .form-control{display:table-cell}.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child),.input-group .form-control:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:10px 15px;font-size:15px;font-weight:400;line-height:1;color:#2c3e50;text-align:center;background-color:#ecf0f1;border:1px solid #dce4ec;border-radius:4px}.input-group-addon.input-sm,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.input-group-addon.btn{padding:6px 9px;font-size:13px;border-radius:3px}.input-group-addon.input-lg,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.input-group-addon.btn{padding:18px 27px;font-size:19px;border-radius:6px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group .form-control:first-child{border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle,.input-group .form-control:last-child{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{font-size:0;white-space:nowrap}.input-group-btn,.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{z-index:2;margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav:after,.nav:before{content:\" \";display:table}.nav:after{clear:both}.nav>li,.nav>li>a{position:relative;display:block}.nav>li>a{padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#ecf0f1}.nav>li.disabled>a{color:#b4bcc2}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#b4bcc2;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#ecf0f1;border-color:#18bc9c}.nav .nav-divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ecf0f1}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857;border:1px solid transparent;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover{border-color:#ecf0f1}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#2c3e50;background-color:#fff;border:1px solid #ecf0f1;border-bottom-color:transparent;cursor:default}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:4px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#2c3e50}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified,.nav-tabs.nav-justified{width:100%}.nav-justified>li,.nav-tabs.nav-justified>li{float:none}.nav-justified>li>a,.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li,.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a,.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified,.nav-tabs.nav-justified{border-bottom:0}.nav-tabs-justified>li>a,.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ecf0f1}@media (min-width:768px){.nav-tabs-justified>li>a,.nav-tabs.nav-justified>li>a{border-bottom:1px solid #ecf0f1;border-radius:4px 4px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:60px;margin-bottom:21px;border:1px solid transparent}.navbar:after,.navbar:before{content:\" \";display:table}.navbar:after{clear:both}@media (min-width:768px){.navbar{border-radius:4px}}.navbar-header:after,.navbar-header:before{content:\" \";display:table}.navbar-header:after{clear:both}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 hsla(0,0%,100%,.1);box-shadow:inset 0 1px 0 hsla(0,0%,100%,.1);-webkit-overflow-scrolling:touch}.navbar-collapse:after,.navbar-collapse:before{content:\" \";display:table}.navbar-collapse:after{clear:both}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;-webkit-box-shadow:none;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-left:0;padding-right:0}}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-device-width:480px) and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}@media (min-width:768px){.navbar-fixed-bottom,.navbar-fixed-top{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:19.5px 15px;font-size:19px;line-height:21px;height:60px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}@media (min-width:768px){.navbar>.container-fluid .navbar-brand,.navbar>.container .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:13px;margin-bottom:13px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:4px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:9.75px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:21px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;-webkit-box-shadow:none;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:21px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:19.5px;padding-bottom:19.5px}}.navbar-form{margin:7.5px -15px;padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 hsla(0,0%,100%,.1),0 1px 0 hsla(0,0%,100%,.1);box-shadow:inset 0 1px 0 hsla(0,0%,100%,.1),0 1px 0 hsla(0,0%,100%,.1)}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}@media (min-width:768px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:7.5px;margin-bottom:7.5px}.btn-group-sm>.navbar-btn.btn,.navbar-btn.btn-sm{margin-top:12.5px;margin-bottom:12.5px}.btn-group-xs>.navbar-btn.btn,.navbar-btn.btn-xs{margin-top:19px;margin-bottom:19px}.navbar-text{margin-top:19.5px;margin-bottom:19.5px}@media (min-width:768px){.navbar-text{float:left;margin-left:15px;margin-right:15px}}@media (min-width:768px){.navbar-left{float:left!important}.navbar-right{float:right!important;margin-right:-15px}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#2c3e50;border-color:transparent}.navbar-default .navbar-brand{color:#fff}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#18bc9c;background-color:transparent}.navbar-default .navbar-nav>li>a,.navbar-default .navbar-text{color:#fff}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#18bc9c;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#fff;background-color:#1a252f}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#1a252f}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#1a252f}.navbar-default .navbar-toggle .icon-bar{background-color:#fff}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:transparent}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{background-color:#1a252f;color:#fff}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#fff}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#18bc9c;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#1a252f}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#fff}.navbar-default .navbar-link:hover{color:#18bc9c}.navbar-default .btn-link{color:#fff}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#18bc9c}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#18bc9c;border-color:transparent}.navbar-inverse .navbar-brand{color:#fff}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#2c3e50;background-color:transparent}.navbar-inverse .navbar-nav>li>a,.navbar-inverse .navbar-text{color:#fff}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#2c3e50;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#15a589}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#128f76}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#128f76}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#149c82}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{background-color:#15a589;color:#fff}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#fff}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#2c3e50;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#15a589}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-inverse .navbar-link{color:#fff}.navbar-inverse .navbar-link:hover{color:#2c3e50}.navbar-inverse .btn-link{color:#fff}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#2c3e50}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#ccc}.breadcrumb{padding:8px 15px;margin-bottom:21px;list-style:none;background-color:#ecf0f1;border-radius:4px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:\"/\\A0\";padding:0 5px;color:#ccc}.breadcrumb>.active{color:#95a5a6}.pagination{display:inline-block;padding-left:0;margin:21px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:10px 15px;line-height:1.42857;text-decoration:none;color:#fff;background-color:#18bc9c;border:1px solid transparent;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:4px;border-top-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:4px;border-top-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{z-index:2;color:#fff;background-color:#0f7864;border-color:transparent}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:3;color:#fff;background-color:#0f7864;border-color:transparent;cursor:default}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#ecf0f1;background-color:#3be6c4;border-color:transparent;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:18px 27px;font-size:19px;line-height:1.33333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:6px;border-top-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:6px;border-top-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:6px 9px;font-size:13px;line-height:1.5}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}.pager{padding-left:0;margin:21px 0;list-style:none;text-align:center}.pager:after,.pager:before{content:\" \";display:table}.pager:after{clear:both}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#18bc9c;border:1px solid transparent;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#0f7864}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#fff;background-color:#18bc9c;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}.label:empty{display:none}.btn .label{position:relative;top:-1px}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label-default{background-color:#95a5a6}.label-default[href]:focus,.label-default[href]:hover{background-color:#798d8f}.label-primary{background-color:#2c3e50}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#1a252f}.label-success{background-color:#18bc9c}.label-success[href]:focus,.label-success[href]:hover{background-color:#128f76}.label-info{background-color:#3498db}.label-info[href]:focus,.label-info[href]:hover{background-color:#217dbb}.label-warning{background-color:#f39c12}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#c87f0a}.label-danger{background-color:#e74c3c}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#d62c1a}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:13px;font-weight:700;color:#fff;line-height:1;vertical-align:middle;white-space:nowrap;text-align:center;background-color:#2c3e50;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#2c3e50;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.jumbotron{padding-top:30px;padding-bottom:30px;margin-bottom:30px;background-color:#ecf0f1}.jumbotron,.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:23px;font-weight:200}.jumbotron>hr{border-top-color:#cfd9db}.container-fluid .jumbotron,.container .jumbotron{border-radius:6px;padding-left:15px;padding-right:15px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container-fluid .jumbotron,.container .jumbotron{padding-left:60px;padding-right:60px}.jumbotron .h1,.jumbotron h1{font-size:68px}}.thumbnail{display:block;padding:4px;margin-bottom:21px;line-height:1.42857;background-color:#fff;border:1px solid #ecf0f1;border-radius:4px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail>img,.thumbnail a>img{display:block;max-width:100%;height:auto;margin-left:auto;margin-right:auto}.thumbnail .caption{padding:9px;color:#2c3e50}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#18bc9c}.alert{padding:15px;margin-bottom:21px;border:1px solid transparent;border-radius:4px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#18bc9c;border-color:#18bc9c;color:#fff}.alert-success hr{border-top-color:#15a589}.alert-success .alert-link{color:#e6e6e6}.alert-info{background-color:#3498db;border-color:#3498db;color:#fff}.alert-info hr{border-top-color:#258cd1}.alert-info .alert-link{color:#e6e6e6}.alert-warning{background-color:#f39c12;border-color:#f39c12;color:#fff}.alert-warning hr{border-top-color:#e08e0b}.alert-warning .alert-link{color:#e6e6e6}.alert-danger{background-color:#e74c3c;border-color:#e74c3c;color:#fff}.alert-danger hr{border-top-color:#e43725}.alert-danger .alert-link{color:#e6e6e6}@-webkit-keyframes progress-bar-stripes{0%{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{0%{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{0%{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:21px;margin-bottom:21px;background-color:#ecf0f1;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:13px;line-height:21px;color:#fff;text-align:center;background-color:#2c3e50;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-image:-o-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 25%,transparent 50%,hsla(0,0%,100%,.15) 50%,hsla(0,0%,100%,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#18bc9c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-image:-o-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 25%,transparent 50%,hsla(0,0%,100%,.15) 50%,hsla(0,0%,100%,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)}.progress-bar-info{background-color:#3498db}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-image:-o-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 25%,transparent 50%,hsla(0,0%,100%,.15) 50%,hsla(0,0%,100%,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)}.progress-bar-warning{background-color:#f39c12}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-image:-o-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 25%,transparent 50%,hsla(0,0%,100%,.15) 50%,hsla(0,0%,100%,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)}.progress-bar-danger{background-color:#e74c3c}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-image:-o-linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 25%,transparent 50%,hsla(0,0%,100%,.15) 50%,hsla(0,0%,100%,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{zoom:1;overflow:hidden}.media-body{width:10000px}.media-object{display:block}.media-object.img-thumbnail{max-width:none}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ecf0f1}.list-group-item:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item,button.list-group-item{color:#555}a.list-group-item .list-group-item-heading,button.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover,button.list-group-item:focus,button.list-group-item:hover{text-decoration:none;color:#555;background-color:#ecf0f1}button.list-group-item{width:100%;text-align:left}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{background-color:#ecf0f1;color:#b4bcc2;cursor:not-allowed}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#b4bcc2}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#2c3e50;border-color:#2c3e50}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#8aa4be}.list-group-item-success{color:#fff;background-color:#18bc9c}a.list-group-item-success,button.list-group-item-success{color:#fff}a.list-group-item-success .list-group-item-heading,button.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover,button.list-group-item-success:focus,button.list-group-item-success:hover{color:#fff;background-color:#15a589}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover,button.list-group-item-success.active,button.list-group-item-success.active:focus,button.list-group-item-success.active:hover{color:#fff;background-color:#fff;border-color:#fff}.list-group-item-info{color:#fff;background-color:#3498db}a.list-group-item-info,button.list-group-item-info{color:#fff}a.list-group-item-info .list-group-item-heading,button.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover,button.list-group-item-info:focus,button.list-group-item-info:hover{color:#fff;background-color:#258cd1}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover,button.list-group-item-info.active,button.list-group-item-info.active:focus,button.list-group-item-info.active:hover{color:#fff;background-color:#fff;border-color:#fff}.list-group-item-warning{color:#fff;background-color:#f39c12}a.list-group-item-warning,button.list-group-item-warning{color:#fff}a.list-group-item-warning .list-group-item-heading,button.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover,button.list-group-item-warning:focus,button.list-group-item-warning:hover{color:#fff;background-color:#e08e0b}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover,button.list-group-item-warning.active,button.list-group-item-warning.active:focus,button.list-group-item-warning.active:hover{color:#fff;background-color:#fff;border-color:#fff}.list-group-item-danger{color:#fff;background-color:#e74c3c}a.list-group-item-danger,button.list-group-item-danger{color:#fff}a.list-group-item-danger .list-group-item-heading,button.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover,button.list-group-item-danger:focus,button.list-group-item-danger:hover{color:#fff;background-color:#e43725}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover,button.list-group-item-danger.active,button.list-group-item-danger.active:focus,button.list-group-item-danger.active:hover{color:#fff;background-color:#fff;border-color:#fff}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:21px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-body:after,.panel-body:before{content:\" \";display:table}.panel-body:after{clear:both}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:3px;border-top-left-radius:3px}.panel-heading>.dropdown .dropdown-toggle,.panel-title{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:17px}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#ecf0f1;border-top:1px solid #ecf0f1;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:3px;border-top-left-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child{border-top-right-radius:0;border-top-left-radius:0}.list-group+.panel-footer,.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel>.panel-collapse>.table caption,.panel>.table-responsive>.table caption,.panel>.table caption{padding-left:15px;padding-right:15px}.panel>.table-responsive:first-child>.table:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-right-radius:3px;border-top-left-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:3px}.panel>.table-responsive:last-child>.table:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ecf0f1}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:21px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ecf0f1}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ecf0f1}.panel-default{border-color:#ecf0f1}.panel-default>.panel-heading{color:#2c3e50;background-color:#ecf0f1;border-color:#ecf0f1}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ecf0f1}.panel-default>.panel-heading .badge{color:#ecf0f1;background-color:#2c3e50}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ecf0f1}.panel-primary{border-color:#2c3e50}.panel-primary>.panel-heading{color:#fff;background-color:#2c3e50;border-color:#2c3e50}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#2c3e50}.panel-primary>.panel-heading .badge{color:#2c3e50;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#2c3e50}.panel-success{border-color:#18bc9c}.panel-success>.panel-heading{color:#fff;background-color:#18bc9c;border-color:#18bc9c}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#18bc9c}.panel-success>.panel-heading .badge{color:#18bc9c;background-color:#fff}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#18bc9c}.panel-info{border-color:#3498db}.panel-info>.panel-heading{color:#fff;background-color:#3498db;border-color:#3498db}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#3498db}.panel-info>.panel-heading .badge{color:#3498db;background-color:#fff}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#3498db}.panel-warning{border-color:#f39c12}.panel-warning>.panel-heading{color:#fff;background-color:#f39c12;border-color:#f39c12}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#f39c12}.panel-warning>.panel-heading .badge{color:#f39c12;background-color:#fff}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#f39c12}.panel-danger{border-color:#e74c3c}.panel-danger>.panel-heading{color:#fff;background-color:#e74c3c;border-color:#e74c3c}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#e74c3c}.panel-danger>.panel-heading .badge{color:#e74c3c;background-color:#fff}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#e74c3c}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#ecf0f1;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:6px}.well-sm{padding:9px;border-radius:3px}.close{float:right;font-size:22.5px;font-weight:700;line-height:1;color:#000;text-shadow:none;opacity:.2;filter:alpha(opacity=20)}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.card{position:relative;display:block;margin-bottom:21px;background-color:#fff;border:1px solid #ecf0f1;border-radius:4px}.card-block{padding:15px}.card-block:after,.card-block:before{content:\" \";display:table}.card-block:after{clear:both}.card-title{margin-top:0;margin-bottom:10.5px}.card-subtitle{margin-top:-10.5px}.card-subtitle,.card-text:last-child{margin-bottom:0}.card-link:hover{text-decoration:none}.card-link+.card-link{margin-left:15px}.card>.list-group:first-child .list-group-item:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.card>.list-group:last-child .list-group-item:last-child{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.card-header{padding:10px 15px;background-color:#ecf0f1;border-bottom:1px solid #ecf0f1}.card-header:after,.card-header:before{content:\" \";display:table}.card-header:after{clear:both}.card-header:first-child{border-radius:4px 4px 0 0}.card-footer{padding:10px 15px;background-color:#ecf0f1;border-top:1px solid #ecf0f1}.card-footer:after,.card-footer:before{content:\" \";display:table}.card-footer:after{clear:both}.card-footer:last-child{border-radius:0 0 4px 4px}.card-header-tabs{margin-bottom:-10px;border-bottom:0}.card-header-pills,.card-header-tabs{margin-right:-5px;margin-left:-5px}.card-primary{background-color:#2c3e50;border-color:#2c3e50}.card-primary .card-footer,.card-primary .card-header{background-color:transparent}.card-success{background-color:#18bc9c;border-color:#18bc9c}.card-success .card-footer,.card-success .card-header{background-color:transparent}.card-info{background-color:#3498db;border-color:#3498db}.card-info .card-footer,.card-info .card-header{background-color:transparent}.card-warning{background-color:#f39c12;border-color:#f39c12}.card-warning .card-footer,.card-warning .card-header{background-color:transparent}.card-danger{background-color:#e74c3c;border-color:#e74c3c}.card-danger .card-footer,.card-danger .card-header,.card-outline-primary{background-color:transparent}.card-outline-primary{border-color:#2c3e50}.card-outline-secondary{background-color:transparent;border-color:#95a5a6}.card-outline-info{background-color:transparent;border-color:#3498db}.card-outline-success{background-color:transparent;border-color:#18bc9c}.card-outline-warning{background-color:transparent;border-color:#f39c12}.card-outline-danger{background-color:transparent;border-color:#e74c3c}.card-inverse .card-footer,.card-inverse .card-header{border-color:hsla(0,0%,100%,.2)}.card-inverse .card-blockquote,.card-inverse .card-footer,.card-inverse .card-header,.card-inverse .card-title{color:#fff}.card-inverse .card-blockquote .blockquote-footer,.card-inverse .card-link,.card-inverse .card-subtitle,.card-inverse .card-text{color:hsla(0,0%,100%,.65)}.card-inverse .card-link:focus,.card-inverse .card-link:hover{color:#fff}.card-blockquote{padding:0;margin-bottom:0;border-left:0}.card-img{border-radius:.25em}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:15px}.card-img-top{border-top-right-radius:4px;border-top-left-radius:4px}.card-img-bottom{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.modal,.modal-open{overflow:hidden}.modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translateY(-25%);-ms-transform:translateY(-25%);-o-transform:translateY(-25%);transform:translateY(-25%);-webkit-transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:-webkit-transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out,-o-transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0);-ms-transform:translate(0);-o-transform:translate(0);transform:translate(0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);-webkit-background-clip:padding-box;background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header:after,.modal-header:before{content:\" \";display:table}.modal-header:after{clear:both}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857}.modal-body{position:relative;padding:20px}.modal-footer{padding:20px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer:after,.modal-footer:before{content:\" \";display:table}.modal-footer:after{clear:both}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:Lato,Helvetica Neue,Helvetica,Arial,sans-serif;font-style:normal;font-weight:400;letter-spacing:normal;line-break:auto;line-height:1.42857;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:normal;font-size:13px;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;background-color:#000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{right:5px}.tooltip.top-left .tooltip-arrow,.tooltip.top-right .tooltip-arrow{bottom:0;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{left:5px}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:Lato,Helvetica Neue,Helvetica,Arial,sans-serif;font-style:normal;font-weight:400;letter-spacing:normal;line-break:auto;line-height:1.42857;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:normal;font-size:15px;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2)}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:15px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:\"\"}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#999;border-top-color:fadein(rgba(0,0,0,.2),5%);bottom:-11px}.popover.top>.arrow:after{content:\" \";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#fff}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#999;border-right-color:fadein(rgba(0,0,0,.2),5%)}.popover.right>.arrow:after{content:\" \";left:1px;bottom:-10px;border-left-width:0;border-right-color:#fff}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:fadein(rgba(0,0,0,.2),5%);top:-11px}.popover.bottom>.arrow:after{content:\" \";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:fadein(rgba(0,0,0,.2),5%)}.popover.left>.arrow:after{content:\" \";right:1px;border-right-width:0;border-left-color:#fff;bottom:-10px}.carousel,.carousel-inner{position:relative}.carousel-inner{overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:left .6s ease-in-out;-o-transition:.6s ease-in-out left;transition:left .6s ease-in-out}.carousel-inner>.item>a>img,.carousel-inner>.item>img{display:block;max-width:100%;height:auto;line-height:1}@media (-webkit-transform-3d),(transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:-webkit-transform .6s ease-in-out;transition:transform .6s ease-in-out;transition:transform .6s ease-in-out,-webkit-transform .6s ease-in-out,-o-transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px}.carousel-inner>.item.active.right,.carousel-inner>.item.next{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);left:0}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);left:0}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{-webkit-transform:translateZ(0);transform:translateZ(0);left:0}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:.5;filter:alpha(opacity=50);font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6);background-color:transparent}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,.0001));background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,.0001)));background-image:linear-gradient(90deg,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001));background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#80000000\",endColorstr=\"#00000000\",GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001),rgba(0,0,0,.5));background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.0001)),to(rgba(0,0,0,.5)));background-image:linear-gradient(90deg,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5));background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00000000\",endColorstr=\"#80000000\",GradientType=1)}.carousel-control:focus,.carousel-control:hover{outline:0;color:#fff;text-decoration:none;opacity:.9;filter:alpha(opacity=90)}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;margin-top:-10px;z-index:5;display:inline-block}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;line-height:1;font-family:serif}.carousel-control .icon-prev:before{content:\"\\2039\"}.carousel-control .icon-next:before{content:\"\\203A\"}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #fff;border-radius:10px;cursor:pointer;background-color:#000\\9;background-color:transparent}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#fff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-10px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-10px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.clearfix:after,.clearfix:before{content:\" \";display:table}.clearfix:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table!important}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}}@media (max-width:767px){.visible-xs-block{display:block!important}}@media (max-width:767px){.visible-xs-inline{display:inline!important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table!important}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table!important}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table!important}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}}@media (min-width:1200px){.visible-lg-block{display:block!important}}@media (min-width:1200px){.visible-lg-inline{display:inline!important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table!important}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}}@media print{.hidden-print{display:none!important}}.navbar{border-width:0}.navbar-default .badge{background-color:#fff;color:#2c3e50}.navbar-inverse .badge{background-color:#fff;color:#18bc9c}.navbar-brand{line-height:1}.btn{border-width:2px}.btn-group.open .dropdown-toggle,.btn:active{-webkit-box-shadow:none;box-shadow:none}.text-primary,.text-primary:hover{color:#2c3e50}.text-success,.text-success:hover{color:#18bc9c}.text-danger,.text-danger:hover{color:#e74c3c}.text-warning,.text-warning:hover{color:#f39c12}.text-info,.text-info:hover{color:#3498db}.table a:not(.btn),table a:not(.btn){text-decoration:underline}.table .dropdown-menu a,table .dropdown-menu a{text-decoration:none}.table .danger,.table .danger>a,.table .danger>td>a,.table .danger>th>a,.table .info,.table .info>a,.table .info>td>a,.table .info>th>a,.table .success,.table .success>a,.table .success>td>a,.table .success>th>a,.table .warning,.table .warning>a,.table .warning>td>a,.table .warning>th>a,table .danger,table .danger>a,table .danger>td>a,table .danger>th>a,table .info,table .info>a,table .info>td>a,table .info>th>a,table .success,table .success>a,table .success>td>a,table .success>th>a,table .warning,table .warning>a,table .warning>td>a,table .warning>th>a{color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th,table>tbody>tr>td,table>tbody>tr>th,table>tfoot>tr>td,table>tfoot>tr>th,table>thead>tr>td,table>thead>tr>th{border:none}.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th,table-bordered>tbody>tr>td,table-bordered>tbody>tr>th,table-bordered>tfoot>tr>td,table-bordered>tfoot>tr>th,table-bordered>thead>tr>td,table-bordered>thead>tr>th{border:1px solid #ecf0f1}.form-control,input{border-width:2px}.form-control,.form-control:focus,input,input:focus{-webkit-box-shadow:none;box-shadow:none}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning.checkbox-inline label,.has-warning.checkbox label,.has-warning .control-label,.has-warning .form-control-feedback,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.radio-inline label,.has-warning.radio label{color:#f39c12}.has-warning .form-control,.has-warning .form-control:focus{border:2px solid #f39c12}.has-warning .input-group-addon{border-color:#f39c12}.has-error .checkbox,.has-error .checkbox-inline,.has-error.checkbox-inline label,.has-error.checkbox label,.has-error .control-label,.has-error .form-control-feedback,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.radio-inline label,.has-error.radio label{color:#e74c3c}.has-error .form-control,.has-error .form-control:focus{border:2px solid #e74c3c}.has-error .input-group-addon{border-color:#e74c3c}.has-success .checkbox,.has-success .checkbox-inline,.has-success.checkbox-inline label,.has-success.checkbox label,.has-success .control-label,.has-success .form-control-feedback,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.radio-inline label,.has-success.radio label{color:#18bc9c}.has-success .form-control,.has-success .form-control:focus{border:2px solid #18bc9c}.has-success .input-group-addon{border-color:#18bc9c}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{border-color:transparent}.pager a,.pager a:hover{color:#fff}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{background-color:#3be6c4}.close{color:#fff;text-decoration:none;opacity:.4}.close:focus,.close:hover{color:#fff;opacity:1}.alert .alert-link{color:#fff;text-decoration:underline}.progress{height:10px;-webkit-box-shadow:none;box-shadow:none}.progress .progress-bar{font-size:10px;line-height:10px}.well{-webkit-box-shadow:none;box-shadow:none}a.list-group-item.active,a.list-group-item.active:focus,a.list-group-item.active:hover{border-color:#ecf0f1}a.list-group-item-success.active{background-color:#18bc9c}a.list-group-item-success.active:focus,a.list-group-item-success.active:hover{background-color:#15a589}a.list-group-item-warning.active{background-color:#f39c12}a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover{background-color:#e08e0b}a.list-group-item-danger.active{background-color:#e74c3c}a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover{background-color:#e43725}.modal .close,.panel-default .close,.popover{color:#2c3e50}.navbar{margin-bottom:0}", ""]);
  
  // exports


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(94)();
  // imports
  
  
  // module
  exports.push([module.id, ".toast-title{font-weight:700}.toast-message{-ms-word-wrap:break-word;word-wrap:break-word}.toast-message a,.toast-message label{color:#fff}.toast-message a:hover{color:#ccc;text-decoration:none}.toast-close-button{position:relative;right:-.3em;top:-.3em;float:right;font-size:20px;font-weight:700;color:#fff;-webkit-text-shadow:0 1px 0 #fff;text-shadow:0 1px 0 #fff;opacity:.8;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);filter:alpha(opacity=80);line-height:1}.toast-close-button:focus,.toast-close-button:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.4;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=40);filter:alpha(opacity=40)}.rtl .toast-close-button{left:-.3em;float:left;right:.3em}button.toast-close-button{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.toast-top-center{top:0;right:0;width:100%}.toast-bottom-center{bottom:0;right:0;width:100%}.toast-top-full-width{top:0;right:0;width:100%}.toast-bottom-full-width{bottom:0;right:0;width:100%}.toast-top-left{top:12px;left:12px}.toast-top-right{top:12px;right:12px}.toast-bottom-right{right:12px;bottom:12px}.toast-bottom-left{bottom:12px;left:12px}#toast-container{position:fixed;z-index:999999;pointer-events:none}#toast-container *{-webkit-box-sizing:border-box;box-sizing:border-box}#toast-container>div{position:relative;pointer-events:auto;overflow:hidden;margin:0 0 6px;padding:15px 15px 15px 50px;width:300px;border-radius:3px;background-position:15px;background-repeat:no-repeat;-webkit-box-shadow:0 0 12px #999;box-shadow:0 0 12px #999;color:#fff;opacity:.8;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);filter:alpha(opacity=80)}#toast-container>div.rtl{direction:rtl;padding:15px 50px 15px 15px;background-position:right 15px center}#toast-container>div:hover{-webkit-box-shadow:0 0 12px #000;box-shadow:0 0 12px #000;opacity:1;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);filter:alpha(opacity=100);cursor:pointer}#toast-container>.toast-info{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=)!important}#toast-container>.toast-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)!important}#toast-container>.toast-success{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)!important}#toast-container>.toast-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=)!important}#toast-container.toast-bottom-center>div,#toast-container.toast-top-center>div{width:300px;margin-left:auto;margin-right:auto}#toast-container.toast-bottom-full-width>div,#toast-container.toast-top-full-width>div{width:96%;margin-left:auto;margin-right:auto}.toast{background-color:#030303}.toast-success{background-color:#51a351}.toast-error{background-color:#bd362f}.toast-info{background-color:#2f96b4}.toast-warning{background-color:#f89406}.toast-progress{position:absolute;left:0;bottom:0;height:4px;background-color:#000;opacity:.4;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=40);filter:alpha(opacity=40)}@media (max-width:240px){#toast-container>div{padding:8px 8px 8px 50px;width:11em}#toast-container>div.rtl{padding:8px 50px 8px 8px}#toast-container .toast-close-button{right:-.2em;top:-.2em}#toast-container .rtl .toast-close-button{left:-.2em;right:.2em}}@media (min-width:241px) and (max-width:480px){#toast-container>div{padding:8px 8px 8px 50px;width:18em}#toast-container>div.rtl{padding:8px 50px 8px 8px}#toast-container .toast-close-button{right:-.2em;top:-.2em}#toast-container .rtl .toast-close-button{left:-.2em;right:.2em}}@media (min-width:481px) and (max-width:768px){#toast-container>div{padding:15px 15px 15px 50px;width:25em}#toast-container>div.rtl{padding:15px 50px 15px 15px}}html{min-height:100%;margin:0}body{min-width:320px;background-color:#eee}#root,#root>*,body{height:100%;min-height:100vh}#root,#root>*{-webkit-box-sizing:border-box;box-sizing:border-box}", ""]);
  
  // exports


/***/ },
/* 202 */
/***/ function(module, exports) {

  module.exports = "<!—- Yandex.Metrika counter --> <script type=\"text/javascript\"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.counter.add(\"yandex\", new Ya.Metrika({\"id\":34970175,\"clickmap\":true,\"trackLinks\":true,\"accurateTrackBounce\":true,\"webvisor\":true,\"trackHash\":true})); } catch(e) { } }); var n = d.getElementsByTagName(\"script\")[0], s = d.createElement(\"script\"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = \"text/javascript\"; s.async = true; s.src = \"https://mc.yandex.ru/metrika/watch.js\"; if (w.opera == \"[object Opera]\") { d.addEventListener(\"DOMContentLoaded\", f, false); } else { f(); } })(document, window, \"yandex_metrika_callbacks\"); </script> <noscript><div><img src=\"https://mc.yandex.ru/watch/34970175\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript> <!-- /Yandex.Metrika counter -->\n<!—- Google counter --> <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');  ga('create', 'UA-51665590-2', 'auto');  ga('send', 'pageview');</script> <!—- /Google counter -—>\n<!-- Yandex.Metrika counter --> <script type=\"text/javascript\"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter26302521 = new Ya.Metrika({ id:26302521, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName(\"script\")[0], s = d.createElement(\"script\"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = \"text/javascript\"; s.async = true; s.src = \"https://mc.yandex.ru/metrika/watch.js\"; if (w.opera == \"[object Opera]\") { d.addEventListener(\"DOMContentLoaded\", f, false); } else { f(); } })(document, window, \"yandex_metrika_callbacks\");</script><noscript><div><img src=\"https://mc.yandex.ru/watch/26302521\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript> <!-- /Yandex.Metrika counter -->\n"

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _config = __webpack_require__(8);
  
  var _config2 = _interopRequireDefault(_config);
  
  var _config3 = __webpack_require__(7);
  
  var _config4 = _interopRequireDefault(_config3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = _config2.default.server(_config4.default, {
    client: __webpack_require__(124).default, // eslint-disable-line
  
    env: ("development") || process.env.ENV || 'development',
    port: process.env.PORT || 8080,
  
    protocol: 'https',
    db: {
      uri: process.env.DB || 'mongodb://lsk-example1:lsk-example1-pass@publicdb.mgbeta.ru:27000/lsk-example1'
    },
    jwt: {
      secret: 'nobodyknows'
    }
  });

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map