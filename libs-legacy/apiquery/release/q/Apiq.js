"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var Apiq = /*#__PURE__*/function () {
  function Apiq(props) {
    (0, _classCallCheck2["default"])(this, Apiq);
    this.config = {};
    this.instance = _axios["default"];
    Object.assign(this, props);
    this.init();
  }

  (0, _createClass2["default"])(Apiq, [{
    key: "init",
    value: function init() {
      this.instance = _axios["default"].create(this.config);
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      this.authToken = token;
      this.instance.defaults.headers.common.Authorization = "Bearer ".concat(token);
    }
  }, {
    key: "setAuthToken",
    value: function setAuthToken(token) {
      this.setToken(token);
    }
  }, {
    key: "fetch",
    value: function fetch() {
      return this.instance.apply(this, arguments);
    }
  }, {
    key: "request",
    value: function request() {
      var _this$instance;

      return (_this$instance = this.instance).request.apply(_this$instance, arguments);
    }
  }, {
    key: "get",
    value: function get() {
      var _this$instance2;

      return (_this$instance2 = this.instance).get.apply(_this$instance2, arguments);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this$instance3;

      return (_this$instance3 = this.instance)["delete"].apply(_this$instance3, arguments);
    }
  }, {
    key: "head",
    value: function head() {
      var _this$instance4;

      return (_this$instance4 = this.instance).head.apply(_this$instance4, arguments);
    }
  }, {
    key: "options",
    value: function options() {
      var _this$instance5;

      return (_this$instance5 = this.instance).options.apply(_this$instance5, arguments);
    }
  }, {
    key: "post",
    value: function post() {
      var _this$instance6;

      return (_this$instance6 = this.instance).post.apply(_this$instance6, arguments);
    }
  }, {
    key: "put",
    value: function put() {
      var _this$instance7;

      return (_this$instance7 = this.instance).put.apply(_this$instance7, arguments);
    }
  }, {
    key: "patch",
    value: function patch() {
      var _this$instance8;

      return (_this$instance8 = this.instance).patch.apply(_this$instance8, arguments);
    }
  }, {
    key: "all",
    value: function all() {
      var _this$instance9;

      return (_this$instance9 = this.instance).all.apply(_this$instance9, arguments);
    }
  }, {
    key: "spread",
    value: function spread() {
      var _this$instance10;

      return (_this$instance10 = this.instance).spread.apply(_this$instance10, arguments);
    }
  }]);
  return Apiq;
}(); // const url = get(this.config.apiConfig, 'url', __CLIENT__ ? '/' : `http://127.0.0.1:${this.app.config.port}`);
// const api = new this.Api({
//   ...apiConfig,
//   url,
// });
// const { app } = this;
// if (__SERVER__ && app) {
//   wrapApi({ api, app });
// }
// return api;


exports["default"] = Apiq;
//# sourceMappingURL=Apiq.js.map