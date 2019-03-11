import React from 'react';
import get from 'lodash/get';
import ExtendedCheckblock from '../../../UI/molecules/ExtendedCheckblock';

const CheckBlock = ({
  field,
  form,
  ...props
}) => {
  const props2 = {
    value: field.value,
    validationState: form.errors[field.name] ? 'error' : null,
    onChange: (value) => {
      form.setFieldValue(field.name, value);
    },
    label: props.title || props.name,
    info: props.info,
  };
  return (
    <ExtendedCheckblock
      {...field}
      {...props}
      {...props2}
      children={props.children}  //eslint-disable-line
    />
  );
};

export default CheckBlock;

