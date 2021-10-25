"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _qs = _interopRequireDefault(require("qs"));

var _axios2 = _interopRequireDefault(require("axios"));

var _socket = _interopRequireDefault(require("./socket.io-client"));

var _trim = _interopRequireDefault(require("./trim"));

var _excluded = ["__cancelToken"],
    _excluded2 = ["data"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AXIOS_PARAMS = ['url', 'method', 'baseURL', 'transformRequest', 'transformResponse', 'headers', 'params', 'paramsSerializer', 'data', 'timeout', 'withCredentials', 'adapter', 'auth', 'responseType', 'responseEncoding', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'socketPath', 'httpAgent', 'httpsAgent', 'proxy', '__cancelToken'];

function ioMock() {
  // __DEV__ && console.log('ioMock', ...initParams);
  // const socket = io(...params)
  var mock = {
    Manager: _socket["default"].Manager,
    Socket: _socket["default"].Socket,
    connection: null,
    events: [],
    on: function on() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      mock.events.push(['on'].concat(params));
    },
    use: function use() {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      mock.events.push(['use'].concat(params));
    },
    disconnect: function disconnect() {
      var _mock$connection;

      (_mock$connection = mock.connection).disconnect.apply(_mock$connection, arguments);
    },
    recreateSocket: function recreateSocket() {
      // __DEV__ && console.log('recreateSocket', ...newInitParams);
      if (mock.connection && mock.connection.disconnect) {
        mock.connection.disconnect();
      }

      mock.connection = _socket["default"].apply(void 0, arguments);
      mock.events.forEach(function (event) {
        var _mock$connection2;

        var _event = (0, _toArray2["default"])(event),
            name = _event[0],
            params = _event.slice(1);

        (_mock$connection2 = mock.connection)[name].apply(_mock$connection2, (0, _toConsumableArray2["default"])(params));
      });

      mock.connection.recreateSocket = function () {
        return (// __DEV__ && console.log('recreateSocket2', ...newInitParams2);
          mock.recreateSocket.apply(mock, arguments)
        );
      }; // __DEV__ && console.log('recreateConnection');


      return mock.connection;
    }
  };
  return mock.recreateSocket.apply(mock, arguments);
} // const DEBUG = __DEV__;


