import _ from 'lodash';

export function hasMethod(obj, name, type) {
  const desc = Object.getOwnPropertyDescriptor(obj, name);
  return !!desc && typeof desc.value === type;
}

export function getInfoResult(obj) {
  const methods = [];
  const fields = [];
  Object
  .getOwnPropertyNames(obj)
  .forEach((name) => {
    if (hasMethod(obj, name, 'function')) {
      methods.push(name);
    } else {
      fields.push(name);
    }
  });
  return { methods, fields };
}

export function getInfo(obj) {
// function getInfo(obj, stop = obj => typeof obj === 'function') {
  const results = [];
  // && !stop(obj)
  while (obj) {
    const { methods: staticMethods, fields: staticFields } = getInfoResult(obj);
    const result = {
      obj,
      staticMethods,
      staticFields,
    };
    if (obj.prototype) {
      const { methods, fields } = getInfoResult(obj.prototype);
      result.methods = methods;
      result.fields = fields;
    }
    results.push(result);
    obj = Object.getPrototypeOf(obj);
  }
  return results;
}

export default function getClassInfo(cls) {
  let info = getInfo(cls);
  const result = {};
  info = info.reverse().slice(2);
  ['methods', 'fields', 'staticMethods', 'staticFields'].forEach((name) => {
    result[name] = _.uniq([].concat(..._.map(info, name)));
  });
  return result;
}
