"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UniversalSchema = _interopRequireDefault(require("lego-starter-kit/utils/UniversalSchema"));

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSchema(ctx, module) {
  var mongoose = ctx.db;
  var ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = new _UniversalSchema.default({
    uid: {
      type: Number,
      required: true,
      unique: true
    },
    threadId: {
      type: ObjectId,
      ref: 'Thread',
      index: true
    },
    subtype: {
      // Тип, входящая/исходящая почта
      type: String,
      required: true,
      enum: ['i', // входящая почта
      'o']
    },
    info: {
      cc: {
        type: Array
      },
      bcc: {
        type: Array
      },
      text: {
        // Текст письма
        type: String
      },
      html: {
        // html письма
        type: String
      },
      subject: {
        // тема письма
        type: String,
        index: true
      },
      receivedDate: {
        // дата получения, у отправленных ее почему то нет
        type: Date,
        index: true
      },
      date: {
        // дата отправки
        type: Date,
        index: true
      },
      references: {
        type: [String],
        index: true
      },
      // Нужно для reply (id сообщений которые шли до этого сообщения в переписке)
      messageId: {
        type: String,
        index: true
      } // Нужно для reply (id сообщения в переписке)

    },
    from: {
      // от кого
      address: {
        // почта
        type: String
      },
      name: {
        // имя
        type: String
      },
      userId: {
        // ID юзера в системе(может и не быть)
        type: ObjectId,
        ref: 'User',
        index: true
      }
    },
    to: {
      // кому
      address: {
        // почта
        type: String
      },
      name: {
        // имя
        type: String
      },
      userId: {
        // ID юзера в системе(может и не быть)
        type: ObjectId,
        ref: 'User',
        index: true
      }
    }
  }, {
    collection: module.prefix ? "".concat(module.prefix, "_email") : 'email'
  });
  return schema;
}

