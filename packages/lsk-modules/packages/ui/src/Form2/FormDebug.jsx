import React from 'react';
import DEV from '../DEV';
import FormSubmit from './FormSubmit';

export default (props) => {
  const {
    touched,
    isSubmitting,
    errors,
    values,
    status,
  } = props;

  return (
    <React.Fragment>
      <hr />
      <FormSubmit {...props}>
        Submit
      </FormSubmit>
      <div />
      <DEV
        json={{
          touched,
          isSubmitting,
          errors,
          values,
          status,
        }}
      />
    </React.Fragment>
  );
};
