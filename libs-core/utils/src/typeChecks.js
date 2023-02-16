import isClass from './isClass';
import isCollection from './isCollection';
import isEmpty from './isEmpty';
import isFunction from './isFunction';

export default (v) => ({
  isArray: Array.isArray(v),
  isFunction: isFunction(v),
  isClass: isClass(v),
  isCollection: isCollection(v),
  isEmpty: isEmpty(v),
});
