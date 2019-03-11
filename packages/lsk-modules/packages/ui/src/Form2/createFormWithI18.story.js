import React from 'react';
import { Form, Field, FastField } from 'formik';
import createFormWithI18 from './createFormWithI18';
import Input from '../Form2/controls/Input';
import Story from '../Story';
import FormDebug from './FormDebug';

const InputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.input} />
      <InputFormNested />
    </Form>
  );
};
const InputFormViewNested = (props) => {
  return (
    <Form>
      <Field {...props.controls.input} />
    </Form>
  );
};

const InputForm = createFormWithI18({
  view: InputFormView,
  initialValues: {
    input: 'createForm.initialValues',
  },
  controls: {
    input: {
      title: 'input',
      component: Input,
      placeholder: 'input placeholder',
      required: true,
    },
  },
});
const InputFormNested = createFormWithI18({
  view: InputFormViewNested,
  initialValues: {
    input: 'createForm.initialValues',
  },
  controls: {
    input: {
      title: 'input',
      component: Input,
      placeholder: 'input placeholder',
      required: true,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/nested form', module)
    .add('createFormWithI18', () => {
      return (
        <Story>
          <InputForm
            initialValues={{}}
          />
        </Story>
      );
    });