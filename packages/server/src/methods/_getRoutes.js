import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
// import isClass from 'lodash/isClass';
const isClass = () => false;

export default function _getRoutes() {
  const Routes = this.getRoutes();
  const iterate = (item) => {
    if (isClass(item)) {
      const api = new Routes(this);
      return api.getRoutes();
    } if (!isPlainObject(item)) {
      if (item.getRoutes) {
        return item.getRoutes();
      }
      if (item.routes) {
        return item.routes;
      }
      return item;
    }
    return mapValues(item, iterate);
  };
  return iterate(this.api());
}
