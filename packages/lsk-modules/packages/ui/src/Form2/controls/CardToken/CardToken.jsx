import React from 'react';
import get from 'lodash/get';
import CardTokenBase from '../../../UI/molecules/CardToken';

const CardToken = ({
  field,
  form,
  ...props
}) => {
  return (
    <CardTokenBase
      {...field}
      {...props}
      onSubmit={(value) => {
        form.setFieldValue(field.name, value);
      }}
    />
  );
};

export default CardToken;

