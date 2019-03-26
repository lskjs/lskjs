import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Calendar from './Calendar';
import FormDebug from '../../FormDebug';

const CalendarFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.calendar1} />
      {/* <Field {...props.controls.calendar2} />
      <Field {...props.controls.calendar3} />
      <Field {...props.controls.calendar4} />
      <Field {...props.controls.calendar5} />
      <Field {...props.controls.calendar6} />
      <Field {...props.controls.calendar7} /> */}
      <FormDebug {...props} />
    </Form>
  );
};

const CalendarForm = createForm({
  view: CalendarFormView,
  controls: {
    calendar1: {
      title: 'Calendar',
      component: Calendar,
      futureOnly: true,
      highlightedDates: [
        new Date('2019-02-15'),
        new Date('2019-02-18'),
        new Date('2019-02-17'),
        '2019-02-02',
        '2019-03-13',
        '2019-02-04',
        '2019-02-13',
        Date.now(),
      ],
    },
    calendar2: {
      title: 'Calendar string date 2019-01-01',
      component: Calendar,
    },
    calendar3: {
      title: 'Calendar invalid date "2019"',
      component: Calendar,
    },
    calendar4: {
      title: 'new Date',
      component: Calendar,
    },
    calendar5: {
      title: 'Date.now()',
      component: Calendar,
    },
    calendar6: {
      title: 'Calendar invalid date in new Date',
      component: Calendar,
    },
    calendar7: {
      title: 'Calendar with undefined',
      component: Calendar,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Calendar ', () => {
      return (
        <Story>
          <CalendarForm
            initialValues={{
              calendar1: null,
              calendar2: '2019-01-01',
              calendar3: '2019',
              calendar4: new Date('2019-01-06'),
              calendar5: new Date('invalid'),
              calendar6: Date.now(),
            }}
            onChange={values => console.log('onChange', values)}
          />
        </Story>
      );
    });
