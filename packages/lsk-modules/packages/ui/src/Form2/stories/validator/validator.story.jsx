import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import InputComponent from '../../controls/Input';
import FormDebug from '../../FormDebug';


const ValidationView = (props) => {
  const {
    isSubmitting,
    controls,
  } = props;
  return (
    <Form>
      <Field {...controls.email} disabled={isSubmitting} />
      <Field {...controls.password} disabled={isSubmitting} />
      <FormDebug {...props} />
    </Form>
  );
};

const Validation = createForm({
  view: ValidationView,
  controls: {
    email: {
      title: 'email',
      component: InputComponent,
      placeholder: 'email placeholder',
      type: 'text',
      validator: {
        presence: {
          allowEmpty: false,
        },
      },
    },
    password: {
      title: 'password',
      component: InputComponent,
      placeholder: 'password placeholder',
      type: 'password',
      validator: {
        presence: {
          allowEmpty: false,
        },
      },
    },
  },
});


export default ({ storiesOf }) =>
  storiesOf('Form2/validator', module)
    .add('Validation with validate.js', () => {
      return (
        <Story>
          <Validation
            onSubmit={(values) => {
              console.log({ values });
            }}
          />
        </Story>
      );
    });
