"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Template =
/*#__PURE__*/
function () {
  function Template() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Template);

    Object.assign(this, params);
  }

  _createClass(Template, [{
    key: "getOptions",
    value: function getOptions() {
      return {};
    }
  }, {
    key: "renderHead",
    value: function renderHead() {
      return "\n<head>\n  <title>Title</title>\n  header\n</head>\n".trim();
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      return "\n<div>\n  footer\n</div>\n".trim();
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return "\n    Base Sample Email\n    ";
    }
  }, {
    key: "renderBody",
    value: function renderBody(_ref) {
      var params = _ref.params;
      // <div class="header">Привет!</div>
      return "\n    <body>\n      <div style=\"background:#dfe8ef;display: table;width: 100%;margin: 0px auto;\">\n        <div class=\"mail\">\n          <div class=\"lines\">\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n          </div>\n          <div class=\"body_mail\">\n            <div class=\"content\">\n              ".concat(this.renderContent.apply(this, arguments), "\n              ").concat(this.renderFooter.apply(this, arguments), "\n            </div>\n          </div>\n          <div class=\"lines\">\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n            <div></div>\n          </div>\n        </div>\n      </div>\n    </body>");
    }
  }, {
    key: "render",
    value: function render() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      //
      // ${this.renderBody(params)}
      return "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n      ".concat(this.renderHead(params), "\n      ").concat(this.renderBody(params), "\n    </html>\n    ");
    }
  }, {
    key: "getHtml",
    value: function getHtml() {
      return this.render.apply(this, arguments);
    }
  }]);

  return Template;
}();

exports.default = Template;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZXMvX2Jhc2UuanMiXSwibmFtZXMiOlsiVGVtcGxhdGUiLCJwYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0cmltIiwicmVuZGVyQ29udGVudCIsImFyZ3VtZW50cyIsInJlbmRlckZvb3RlciIsInJlbmRlckhlYWQiLCJyZW5kZXJCb2R5IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQXFCQSxROzs7QUFDbkIsc0JBQXlCO0FBQUEsUUFBYkMsTUFBYSx1RUFBSixFQUFJOztBQUFBOztBQUN2QkMsV0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE1BQXBCO0FBQ0Q7Ozs7aUNBRVk7QUFDWCxhQUFPLEVBQVA7QUFDRDs7O2lDQUNZO0FBQ1gsYUFBTyx3REFLVEcsSUFMUyxFQUFQO0FBTUQ7OzttQ0FDYztBQUNiLGFBQU8sOEJBSVRBLElBSlMsRUFBUDtBQUtEOzs7b0NBQ2U7QUFDZDtBQUdEOzs7cUNBQ3NCO0FBQUEsVUFBVkgsTUFBVSxRQUFWQSxNQUFVO0FBQ3JCO0FBQ0Esa2FBYVksS0FBS0ksYUFBTCxhQUFzQkMsU0FBdEIsQ0FiWiw2QkFjWSxLQUFLQyxZQUFMLGFBQXFCRCxTQUFyQixDQWRaO0FBMkJEOzs7NkJBQ21CO0FBQUEsVUFBYkwsTUFBYSx1RUFBSixFQUFJO0FBQ2xCO0FBQ0E7QUFDQSw0RUFHSSxLQUFLTyxVQUFMLENBQWdCUCxNQUFoQixDQUhKLHFCQUlJLEtBQUtRLFVBQUwsQ0FBZ0JSLE1BQWhCLENBSko7QUFPRDs7OzhCQUVnQjtBQUNmLGFBQU8sS0FBS1MsTUFBTCx1QkFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuXG4gIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJlbmRlckhlYWQoKSB7XG4gICAgcmV0dXJuIGBcbjxoZWFkPlxuICA8dGl0bGU+VGl0bGU8L3RpdGxlPlxuICBoZWFkZXJcbjwvaGVhZD5cbmAudHJpbSgpO1xuICB9XG4gIHJlbmRlckZvb3RlcigpIHtcbiAgICByZXR1cm4gYFxuPGRpdj5cbiAgZm9vdGVyXG48L2Rpdj5cbmAudHJpbSgpO1xuICB9XG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIGBcbiAgICBCYXNlIFNhbXBsZSBFbWFpbFxuICAgIGA7XG4gIH1cbiAgcmVuZGVyQm9keSh7IHBhcmFtcyB9KSB7XG4gICAgLy8gPGRpdiBjbGFzcz1cImhlYWRlclwiPtCf0YDQuNCy0LXRgiE8L2Rpdj5cbiAgICByZXR1cm4gYFxuICAgIDxib2R5PlxuICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6I2RmZThlZjtkaXNwbGF5OiB0YWJsZTt3aWR0aDogMTAwJTttYXJnaW46IDBweCBhdXRvO1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lc1wiPlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJvZHlfbWFpbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLnJlbmRlckNvbnRlbnQoLi4uYXJndW1lbnRzKX1cbiAgICAgICAgICAgICAgJHt0aGlzLnJlbmRlckZvb3RlciguLi5hcmd1bWVudHMpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVzXCI+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2JvZHk+YDtcbiAgfVxuICByZW5kZXIocGFyYW1zID0ge30pIHtcbiAgICAvL1xuICAgIC8vICR7dGhpcy5yZW5kZXJCb2R5KHBhcmFtcyl9XG4gICAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgICR7dGhpcy5yZW5kZXJIZWFkKHBhcmFtcyl9XG4gICAgICAke3RoaXMucmVuZGVyQm9keShwYXJhbXMpfVxuICAgIDwvaHRtbD5cbiAgICBgO1xuICB9XG5cbiAgZ2V0SHRtbCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyKC4uLmFyZ3MpO1xuICB9XG59XG4iXX0=