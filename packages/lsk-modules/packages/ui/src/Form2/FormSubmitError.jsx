import React from 'react';
import If from 'react-if';
import Form from 'antd/lib/form';
import Notice from '../UI/molecules/Notice';
import getControlHtmlId from './createForm/getControlHtmlId';
import FormError from './FormError';

export default ({ errors }) => (
  <Form.Item
    validateStatus={errors ? 'error' : null}
  >
    <If condition={errors.onSubmit}>
      {/* <FormError id={getControlHtmlId('onSubmit')}>{errors.onSubmit}</FormError> */}
      <Notice style={{ marginBottom: 8 }}>
        <FormError id={getControlHtmlId('onSubmit')}>
          {errors.onSubmit}
        </FormError>
        {/* {errors.general} */}
      </Notice>
    </If>
  </Form.Item>
);
