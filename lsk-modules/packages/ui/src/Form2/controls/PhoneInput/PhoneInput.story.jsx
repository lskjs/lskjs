import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import PhoneInput from './PhoneInput';
import FormDebug from '../../FormDebug';

const PhoneInputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.phoneInput} />
      <FormDebug {...props} />
    </Form>
  );
};

const PhoneInputForm = createForm({
  view: PhoneInputFormView,
  controls: {
    phoneInput: {
      title: 'PhoneInput',
      component: PhoneInput,
      defaultCountry: 'ru',
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('PhoneInput ', () => {
      return (
        <Story>
          <PhoneInputForm />
        </Story>
      );
    });
