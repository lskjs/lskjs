import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import isPlainObject from 'lodash/isPlainObject';
// import RadioBase from '../../../Radio';
import RadioBase from './RadioBase';

const NULL_STRING = '@@NULL@@';

const Radio = ({
  field,
  form,
  ...props
}) => {
  const valueBefore = field.name;
  const value = (valueBefore == null) ? NULL_STRING : valueBefore;

  let preOptions = [];
  if (props.options) {
    preOptions = cloneDeep(props.options);
    if (field.sortOptions) {
      preOptions = sortBy(preOptions, 'title');
    }

    if (field.nullOption && field.options) {
      const option = isPlainObject(field.nullOption) ? field.nullOption : {};
      // if (!option.title) option.title = t && t('form.nullOption');
      if (!option.value) option.value = null;
      preOptions.unshift(option);
    }
    // console.log({ preOptions });
    // console.log('field.options', field.options, field);
  }

  const options = preOptions.map(option => ({
    ...option,
    label: option.label || option.title,
    value: option.value == null ? NULL_STRING : option.value,
  }));
  return (
    <RadioBase
      {...field}
      {...props}
      validationState={form.errors[field.name] ? 'error' : null}
      value={value}
      onChange={(val) => {
        form.setFieldValue(field.name, val);
      }}
      options={options}
    >
      {props.title}
    </RadioBase>
  );
};

export default Radio;

