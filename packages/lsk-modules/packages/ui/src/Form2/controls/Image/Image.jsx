import React from 'react';
import get from 'lodash/get';
import ImageUploaderBase from '../../../UI/molecules/ImageUploader';

const ImageUploader = ({
  field,
  form,
  onError,
  ...props
}) => {
  return (
    <ImageUploaderBase
      {...field}
      {...props}
      validationState={form.errors[field.name] ? 'error' : null}
      onSubmit={(value) => {
        form.setFieldValue(field.name, value);
      }}
      onError={() => onError?.(form.errors[field.name])} // this.globalError
      value={field.value}
      onBlur={e => console.log('bluuuuurr', { e })}
    />
  );
};

export default ImageUploader;

