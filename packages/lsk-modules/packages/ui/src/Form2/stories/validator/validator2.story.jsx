import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Input from '../../controls/Input';
import FormDebug from '../../FormDebug';

const ValidationView = (props) => {
  const {
    controls,
  } = props;
  return (
    <Form>
      <Field {...controls.password} />
      <Field {...controls.password2} />
      <FormDebug {...props} />
    </Form>
  );
};

const Validation = createForm({
  view: ValidationView,
  validate: (values, form) => {
    console.log('validate', values, form);
    return {
      password: 'error in validate',
    };
    // form.setFieldError('password', 'error in validate');
  },
  controls: {
    password: {
      title: 'password',
      component: Input,
      placeholder: 'password placeholder',
      type: 'password',
      require: true,
    },
    password2: {
      title: 'password2',
      component: Input,
      placeholder: 'password placeholder',
      type: 'password',
      require: true,
    },
  },
});


export default ({ storiesOf }) =>
  storiesOf('Form2/validator', module)
    .add('Validation2', () => {
      return (
        <Story>
          <Validation
            onSubmit={(values, form) => {
              console.log('onSubmit', values, form);
              form.setFieldError('password2', 'error in onSubmit');
              // form.setErrors({ password: 'dfhdkgjhjl' });
              console.log({ values });
            }}
          />
        </Story>
      );
    });
