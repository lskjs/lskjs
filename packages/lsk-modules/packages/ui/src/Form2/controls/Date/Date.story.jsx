import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Date from './Date';
import FormDebug from '../../FormDebug';

const DateFormView = (props) => {
  return (
    <Form>
      <div style={{ position: 'relative' }}>
        <Field {...props.controls.date} />
        <Field {...props.controls.date2} />
        <FormDebug {...props} />
      </div>
    </Form>
  );
};

const DateForm = createForm({
  view: DateFormView,
  controls: {
    date: {
      title: 'Date',
      component: Date,
      ranged: true,
      futureOnly: true,
    },
    date2: {
      title: 'Date',
      component: Date,
      futureOnly: true,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Date ', () => {
      return (
        <Story>
          <DateForm />
        </Story>
      );
    });
