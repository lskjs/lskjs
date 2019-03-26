import React from 'react';
import get from 'lodash/get';
import InputBase from '../../../Input';

const Input = ({
  field,
  form,
  format = () => ({}),
  ...props
}) => {
  const hasError = field && field.name && !!get(form, `errors.${field.name}`);
  return (
    <InputBase
      {...field}
      value={field.value || ''}
      debounce={0}
      {...props}
      regex={props.regex}
      style={{ border: hasError ? '1px solid red' : '' }}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
      {...format({ field, form, ...props })}
    />
  );
};

export default Input;
