import React from 'react';
import PropTypes from 'prop-types';
import Files from '../../../UI/molecules/Files';

import DefaultBody from './DefaultBody';
import DefaultFooter from './DefaultFooter';

const FilesUploader = ({
  field,
  form,
  onError,
  components,
  isMulti,
  ...props
}) => {
  const Body = components.Body || FilesUploader.defaultProps.components.Body;
  const Footer = components.Footer || FilesUploader.defaultProps.components.Footer;
  return (
    <Files
      {...field}
      {...props}
      multiple={isMulti}
      onSubmit={value => form.setFieldValue(field.name, value)}
      onError={() => onError?.(form.errors[field.name])} // this.globalError
      validationState={form.errors[field.name] ? 'error' : null}
      // files={field.value}
      onBlur={null}
      footer={Footer}
    >
      {Body}
    </Files>
  );
};

FilesUploader.propTypes = {
  components: PropTypes.shape({
    Body: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Footer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
};

FilesUploader.defaultProps = {
  components: {
    Body: DefaultBody,
    Footer: DefaultFooter,
  },
};

export default FilesUploader;
