import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import Select from '../controls/Select';
import FormDebug from '../FormDebug';

const InputFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.input} />
      <Field {...props.controls.dependent} />
      <Field {...props.controls['test.input']} />
      <Field {...props.controls.input3} />
      <FormDebug {...props} />
    </Form>
  );
};

const InputForm = createForm({
  view: InputFormView,
  controls: {
    input: {
      title: 'Input',
      initialValue: 'one',
      component: Input,
    },
    dependent: {
      key: 'input',
      title: 'Dependent control',
      component: Select,
      options: [
        {
          value: 'one',
        },
        {
          value: 'two',
        },
      ],
    },
    'test.input': {
      key: 'test@input',
      title: 'Not nested field',
      initialValue: 'createForm.controls.initialValue',
      component: Input,
    },
    input3: {
      key: 'test@input',
      title: 'Not nested field',
      initialValue: 'createForm.controls.initialValue',
      component: Input,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2', module)
    .add('nestedKeys', () => {
      return (
        <Story>
          <InputForm
            onChange={(values) => { console.log('onChange', values); }}
            onSubmit={(values) => { console.log('onSubmit', values); }}
          />
        </Story>
      );
    });
