import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Rating from './Rating';
import FormDebug from '../../FormDebug';

const RatingFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.rating} />
      <FormDebug {...props} />
    </Form>
  );
};

const RatingForm = createForm({
  view: RatingFormView,
  controls: {
    rating: {
      title: 'Rating',
      component: Rating,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Rating ', () => {
      return (
        <Story>
          <RatingForm />
        </Story>
      );
    });
