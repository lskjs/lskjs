import React from 'react';
import debounce from 'lodash.debounce';
import RangeBase from '../../../UI/molecules/RangeGroup';

const Range = ({
  field,
  form,
  ...props
}) => {
  let debounceFunction;
  const handleChange = (value) => {
    return () => {
      form.setFieldValue(field.name, value);
    };
  };
  return (
    <RangeBase
      {...field}
      {...props}
      value={field.value}
      validationState={form.errors[field.name] ? 'error' : null}
      onChange={(value) => {
        if (debounceFunction && debounceFunction.cancel) {
          debounceFunction.cancel();
        }
        debounceFunction = debounce(handleChange(value), 3000);
        debounceFunction();
      }}
    />
  );
};

export default Range;
