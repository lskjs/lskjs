import React from 'react';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import pickBy from 'lodash/pickBy';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import get from 'lodash/get';
// import omit from 'lodash/omit';
// import some from 'lodash/some';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { withFormik } from 'formik';
import validate from 'validate.js';
import Promise from 'bluebird';
import getError from '../getError';
import OnChangeListener from '../OnChangeListener';
// import getControlHtmlId from './getControlHtmlId';

const DEBUG = __DEV__;

const prepareControls = (ctrls, FormGroup) => {
  const prepared = {};
  forEach(ctrls, (ctrl, name) => {
    const ControlWrapper = ctrl.FormGroup || FormGroup;
    let component;
    if (ControlWrapper) {
      component = (props2) => {
        // console.log('component', props2);
        return React.createElement(
          ControlWrapper,
          props2,
          React.createElement(ctrl.component, props2),
        );
      };
    } else {
      ({ component } = ctrl);
    }

    const control = {
      name: ctrl.key || name,
      ...ctrl,
      component,
    };

    // control.htmlId = getControlHtmlId(control);
    if (!control.validator) control.validator = {};
    if (control.required && !control.validator.presence) {
      control._required = control.required;
      delete control.required;
      control.validator.presence = {
        allowEmpty: false,
      };
    }
    if (control.type === 'email' && !control.validator.email) {
      control._type = control.type;
      delete control.type;
      control.validator.email = true;
    }
    prepared[name] = control;
  });

  return {
    ...prepared,
    get: (key) => {
      const control = prepared[key];
      if (!control) return { component: 'div' };
      return control;
    },
  };
};

const replaceSymbols = (str, oldSymbol, newSymbol = '') => {
  const re = new RegExp(oldSymbol, 'g');
  return str.replace(re, newSymbol);
};

export const avoidNestedFields = (values) => {
  let newValues = {};

  forEach(values, (value, oldKey) => {
    if (oldKey.indexOf('@') !== -1) {
      const newKey = replaceSymbols(oldKey, '@', '.');
      newValues = {
        ...newValues,
        [newKey]: value,
      };
      return;
    }
    newValues[oldKey] = value;
  });
  return newValues;
};


const getValidators = (controls) => {
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

const createForm = ({
  controls: rawControls,
  view: View,
  displayName,
  FormGroup = null,
  withFormik: rawWithFormik,
  flatten = true,
  ...otherProps
}) => {
  const controls = prepareControls(rawControls, FormGroup);
  const { validators, customValidators } = getValidators(controls);
  const staticProps = {
    controls,
    validators,
    customValidators,
    control: (key) => {
      const control = controls[key];
      if (!control) return { component: 'div' };
      return control;
    },
  };

  const WrappedView = (props) => {
    const mergedProps = { ...staticProps, ...props };
    const formView = React.createElement(View, { ...staticProps, ...props, key: 'formView' });
    const { onChange } = mergedProps;
    if (!onChange) return formView;
    if (flatten) {
      mergedProps.onChange = (values, ...args) => {
        onChange(avoidNestedFields(values), ...args);
      };
    }
    return React.createElement(OnChangeListener, mergedProps, formView);
  };


  const wrapperWithFormik = rawWithFormik || withFormik;
  return wrapperWithFormik({
    mapPropsToValues(props) {
      const { initialValues } = props;
      const defaultValues = cloneDeep(initialValues) || {};
      Object.keys(controls).forEach((key) => {
        if (typeof get(defaultValues, key) !== 'undefined') return;
        if (controls[key].key) return;

        let initialValue = get(controls, `${key}.initialValue`);
        if (initialValue === 'undefined') {
          initialValue = get(controls, `${key}.defaultValue`);
          if (initialValue === 'undefined') return;
        }
        set(defaultValues, key, initialValue);
      });

      if (DEBUG) console.log('Form2 mapPropsToValues', initialValues, ' => ', defaultValues ); // eslint-disable-line
      return defaultValues;
    },
    handleSubmit: async (values, props2) => {
      const {
        setSubmitting, props, setStatus, setFieldError, status, isSubmitting,
      } = props2;
      const { onSubmit } = props;
      if (DEBUG) console.log('Form2 handleSubmit', { status, isSubmitting }); // eslint-disable-line

      // console.log({status, isSubmitting});

      if (!isSubmitting) {
        setStatus('progress');
        try {
          if (values && flatten) values = avoidNestedFields(values);
          if (onSubmit) await onSubmit(values, props2);
          setStatus('success');
        } catch (err) {
          setFieldError('onSubmit', getError(err).message);
          // scroll.scrollTo(`#${getControlHtmlId('onSubmit')}`);
          // console.log({err});
          setStatus('error');
        }
        setSubmitting(false);
        setTimeout(() => {
          setStatus(null);
        }, 1000);
      } else {
        console.log('STRANGE!!!!!!!');
      }
    },

    async validate(values) {
      if (DEBUG) console.log('Form2 validate', values);
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

      // some(Object.keys(errors), key => scroll.scrollTo(`#${getControlHtmlId(controls[key])}`));

      // throw if errors
      // const error = new Error('Validate error');
      // error.errors = errors;
      if (!isEmpty(errors)) throw errors;
      // if (!isEmpty(errors)) return errors;
      // try {
      //   // this.handleChange(values);
      //   const onChange = get(this, 'props.onChange') || get(otherProps, 'onChange');
      //   // const { onChange } = props;
      //   if (onChange) onChange(values);
      // } catch (err) {
      //   console.log('onChange err', err);
      // }
    },
    validateOnChange: false,
    validateOnBlur: false,
    displayName: displayName || 'Form',
    ...otherProps,
  })(WrappedView);
};

export default createForm;
