import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import FormDebug from '../FormDebug';

const InputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.input} />
      <FormDebug {...props} />
    </Form>
  );
};

const InputForm = createForm({
  view: InputFormView,
  controls: {
    input: {
      title: 'Input',
      initialValue: 'createForm.controls.initialValue',
      component: Input,
    },
  },
});

const InputForm2 = createForm({
  view: InputFormView,
  controls: {
    input: {
      title: 'Input',
      defaultValue: 'createForm.controls.defaultValue',
      component: Input,
    },
  },
});

const InputForm3 = createForm({
  view: InputFormView,
  controls: {
    input: {
      title: 'Input',
      component: Input,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/initialValues', module)
    .add('createForm control initialValue', () => {
      return (
        <Story>
          <InputForm />
        </Story>
      );
    })
    .add('createForm control defaultValue', () => {
      return (
        <Story>
          <InputForm2 />
        </Story>
      );
    })
    .add('Control.initialValues', () => {
      return (
        <Story>
          <InputForm3
            initialValues={{
              input: 'Control.initialValues',
            }}
          />
        </Story>
      );
    })
    .add('createForm control initialValue + Control.initialValues ', () => {
      return (
        <Story>
          <InputForm
            initialValues={{
              input: 'Control.initialValues',
            }}
          />
        </Story>
      );
    });
