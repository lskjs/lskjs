import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

export default (controls) => {
  const validators = {};
  let customValidators = [];
  forEach(controls, (value, key) => {
    validators[key] = pickBy(value.validator, (validator) => {
      return !isFunction(validator);
    });

    const custom = pickBy(value.validator, isFunction);
    if (!isEmpty(custom)) {
      customValidators = [
        ...customValidators,
        ...map(custom, (validator) => {
          return {
            name: key,
            validator,
          };
        }),
      ];
    }
  });
  return {
    validators,
    customValidators,
  };
};

