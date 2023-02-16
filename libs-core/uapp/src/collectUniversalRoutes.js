import { isPlainObject } from 'lodash';
import flatten from 'lodash/flatten';

export const collectUniversalRoutes = (route, { path: parentPath = '' } = {}) => {
  if (Array.isArray(route)) return flatten(route.map(collectUniversalRoutes));
  if (isPlainObject(route)) {
    const path = [parentPath, route.path].join('#');
    const children = route.children ? flatten(route.children.map((a) => collectUniversalRoutes(a, { path }))) : [];
    return [path, ...children];
  }
  return [];
};

export default collectUniversalRoutes;