var _default = function _default(ctx, module) {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRW1haWwuanMiXSwibmFtZXMiOlsiZ2V0U2NoZW1hIiwiY3R4IiwibW9kdWxlIiwibW9uZ29vc2UiLCJkYiIsIk9iamVjdElkIiwiU2NoZW1hIiwiVHlwZXMiLCJzY2hlbWEiLCJVbml2ZXJzYWxTY2hlbWEiLCJ1aWQiLCJ0eXBlIiwiTnVtYmVyIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJ0aHJlYWRJZCIsInJlZiIsImluZGV4Iiwic3VidHlwZSIsIlN0cmluZyIsImVudW0iLCJpbmZvIiwiY2MiLCJBcnJheSIsImJjYyIsInRleHQiLCJodG1sIiwic3ViamVjdCIsInJlY2VpdmVkRGF0ZSIsIkRhdGUiLCJkYXRlIiwicmVmZXJlbmNlcyIsIm1lc3NhZ2VJZCIsImZyb20iLCJhZGRyZXNzIiwibmFtZSIsInVzZXJJZCIsInRvIiwiY29sbGVjdGlvbiIsInByZWZpeCIsImdldE1vbmdvb3NlTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCQyxNQUF4QixFQUFnQztBQUM5QixNQUFNQyxXQUFXRixJQUFJRyxFQUFyQjtBQUQ4QixNQUV0QkMsUUFGc0IsR0FFVEYsU0FBU0csTUFBVCxDQUFnQkMsS0FGUCxDQUV0QkYsUUFGc0I7QUFHOUIsTUFBTUcsU0FBUyxJQUFJQyx3QkFBSixDQUFvQjtBQUNqQ0MsU0FBSztBQUNIQyxZQUFNQyxNQURIO0FBRUhDLGdCQUFVLElBRlA7QUFHSEMsY0FBUTtBQUhMLEtBRDRCO0FBTWpDQyxjQUFVO0FBQ1JKLFlBQU1OLFFBREU7QUFFUlcsV0FBSyxRQUZHO0FBR1JDLGFBQU87QUFIQyxLQU51QjtBQVdqQ0MsYUFBUztBQUFFO0FBQ1RQLFlBQU1RLE1BREM7QUFFUE4sZ0JBQVUsSUFGSDtBQUdQTyxZQUFNLENBQ0osR0FESSxFQUNDO0FBQ0wsU0FGSTtBQUhDLEtBWHdCO0FBbUJqQ0MsVUFBTTtBQUNKQyxVQUFJO0FBQ0ZYLGNBQU1ZO0FBREosT0FEQTtBQUlKQyxXQUFLO0FBQ0hiLGNBQU1ZO0FBREgsT0FKRDtBQU9KRSxZQUFNO0FBQUU7QUFDTmQsY0FBTVE7QUFERixPQVBGO0FBVUpPLFlBQU07QUFBRTtBQUNOZixjQUFNUTtBQURGLE9BVkY7QUFhSlEsZUFBUztBQUFFO0FBQ1RoQixjQUFNUSxNQURDO0FBRVBGLGVBQU87QUFGQSxPQWJMO0FBaUJKVyxvQkFBYztBQUFFO0FBQ2RqQixjQUFNa0IsSUFETTtBQUVaWixlQUFPO0FBRkssT0FqQlY7QUFxQkphLFlBQU07QUFBRTtBQUNObkIsY0FBTWtCLElBREY7QUFFSlosZUFBTztBQUZILE9BckJGO0FBeUJKYyxrQkFBWTtBQUNWcEIsY0FBTSxDQUFDUSxNQUFELENBREk7QUFFVkYsZUFBTztBQUZHLE9BekJSO0FBNEJEO0FBQ0hlLGlCQUFXO0FBQ1RyQixjQUFNUSxNQURHO0FBRVRGLGVBQU87QUFGRSxPQTdCUCxDQWdDRDs7QUFoQ0MsS0FuQjJCO0FBcURqQ2dCLFVBQU07QUFBRTtBQUNOQyxlQUFTO0FBQUU7QUFDVHZCLGNBQU1RO0FBREMsT0FETDtBQUlKZ0IsWUFBTTtBQUFFO0FBQ054QixjQUFNUTtBQURGLE9BSkY7QUFPSmlCLGNBQVE7QUFBRTtBQUNSekIsY0FBTU4sUUFEQTtBQUVOVyxhQUFLLE1BRkM7QUFHTkMsZUFBTztBQUhEO0FBUEosS0FyRDJCO0FBa0VqQ29CLFFBQUk7QUFBRTtBQUNKSCxlQUFTO0FBQUU7QUFDVHZCLGNBQU1RO0FBREMsT0FEUDtBQUlGZ0IsWUFBTTtBQUFFO0FBQ054QixjQUFNUTtBQURGLE9BSko7QUFPRmlCLGNBQVE7QUFBRTtBQUNSekIsY0FBTU4sUUFEQTtBQUVOVyxhQUFLLE1BRkM7QUFHTkMsZUFBTztBQUhEO0FBUE47QUFsRTZCLEdBQXBCLEVBK0VaO0FBQ0RxQixnQkFBWXBDLE9BQU9xQyxNQUFQLGFBQW1CckMsT0FBT3FDLE1BQTFCLGNBQTJDO0FBRHRELEdBL0VZLENBQWY7QUFtRkEsU0FBTy9CLE1BQVA7QUFDRDs7ZUFFYSxrQkFBQ1AsR0FBRCxFQUFNQyxNQUFOLEVBQWlCO0FBQzdCLFNBQU9GLFVBQVVDLEdBQVYsRUFBZUMsTUFBZixFQUF1QnNDLGdCQUF2QixDQUF3Q3ZDLElBQUlHLEVBQTVDLENBQVA7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVuaXZlcnNhbFNjaGVtYSBmcm9tICdsZWdvLXN0YXJ0ZXIta2l0L3V0aWxzL1VuaXZlcnNhbFNjaGVtYSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmZ1bmN0aW9uIGdldFNjaGVtYShjdHgsIG1vZHVsZSkge1xuICBjb25zdCBtb25nb29zZSA9IGN0eC5kYjtcbiAgY29uc3QgeyBPYmplY3RJZCB9ID0gbW9uZ29vc2UuU2NoZW1hLlR5cGVzO1xuICBjb25zdCBzY2hlbWEgPSBuZXcgVW5pdmVyc2FsU2NoZW1hKHtcbiAgICB1aWQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgIH0sXG4gICAgdGhyZWFkSWQ6IHtcbiAgICAgIHR5cGU6IE9iamVjdElkLFxuICAgICAgcmVmOiAnVGhyZWFkJyxcbiAgICAgIGluZGV4OiB0cnVlLFxuICAgIH0sXG4gICAgc3VidHlwZTogeyAvLyDQotC40L8sINCy0YXQvtC00Y/RidCw0Y8v0LjRgdGF0L7QtNGP0YnQsNGPINC/0L7Rh9GC0LBcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgZW51bTogW1xuICAgICAgICAnaScsIC8vINCy0YXQvtC00Y/RidCw0Y8g0L/QvtGH0YLQsFxuICAgICAgICAnbycsIC8vINC40YHRhdC+0LTRj9GJ0LDRjyDQv9C+0YfRgtCwXG4gICAgICBdLFxuICAgIH0sXG4gICAgaW5mbzoge1xuICAgICAgY2M6IHtcbiAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICB9LFxuICAgICAgYmNjOiB7XG4gICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgfSxcbiAgICAgIHRleHQ6IHsgLy8g0KLQtdC60YHRgiDQv9C40YHRjNC80LBcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgfSxcbiAgICAgIGh0bWw6IHsgLy8gaHRtbCDQv9C40YHRjNC80LBcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgfSxcbiAgICAgIHN1YmplY3Q6IHsgLy8g0YLQtdC80LAg0L/QuNGB0YzQvNCwXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVjZWl2ZWREYXRlOiB7IC8vINC00LDRgtCwINC/0L7Qu9GD0YfQtdC90LjRjywg0YMg0L7RgtC/0YDQsNCy0LvQtdC90L3Ri9GFINC10LUg0L/QvtGH0LXQvNGDINGC0L4g0L3QtdGCXG4gICAgICAgIHR5cGU6IERhdGUsXG4gICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRhdGU6IHsgLy8g0LTQsNGC0LAg0L7RgtC/0YDQsNCy0LrQuFxuICAgICAgICB0eXBlOiBEYXRlLFxuICAgICAgICBpbmRleDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZWZlcmVuY2VzOiB7XG4gICAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgICBpbmRleDogdHJ1ZSxcbiAgICAgIH0sIC8vINCd0YPQttC90L4g0LTQu9GPIHJlcGx5IChpZCDRgdC+0L7QsdGJ0LXQvdC40Lkg0LrQvtGC0L7RgNGL0LUg0YjQu9C4INC00L4g0Y3RgtC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y8g0LIg0L/QtdGA0LXQv9C40YHQutC1KVxuICAgICAgbWVzc2FnZUlkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICB9LCAvLyDQndGD0LbQvdC+INC00LvRjyByZXBseSAoaWQg0YHQvtC+0LHRidC10L3QuNGPINCyINC/0LXRgNC10L/QuNGB0LrQtSlcbiAgICB9LFxuICAgIGZyb206IHsgLy8g0L7RgiDQutC+0LPQvlxuICAgICAgYWRkcmVzczogeyAvLyDQv9C+0YfRgtCwXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7IC8vINC40LzRj1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB9LFxuICAgICAgdXNlcklkOiB7IC8vIElEINGO0LfQtdGA0LAg0LIg0YHQuNGB0YLQtdC80LUo0LzQvtC20LXRgiDQuCDQvdC1INCx0YvRgtGMKVxuICAgICAgICB0eXBlOiBPYmplY3RJZCxcbiAgICAgICAgcmVmOiAnVXNlcicsXG4gICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRvOiB7IC8vINC60L7QvNGDXG4gICAgICBhZGRyZXNzOiB7IC8vINC/0L7Rh9GC0LBcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHsgLy8g0LjQvNGPXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIH0sXG4gICAgICB1c2VySWQ6IHsgLy8gSUQg0Y7Qt9C10YDQsCDQsiDRgdC40YHRgtC10LzQtSjQvNC+0LbQtdGCINC4INC90LUg0LHRi9GC0YwpXG4gICAgICAgIHR5cGU6IE9iamVjdElkLFxuICAgICAgICByZWY6ICdVc2VyJyxcbiAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sIHtcbiAgICBjb2xsZWN0aW9uOiBtb2R1bGUucHJlZml4ID8gYCR7bW9kdWxlLnByZWZpeH1fZW1haWxgIDogJ2VtYWlsJyxcbiAgfSk7XG5cbiAgcmV0dXJuIHNjaGVtYTtcbn1cblxuZXhwb3J0IGRlZmF1bHQoY3R4LCBtb2R1bGUpID0+IHtcbiAgcmV0dXJuIGdldFNjaGVtYShjdHgsIG1vZHVsZSkuZ2V0TW9uZ29vc2VNb2RlbChjdHguZGIpO1xufTtcbiJdfQ==