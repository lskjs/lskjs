import React, { Component } from 'react';
import Form from 'antd/lib/form';
import FormError from './FormError';

class FormGroup extends Component {
  render() {
    const {
      field,
      form,
      children,
      htmlId,
      ...props
    } = this.props;
    // console.log({field, props});
    // {errors.twitter &&
    //   touched.twitter &&
    const errorMessage = form && form.errors && form.errors[field.name];
    return (
      <Form.Item
        key={htmlId}
        required={props.required || props._required}
        // label={field.heading ? field.heading.children : props.title}
        // label={props.label ? props.label : props.title}
        label={props.title}
        help={props.help}
        validateStatus={errorMessage ? 'error' : null}
        style={{ textAlign: 'left' }}
      >
        <div id={htmlId} />
        {children}
        {errorMessage && <FormError>{errorMessage}</FormError>}
      </Form.Item>
    );
  }
}

// export const createFormGroup  = () => ()

export default FormGroup;
