import React from 'react';
import isFunction from 'lodash/isFunction';
import getValidators from './getValidators';
import prepareControls from './prepareControls';
import wrapView from './wrapView';
import createMapPropsToValues from './createMapPropsToValues';
import createHandleSubmit from './createHandleSubmit';
import createValidate from './createValidate';
import DEBUG from './_debug';

export default ({
  OnChangeListener = React.Fragment,
  withFormik: defaultWithFormik,
  ...creatorConfig
}) => (configOrFn) => {
  let config;
  if (isFunction(configOrFn)) {
    config = configOrFn({});
    // config = inject(configOrFn);
  } else {
    config = configOrFn;
  }
  if (DEBUG) console.log('Form2 config', config ); // eslint-disable-line
  config = {
    ...creatorConfig,
    ...config,
  };
  const {
    controls: rawControls,
    view: RawView,
    FormGroup,
    withFormik = defaultWithFormik,
    flatten = true,
    onError,
    ...configProps
  } = config;


  const { controls, control } = prepareControls(rawControls, FormGroup);
  const { validators, customValidators } = getValidators(controls);
  const View = wrapView({
    View: RawView,
    Wrapper: OnChangeListener,
    props: {
      controls,
      control,
      validators,
      customValidators,
    },
    flatten,
  });

  return withFormik({
    mapPropsToValues: createMapPropsToValues({ controls }),
    handleSubmit: createHandleSubmit({ flatten }),
    validate: createValidate({
      validators, customValidators, onError, controls,
    }),
    validateOnChange: false,
    validateOnBlur: false,
    ...configProps,
  })(View);
};
