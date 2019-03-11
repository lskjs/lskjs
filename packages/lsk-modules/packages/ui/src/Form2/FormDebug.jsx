import React from 'react';
import Form from 'antd/lib/form';
import DEV from '../DEV';
import Button from '../Button';
import getControlHtmlId from './getControlHtmlId';
import FormError from './FormError';

export default (props) => {
  const {
    touched,
    isSubmitting,
    errors,
    values,
    handleSubmit,
    status,
    // controls,
    // ...props
  } = props;

  return (
    <React.Fragment>
      <hr />
      <Form.Item
        validateStatus="error"
      >
        {errors.onSubmit && <FormError id={getControlHtmlId('onSubmit')}>{errors.onSubmit}</FormError>}
        <Button
          paint="primary"
          state={status}
          disabled={!!status}
          onClick={handleSubmit}
        >
          Отправить
        </Button>
      </Form.Item>
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
