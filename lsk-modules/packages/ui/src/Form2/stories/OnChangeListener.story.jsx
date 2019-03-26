import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import FormDebug from '../FormDebug';


const OnChangeView = (props) => {
  return (
    <Form>
      <Field {...props.controls.input} />
      <FormDebug {...props} />
    </Form>
  );
};

const OnChangeForm = createForm({
  view: OnChangeView,
  controls: {
    input: {
      title: 'Input',
      component: Input,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2', module)
    .add('onChange ', () => {
      return (
        <Story>
          <OnChangeForm
            onChange={(values) => {
              console.log('onChange', values);
            }}
          />
        </Story>
      );
    });
