import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import InputArray from './InputArray';
import FormDebug from '../../FormDebug';

const InputArrayFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.inputArray} />
      <FormDebug {...props} />
    </Form>
  );
};

const InputArrayForm = createForm({
  view: InputArrayFormView,
  controls: {
    inputArray: {
      title: 'InputArray',
      component: InputArray,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('InputArray ', () => {
      return (
        <Story>
          <InputArrayForm />
        </Story>
      );
    });
