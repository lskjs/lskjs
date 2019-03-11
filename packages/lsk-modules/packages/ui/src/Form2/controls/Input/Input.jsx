import React from 'react';
import get from 'lodash/get';
import InputBase from '../../../Input';

const Input = ({
  field,
  form,
  ...props
}) => {
  const hasError = field && field.name && !!get(form, `errors.${field.name}`);
  return (
    <InputBase
      {...field}
      debounce={0}
      {...props}
      regex={props.regex}
      style={{ border: hasError ? '1px solid red' : '' }}
      // leftIcon={<Icon color="#0088cc" size={24} />}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
    />
  );
};

export default Input;
