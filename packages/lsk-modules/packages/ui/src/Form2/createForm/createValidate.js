import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import validate from 'validate.js';
import Promise from 'bluebird';
import DEBUG from './_debug';

export default ({
  validators, customValidators, onError, controls,
}) => async (values) => {
  if (DEBUG) console.log('Form2 validate', values, validators, customValidators);
  const errors = {};

  // validate by validate.js
  if (DEBUG) console.log('@@@@@@@@ prepare');
  try {
    await validate.async(values, validators, { fullMessages: false });
  } catch (err) {
    if (DEBUG) console.log('Form2 validate.async', err);
    forEach(err, (error, name) => {
      errors[name] = error?.[0];
    });
  }

  if (DEBUG) console.log({ errors });


  // validate by custom functions
  await Promise.map(customValidators, async ({ name, validator }) => {
    try {
      const message = await validator(values[name], values);
      if (message) {
        errors[name] = typeof message === 'string' ? message : 'The Error';
      }
    } catch (err) {
      if (typeof err === 'string') errors[name] = err;
      if (typeof err.message === 'string') errors[name] = err.message;
    }
  });

  // if (DEBUG) console.log('errors', errors, isEmpty(errors));
  if (!isEmpty(errors)) {
    if (onError) {
      onError({ errors, controls });
    } else {
      throw errors;
    }
  }
};
