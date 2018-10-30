"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UniversalSchema = _interopRequireDefault(require("lego-starter-kit/utils/UniversalSchema"));

var _set = _interopRequireDefault(require("lodash/set"));

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function getSchema(ctx, module) {
  var mongoose = ctx.db;
  var ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = new _UniversalSchema.default({
    managerIds: [{
      // ID ответственного менеджера
      type: ObjectId,
      ref: 'User',
      index: true
    }],
    info: {
      subject: {
        type: String
      },
      gmailThreadId: {
        type: String
      }
    },
    // нужно чтобы хранить всякую шнягу, offerId при рассылке о рекламе оффера и т.д
    meta: {
      summary: {
        // наброски, инфа для быстрого поиска
        lastEmail: {
          date: Date,
          from: {
            // от кого последнее сообщение
            type: String,
            enum: ['user', // пользователь с которым переписываемся(может его даже нет в системе еще)
            'manager', // менеджер который написал письмо
            'system']
          }
        },
        emails: {
          count: {
            // количество писем всего
            type: Number,
            default: 0
          },
          inCount: {
            // количество входящие писем
            type: Number,
            default: 0
          },
          outCount: {
            // количество исходящих писем
            type: Number,
            default: 0
          }
        }
      }
    }
  }, {
    collection: module.prefix ? "".concat(module.prefix, "_thread") : 'thread'
  });
  schema.methods.calculateSummary =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _lastEmail$info;

    var Email, _ref2, inCount, outCount, count, lastEmail, summary;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Email = module.models.Email;
            _context.next = 3;
            return _bluebird.default.props({
              inCount: Email.countDocuments({
                threadId: this._id,
                subtype: 'i'
              }),
              outCount: Email.countDocuments({
                threadId: this._id,
                subtype: 'o'
              }),
              count: Email.countDocuments({
                threadId: this._id
              }),
              lastEmail: Email.findOne({
                threadId: this._id
              }).select(['info.date'])
            });

          case 3:
            _ref2 = _context.sent;
            inCount = _ref2.inCount;
            outCount = _ref2.outCount;
            count = _ref2.count;
            lastEmail = _ref2.lastEmail;
            summary = {
              emails: {
                inCount: inCount,
                outCount: outCount,
                count: count
              }
            };

            if (lastEmail === null || lastEmail === void 0 ? void 0 : (_lastEmail$info = lastEmail.info) === null || _lastEmail$info === void 0 ? void 0 : _lastEmail$info.date) {
              summary.lastEmail = {
                date: lastEmail.info.date
              };
            }

            (0, _set.default)(this, 'meta.summary', summary);
            this.markModified('meta.summary');
            return _context.abrupt("return", this);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return schema;
}

