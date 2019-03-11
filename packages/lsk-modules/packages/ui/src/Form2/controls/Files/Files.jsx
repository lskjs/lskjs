import React from 'react';
import get from 'lodash/get';
import FilesUploaderBase from '../../../UI/molecules/FilesUploader';

const FilesUploader = ({
  field,
  form,
  onError,
  ...props
}) => {
  return (
    <FilesUploaderBase
      {...field}
      {...props}
      validationState={form.errors[field.name] ? 'error' : null}
      onSubmit={(value) => {
        form.setFieldValue(field.name, value);
      }}
      onError={() => onError?.(form.errors[field.name])} // this.globalError
      files={field.value}
      onBlur={e => console.log('bluuuuurr', { e })}
    />
  );
};

export default FilesUploader;

