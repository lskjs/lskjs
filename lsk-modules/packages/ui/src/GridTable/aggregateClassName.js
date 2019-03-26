import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

const aggregateClassName = (props = {}, props2 = {}) => {
  return [
    props.className,
    props.getClassName,
    props2.className,
    props2.getClassName,
  ].map((classOrFn) => {
    if (isFunction(classOrFn)) {
      return classOrFn(props);
    }
    if (isString(classOrFn)) {
      return classOrFn;
    }
    return null;
  }).filter(a => a).join(' ') || null;
};


export default aggregateClassName;
