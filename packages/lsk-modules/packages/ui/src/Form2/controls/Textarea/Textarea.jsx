import React from 'react';
import Textarea from 'react-textarea-autosize';
import get from 'lodash/get';
import Input from '../../../Input';

const TextArea = ({
  field,
  form,
  ...props
}) => {
  const hasError = field && field.name && !!get(form, `errors.${field.name}`);
  return (
    <Input
      {...field}
      debounce={0}
      {...props}
      block
      // validationState={this.getError(field.name).state}
      componentClass={Textarea}
      style={{ border: hasError ? '1px solid red' : '' }}
      // value={this.getFieldValue(field.name)}
      onChange={(value) => {
          form.setFieldValue(field.name, value);
        }}
    />
  );
};

export default TextArea;