var Apiquery = /*#__PURE__*/function () {
  // io = io
  function Apiquery() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Apiquery);
    // console.log('ApiClient', params);
    this.io = ioMock;
    this.log = params.log;
    this.root = params.root;
    this.base = params.base;
    this.headers = params.headers || {};
    this.url = params.url;
    this.wsConfig = params.ws;
    this.wsConnections = {};
    this.authToken = params.authToken || null;
  }

  (0, _createClass2["default"])(Apiquery, [{
    key: "setAuthToken",
    value: function setAuthToken(authToken) {
      this.authToken = authToken;
      this.wsReconnect();
    } // static createReq(req) {
    //   // req.path,
    //   // req.query,
    //   return {
    //     ...req,
    //     create(params) {
    //       const query = this.qs.stringify(params);
    //       return (this.path || '/') + (query ? `?${query}` : '');
    //     },
    //     merge(params) {
    //       return this.create({
    //         ...this.query,
    //         ...params,
    //       });
    //     },
    //   };
    // }

  }, {
    key: "catchError",
    value: function catchError(err) {
      var _ref = err.response || {},
          data = _ref.data; // if (true) {


      if (this.showError && this.log) {
        var str = "==============\n  fetch error:\n".concat((0, _isPlainObject["default"])(err) ? JSON.stringify(err, null, 2) : err, "\n  request:\n").concat(JSON.stringify(JSON.parse(err.config.data), null, 2), "\n  response:\n").concat(JSON.stringify(data, null, 2), "\n=============="); // console.log(str);

        this.log.error(str);
      }

      if (data && data.message) {
        // eslint-disable-next-line no-param-reassign
        err.message = data.message;
      }

      if (data && data.code) {
        // eslint-disable-next-line no-param-reassign
        err.code = data.code;
      } // if (data.status) {
      //   err.status = data.status;
      // }


      throw err;
    }
  }, {
    key: "createUrl",
    value: function createUrl(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
        return path;
      }

      var url = options.url || this.url || '/';
      var port = options.port || this.port || null;

      if (url && url.length > 1 && port) {
        if (url.search(/:(\d+)/) !== -1) {
          url = url.replace(/:(\d+)/, ":".concat(port));
        } else {
          url = "".concat(url, ":").concat(port);
        }
      }

      var base = options.base || this.base;
      var array = [url, path[0] === '/' ? null : (0, _trim["default"])(base), (0, _trim["default"])(path)];
      url = array.map(function (a) {
        return (0, _trim["default"])(a);
      }).filter(function (a, i) {
        return i === 0 || a;
      }).join('/');

      if (options.qs) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + this.constructor.qs.stringify(options.qs);
      }

      return url;
    }
  }, {
    key: "getCtx",
    value: function getCtx(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var data = params.data || params.body;

      var req = _objectSpread(_objectSpread({
        url: url,
        headers: _objectSpread({}, this.headers)
      }, (0, _pick["default"])(params, AXIOS_PARAMS)), {}, {
        data: data
      });

      if (!req.headers) req.headers = {};
      if (!req.headers.Accept) req.headers.Accept = 'application/json';
      if (!req.headers['Content-Type']) req.headers['Content-Type'] = 'application/json; charset=utf-8';

      if (req.headers['Content-Type'] === '!') {
        delete req.headers['Content-Type'];
      } // req._body = body;
      // req.body = body;
      // if (isPlainObject(body)) {
      //   if (req.headers['Content-Type'] && req.headers['Content-Type'].includes('application/json')) {
      //     req.body = JSON.stringify(body);
      //   } else {
      //     const form = new FormData();
      //     Object.keys(body).forEach((key) => {
      //       form.append(key, body[key]);
      //     });
      //     req.body = form;
      //   }
      // }


      var authToken = params.authToken || this.authToken;

      if (!req.headers.Authorization && authToken) {
        req.headers.Authorization = "Bearer ".concat(authToken);
      }

      req.qs = params.queryParams || params.qs;

      if (req.qs) {
        req.url += (req.url.indexOf('?') === -1 ? '?' : '&') + this.constructor.qs.stringify(req.qs);
      }

      req.url = this.createUrl(req.url);

      if (!req.method) {
        req.method = 'GET';
      }

      var catchError = params.catchError || this.catchError;
      var afterFetch = params.afterFetch || this.afterFetch;
      var parseResult = params.parseResult || this.parseResult;
      var timeout = params.timeout;
      return {
        req: req,
        timeout: timeout,
        authToken: authToken,
        catchError: catchError,
        afterFetch: afterFetch,
        parseResult: parseResult
      };
    }
  }, {
    key: "parseResult",
    value: function parseResult(res) {
      return res.data;
    }
  }, {
    key: "fetch",
    value: function fetch() {
      var ctx = this.getCtx.apply(this, arguments);
      var _axios = this.constructor.axios;
      var req = ctx.req,
          parseResult = ctx.parseResult,
          catchError = ctx.catchError;
      var _req$data = req.data;
      _req$data = _req$data === void 0 ? {} : _req$data;
      var __cancelToken = _req$data.__cancelToken,
          data = (0, _objectWithoutProperties2["default"])(_req$data, _excluded),
          params = (0, _objectWithoutProperties2["default"])(req, _excluded2);

      if (this.log && this.log.trace) {
        this.log.trace('[api]', req.method, req.url, req._body); // this.log.trace('[api]', req.method, req.url, req._body, req);
      }

      params.data = data;
      var params2 = {};

      if (__cancelToken && __cancelToken.token) {
        params.cancelToken = __cancelToken.token;
      }

      var res = _axios(params, params2).then(parseResult)["catch"](catchError.bind(this));

      return res;
    }
  }, {
    key: "wsReconnect",
    value: function wsReconnect() {
      var _this = this;

      if (this.log && this.log.trace) {
        this.log.trace('[api] WS.wsReconnect ###', Object.keys(this.wsConnections));
      }

      Object.keys(this.wsConnections).forEach(function (key) {
        var _this$wsConnections$k = (0, _slicedToArray2["default"])(_this.wsConnections[key], 3),
            path = _this$wsConnections$k[0],
            options = _this$wsConnections$k[1],
            socket = _this$wsConnections$k[2]; // __DEV__ && this.log.trace('[api] prepare reconnect @@', socket);
        // // __DEV__ && console.log('prepare reconnect @@', socket);
        // if (!socket.recreateSocket) {
        //   // __DEV__ && console.log('!socket.recreateSocket', socket);
        // }


        socket.recreateSocket(path, options); // socket.disconnect();
        // this.ws(path, options);
      });
    }
  }, {
    key: "ws",
    value: function ws() {
      var _this2 = this;

      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // console.log('api.ws', path)
      var key = path + JSON.stringify(options);
      if (this.wsConnections[key]) return this.wsConnections[key];

      if (!this.wsConfig) {
        console.error('Вы не можете использовать api.ws без сокет конфигов'); // eslint-disable-line no-console

        return null;
      }

      var opts = _objectSpread(_objectSpread({}, this.wsConfig && this.wsConfig.options), options); // console.log('WS WS WS',
      //   {
      //     q: this.wsConfig && this.wsConfig.options,
      //     w: options,
      //     e: opts,
      //     r: Object.assign({}, this.wsConfig && this.wsConfig.options, options)
      //   }
      // );
      // console.log(opts.query, opts.query.token, this.authToken);


      if (!(this.wsConfig && this.wsConfig.tokenInCookie)) {
        if (opts.query && !opts.query.token && this.authToken) opts.query.token = this.authToken;
      }

      var params2 = {};

      if (!this.wsConfig.tokenInCookie) {
        if (!params2.qs) {
          params2.qs = _objectSpread({}, opts.query || {});
        }

        if (params2.qs && !params2.qs.token && this.authToken) params2.qs.token = this.authToken;
      } // console.log('WS opts.query, opts.query.token, this.authToken', opts.query, opts.query.token, this.authToken);


      var url = this.createUrl(path, _objectSpread(_objectSpread({}, this.wsConfig), params2)); // console.log('ws url', {wsConfig: this.wsConfig, path, options, url, opts,} );

      if (this.log && this.log.trace) {
        this.log.trace('[api] WS', url, options); // this.log.trace('[api]', req.method, req.url, req._body, req);
      }

      var socket = this.io(url, opts);

      if (Array.isArray(socket)) {
        if ((typeof window !== 'undefined' ? window : global).__DEV__) {
          console.warn('multiple open sockets', socket); // eslint-disable-line no-console
        } // eslint-disable-next-line prefer-destructuring


        socket = socket[2];
      }

      this.wsConnections[key] = [path, options, socket];
      socket.on('disconnect', function () {
        delete _this2.wsConnections[key];
      });
      return socket;
    }
  }, {
    key: "ws2",
    value: function ws2() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.wsConfig) {
        console.error('Вы не можете использовать api.ws без сокет конфигов'); // eslint-disable-line no-console

        return null;
      }

      var params2 = _objectSpread(_objectSpread({}, this.wsConfig), params);

      if (!this.wsConfig.tokenInCookie) {
        if (!params2.qs) params2.qs = {};
        if (params2.qs && !params2.qs.token && this.authToken) params2.qs.token = this.authToken;
      }

      var res = this.io(this.createUrl(path, params2), _objectSpread(_objectSpread({}, this.wsConfig.options), params));
      return res;
    }
  }]);
  return Apiquery;
}();

exports["default"] = Apiquery;
Apiquery.axios = _axios2["default"];
Apiquery.qs = _qs["default"];
//# sourceMappingURL=apiquery.js.map