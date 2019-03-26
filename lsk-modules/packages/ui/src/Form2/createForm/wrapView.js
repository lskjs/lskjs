import React from 'react';
import avoidNestedFields from './avoidNestedFields';

export default ({
  View, Wrapper, props: staticProps, flatten,
}) => (props) => {
  const mergedProps = { ...staticProps, ...props };
  const formView = React.createElement(View, { ...staticProps, ...props, key: 'formView' });
  const { onChange } = mergedProps;
  if (!onChange) return formView;
  if (flatten) {
    mergedProps.onChange = (values, ...args) => {
      onChange(avoidNestedFields(values), ...args);
    };
  }
  return React.createElement(Wrapper, mergedProps, formView);
};

