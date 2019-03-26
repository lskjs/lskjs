import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Range from './Range';
import FormDebug from '../../FormDebug';

const RangeFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.range} />
      <FormDebug {...props} />
    </Form>
  );
};

const RangeForm = createForm({
  view: RangeFormView,
  controls: {
    range: {
      title: 'range',
      component: Range,
      min: 0,
      max: 20,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Range ', () => {
      return (
        <Story>
          <RangeForm />
        </Story>
      );
    });
