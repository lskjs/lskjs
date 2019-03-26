import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import FormDebug from '../FormDebug';

const InputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.notFound} />
      <FormDebug {...props} />
    </Form>
  );
};

const DemoForm = createForm({
  view: InputFormView,
  controls: {
    login: {
      title: 'Login',
      component: Input,
    },
    password: {
      title: 'Password',
      component: Input,
      type: 'password',
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2', module)
    .add('controlNotFound', () => {
      return (
        <Story>
          <DemoForm
            onSubmit={(values) => { console.log({ values }); }}
          />
        </Story>
      );
    });