var _default = function _default(ctx, module) {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVGhyZWFkLmpzIl0sIm5hbWVzIjpbImdldFNjaGVtYSIsImN0eCIsIm1vZHVsZSIsIm1vbmdvb3NlIiwiZGIiLCJPYmplY3RJZCIsIlNjaGVtYSIsIlR5cGVzIiwic2NoZW1hIiwiVW5pdmVyc2FsU2NoZW1hIiwibWFuYWdlcklkcyIsInR5cGUiLCJyZWYiLCJpbmRleCIsImluZm8iLCJzdWJqZWN0IiwiU3RyaW5nIiwiZ21haWxUaHJlYWRJZCIsIm1ldGEiLCJzdW1tYXJ5IiwibGFzdEVtYWlsIiwiZGF0ZSIsIkRhdGUiLCJmcm9tIiwiZW51bSIsImVtYWlscyIsImNvdW50IiwiTnVtYmVyIiwiZGVmYXVsdCIsImluQ291bnQiLCJvdXRDb3VudCIsImNvbGxlY3Rpb24iLCJwcmVmaXgiLCJtZXRob2RzIiwiY2FsY3VsYXRlU3VtbWFyeSIsIkVtYWlsIiwibW9kZWxzIiwiUHJvbWlzZSIsInByb3BzIiwiY291bnREb2N1bWVudHMiLCJ0aHJlYWRJZCIsIl9pZCIsInN1YnR5cGUiLCJmaW5kT25lIiwic2VsZWN0IiwibWFya01vZGlmaWVkIiwiZ2V0TW9uZ29vc2VNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDOUIsTUFBTUMsV0FBV0YsSUFBSUcsRUFBckI7QUFEOEIsTUFFdEJDLFFBRnNCLEdBRVRGLFNBQVNHLE1BQVQsQ0FBZ0JDLEtBRlAsQ0FFdEJGLFFBRnNCO0FBRzlCLE1BQU1HLFNBQVMsSUFBSUMsd0JBQUosQ0FBb0I7QUFDakNDLGdCQUFZLENBQ1Y7QUFBRTtBQUNBQyxZQUFNTixRQURSO0FBRUVPLFdBQUssTUFGUDtBQUdFQyxhQUFPO0FBSFQsS0FEVSxDQURxQjtBQVFqQ0MsVUFBTTtBQUNKQyxlQUFTO0FBQ1BKLGNBQU1LO0FBREMsT0FETDtBQUlKQyxxQkFBZTtBQUNiTixjQUFNSztBQURPO0FBSlgsS0FSMkI7QUFlOUI7QUFDSEUsVUFBTTtBQUNKQyxlQUFTO0FBQUU7QUFDVEMsbUJBQVc7QUFDVEMsZ0JBQU1DLElBREc7QUFFVEMsZ0JBQU07QUFBRTtBQUNOWixrQkFBTUssTUFERjtBQUVKUSxrQkFBTSxDQUNKLE1BREksRUFDSTtBQUNSLHFCQUZJLEVBRU87QUFDWCxvQkFISTtBQUZGO0FBRkcsU0FESjtBQVlQQyxnQkFBUTtBQUNOQyxpQkFBTztBQUFFO0FBQ1BmLGtCQUFNZ0IsTUFERDtBQUVMQyxxQkFBUztBQUZKLFdBREQ7QUFLTkMsbUJBQVM7QUFBRTtBQUNUbEIsa0JBQU1nQixNQURDO0FBRVBDLHFCQUFTO0FBRkYsV0FMSDtBQVNORSxvQkFBVTtBQUFFO0FBQ1ZuQixrQkFBTWdCLE1BREU7QUFFUkMscUJBQVM7QUFGRDtBQVRKO0FBWkQ7QUFETDtBQWhCMkIsR0FBcEIsRUE2Q1o7QUFDREcsZ0JBQVk3QixPQUFPOEIsTUFBUCxhQUFtQjlCLE9BQU84QixNQUExQixlQUE0QztBQUR2RCxHQTdDWSxDQUFmO0FBaURBeEIsU0FBT3lCLE9BQVAsQ0FBZUMsZ0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBa0M7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN4QkMsaUJBRHdCLEdBQ2RqQyxPQUFPa0MsTUFETyxDQUN4QkQsS0FEd0I7QUFBQTtBQUFBLG1CQU90QkUsa0JBQVFDLEtBQVIsQ0FBYztBQUN0QlQsdUJBQVNNLE1BQU1JLGNBQU4sQ0FBcUI7QUFBRUMsMEJBQVUsS0FBS0MsR0FBakI7QUFBc0JDLHlCQUFTO0FBQS9CLGVBQXJCLENBRGE7QUFFdEJaLHdCQUFVSyxNQUFNSSxjQUFOLENBQXFCO0FBQUVDLDBCQUFVLEtBQUtDLEdBQWpCO0FBQXNCQyx5QkFBUztBQUEvQixlQUFyQixDQUZZO0FBR3RCaEIscUJBQU9TLE1BQU1JLGNBQU4sQ0FBcUI7QUFBRUMsMEJBQVUsS0FBS0M7QUFBakIsZUFBckIsQ0FIZTtBQUl0QnJCLHlCQUFXZSxNQUNSUSxPQURRLENBQ0E7QUFBRUgsMEJBQVUsS0FBS0M7QUFBakIsZUFEQSxFQUVSRyxNQUZRLENBRUQsQ0FBQyxXQUFELENBRkM7QUFKVyxhQUFkLENBUHNCOztBQUFBO0FBQUE7QUFHOUJmLG1CQUg4QixTQUc5QkEsT0FIOEI7QUFJOUJDLG9CQUo4QixTQUk5QkEsUUFKOEI7QUFLOUJKLGlCQUw4QixTQUs5QkEsS0FMOEI7QUFNOUJOLHFCQU44QixTQU05QkEsU0FOOEI7QUFlMUJELG1CQWYwQixHQWVoQjtBQUNkTSxzQkFBUTtBQUNOSSxnQ0FETTtBQUVOQyxrQ0FGTTtBQUdOSjtBQUhNO0FBRE0sYUFmZ0I7O0FBc0JoQyxnQkFBSU4sU0FBSixhQUFJQSxTQUFKLDBDQUFJQSxVQUFXTixJQUFmLG9EQUFJLGdCQUFpQk8sSUFBckIsRUFBMkI7QUFDekJGLHNCQUFRQyxTQUFSLEdBQW9CO0FBQ2xCQyxzQkFBTUQsVUFBVU4sSUFBVixDQUFlTztBQURILGVBQXBCO0FBR0Q7O0FBQ0QsOEJBQUksSUFBSixFQUFVLGNBQVYsRUFBMEJGLE9BQTFCO0FBQ0EsaUJBQUswQixZQUFMLENBQWtCLGNBQWxCO0FBNUJnQyw2Q0E2QnpCLElBN0J5Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFsQztBQWdDQSxTQUFPckMsTUFBUDtBQUNEOztlQUVhLGtCQUFDUCxHQUFELEVBQU1DLE1BQU4sRUFBaUI7QUFDN0IsU0FBT0YsVUFBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCNEMsZ0JBQXZCLENBQXdDN0MsSUFBSUcsRUFBNUMsQ0FBUDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVW5pdmVyc2FsU2NoZW1hIGZyb20gJ2xlZ28tc3RhcnRlci1raXQvdXRpbHMvVW5pdmVyc2FsU2NoZW1hJztcbmltcG9ydCBzZXQgZnJvbSAnbG9kYXNoL3NldCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmZ1bmN0aW9uIGdldFNjaGVtYShjdHgsIG1vZHVsZSkge1xuICBjb25zdCBtb25nb29zZSA9IGN0eC5kYjtcbiAgY29uc3QgeyBPYmplY3RJZCB9ID0gbW9uZ29vc2UuU2NoZW1hLlR5cGVzO1xuICBjb25zdCBzY2hlbWEgPSBuZXcgVW5pdmVyc2FsU2NoZW1hKHtcbiAgICBtYW5hZ2VySWRzOiBbXG4gICAgICB7IC8vIElEINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtCz0L4g0LzQtdC90LXQtNC20LXRgNCwXG4gICAgICAgIHR5cGU6IE9iamVjdElkLFxuICAgICAgICByZWY6ICdVc2VyJyxcbiAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICB9LFxuICAgIF0sXG4gICAgaW5mbzoge1xuICAgICAgc3ViamVjdDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB9LFxuICAgICAgZ21haWxUaHJlYWRJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB9LFxuICAgIH0sIC8vINC90YPQttC90L4g0YfRgtC+0LHRiyDRhdGA0LDQvdC40YLRjCDQstGB0Y/QutGD0Y4g0YjQvdGP0LPRgywgb2ZmZXJJZCDQv9GA0Lgg0YDQsNGB0YHRi9C70LrQtSDQviDRgNC10LrQu9Cw0LzQtSDQvtGE0YTQtdGA0LAg0Lgg0YIu0LRcbiAgICBtZXRhOiB7XG4gICAgICBzdW1tYXJ5OiB7IC8vINC90LDQsdGA0L7RgdC60LgsINC40L3RhNCwINC00LvRjyDQsdGL0YHRgtGA0L7Qs9C+INC/0L7QuNGB0LrQsFxuICAgICAgICBsYXN0RW1haWw6IHtcbiAgICAgICAgICBkYXRlOiBEYXRlLFxuICAgICAgICAgIGZyb206IHsgLy8g0L7RgiDQutC+0LPQviDQv9C+0YHQu9C10LTQvdC10LUg0YHQvtC+0LHRidC10L3QuNC1XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBlbnVtOiBbXG4gICAgICAgICAgICAgICd1c2VyJywgLy8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGBINC60L7RgtC+0YDRi9C8INC/0LXRgNC10L/QuNGB0YvQstCw0LXQvNGB0Y8o0LzQvtC20LXRgiDQtdCz0L4g0LTQsNC20LUg0L3QtdGCINCyINGB0LjRgdGC0LXQvNC1INC10YnQtSlcbiAgICAgICAgICAgICAgJ21hbmFnZXInLCAvLyDQvNC10L3QtdC00LbQtdGAINC60L7RgtC+0YDRi9C5INC90LDQv9C40YHQsNC7INC/0LjRgdGM0LzQvlxuICAgICAgICAgICAgICAnc3lzdGVtJywgLy8g0LrQsNC60LDRjyDRgtC+INGA0LDRgdGB0YvQu9C60LAg0L7RgiDQvdCw0YjQtdC5INGB0LjRgdGC0LXQvNGLKNCy0L7Qt9C80L7QttC90L4g0L3QtSDQvdGD0LbQvdC+LCDQvdC10L/QvtC90Y/RgtC90L4g0LrQsNC6INC80L7QvdC40YLQvtGA0LjRgtGMINGN0YLQvilcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWxzOiB7XG4gICAgICAgICAgY291bnQ6IHsgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0L/QuNGB0LXQvCDQstGB0LXQs9C+XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5Db3VudDogeyAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQstGF0L7QtNGP0YnQuNC1INC/0LjRgdC10LxcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRDb3VudDogeyAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQuNGB0YXQvtC00Y/RidC40YUg0L/QuNGB0LXQvFxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LCB7XG4gICAgY29sbGVjdGlvbjogbW9kdWxlLnByZWZpeCA/IGAke21vZHVsZS5wcmVmaXh9X3RocmVhZGAgOiAndGhyZWFkJyxcbiAgfSk7XG5cbiAgc2NoZW1hLm1ldGhvZHMuY2FsY3VsYXRlU3VtbWFyeSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB7IEVtYWlsIH0gPSBtb2R1bGUubW9kZWxzO1xuICAgIGNvbnN0IHtcbiAgICAgIGluQ291bnQsXG4gICAgICBvdXRDb3VudCxcbiAgICAgIGNvdW50LFxuICAgICAgbGFzdEVtYWlsLFxuICAgIH0gPSBhd2FpdCBQcm9taXNlLnByb3BzKHtcbiAgICAgIGluQ291bnQ6IEVtYWlsLmNvdW50RG9jdW1lbnRzKHsgdGhyZWFkSWQ6IHRoaXMuX2lkLCBzdWJ0eXBlOiAnaScgfSksXG4gICAgICBvdXRDb3VudDogRW1haWwuY291bnREb2N1bWVudHMoeyB0aHJlYWRJZDogdGhpcy5faWQsIHN1YnR5cGU6ICdvJyB9KSxcbiAgICAgIGNvdW50OiBFbWFpbC5jb3VudERvY3VtZW50cyh7IHRocmVhZElkOiB0aGlzLl9pZCB9KSxcbiAgICAgIGxhc3RFbWFpbDogRW1haWxcbiAgICAgICAgLmZpbmRPbmUoeyB0aHJlYWRJZDogdGhpcy5faWQgfSlcbiAgICAgICAgLnNlbGVjdChbJ2luZm8uZGF0ZSddKSxcbiAgICB9KTtcbiAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgZW1haWxzOiB7XG4gICAgICAgIGluQ291bnQsXG4gICAgICAgIG91dENvdW50LFxuICAgICAgICBjb3VudCxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobGFzdEVtYWlsPy5pbmZvPy5kYXRlKSB7XG4gICAgICBzdW1tYXJ5Lmxhc3RFbWFpbCA9IHtcbiAgICAgICAgZGF0ZTogbGFzdEVtYWlsLmluZm8uZGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICAgIHNldCh0aGlzLCAnbWV0YS5zdW1tYXJ5Jywgc3VtbWFyeSk7XG4gICAgdGhpcy5tYXJrTW9kaWZpZWQoJ21ldGEuc3VtbWFyeScpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBzY2hlbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0KGN0eCwgbW9kdWxlKSA9PiB7XG4gIHJldHVybiBnZXRTY2hlbWEoY3R4LCBtb2R1bGUpLmdldE1vbmdvb3NlTW9kZWwoY3R4LmRiKTtcbn07XG4iXX0=