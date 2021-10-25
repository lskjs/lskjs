import baseIsFunction from 'lodash/isFunction';

import { isClass } from './isClass';

export const isFunction = (v: any): boolean => baseIsFunction(v) && !isClass(v);

export default isFunction;
