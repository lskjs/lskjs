import React from 'react';
import FormSubmitButton from './FormSubmitButton';
import FormSubmitError from './FormSubmitError';

export default props => (
  <React.Fragment>
    <FormSubmitError {...props} />
    <FormSubmitButton {...props} />
  </React.Fragment>
);

