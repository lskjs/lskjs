import React from 'react';
import { Form, Field } from 'formik';
import Promise from 'bluebird';
import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import FormDebug from '../FormDebug';

const InputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.login} />
      <Field {...props.controls.password} />
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


function createSubmit(probability = 0.5, delay = 2000) {
  return async (values) => {
    console.log('onSubmit', values);
    await Promise.delay(delay);
    if (Math.random() < probability) {
      console.log('ok');
      return 'ok';
    }
    console.log('error');
    throw 'ERROR';  //eslint-disable-line
  };
}

export default ({ storiesOf }) =>
  storiesOf('Form2/statefulForm', module)
    .add('success', () => {
      return (
        <Story>
          <DemoForm
            onSubmit={createSubmit(1)}
          />
        </Story>
      );
    })
    .add('error', () => {
      return (
        <Story>
          <DemoForm
            onSubmit={createSubmit(0)}
          />
        </Story>
      );
    })
    .add('random 0.5', () => {
      return (
        <Story>
          <DemoForm
            onSubmit={createSubmit(0.5)}
          />
        </Story>
      );
    });

