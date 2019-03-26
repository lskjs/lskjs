import React from 'react';
import PercentSliderBase from '../../../UI/molecules/PercentSlider';

const PercentSlider = ({
  field,
  form,
  ...props
}) => {
  return (
    <PercentSliderBase
      {...field}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
      {...props}
    />
  );
};

export default PercentSlider;
