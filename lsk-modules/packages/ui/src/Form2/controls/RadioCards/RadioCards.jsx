import React from 'react';
import get from 'lodash/get';
import RadioCardsBase from '../../../UI/molecules/RadioCards/';

const RadioCards = ({
  field,
  form,
  ...props
}) => {
  return (
    <RadioCardsBase
      {...field}
      {...props}
      value={field.value}
      validationState={form.errors[field.name] ? 'error' : null}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
      options={props.options}
    />
  );
};

export default RadioCards;
