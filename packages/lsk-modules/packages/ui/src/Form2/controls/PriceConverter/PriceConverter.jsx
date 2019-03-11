import React from 'react';
import get from 'lodash/get';
import PriceConverterBase from '../../../UI/molecules/PriceConverter';

const PriceConverter = ({
  field,
  form,
  ...props
}) => {
  return (
    <PriceConverterBase
      {...field}
      {...props}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
      value={field.value}
    />
  );
};

export default PriceConverter;

