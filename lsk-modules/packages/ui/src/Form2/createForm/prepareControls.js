import React from 'react';
import forEach from 'lodash/forEach';
import getControlHtmlId from './getControlHtmlId';

export default (ctrls, FormGroup) => {
  const controls = {};
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

    control.htmlId = getControlHtmlId(control);
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
    controls[name] = control;
  });

  const get = (key) => {
    const control = controls[key];
    if (!control) return { component: 'div' };
    return control;
  };

  return {
    controls: {
      ...controls,
      get,
    },
    control: get,
  };
};
