import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import CardToken from './CardToken';


const CardTokenFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.cardToken} />
    </Form>
  );
};

const CardTokenForm = createForm({
  view: CardTokenFormView,
  controls: {
    cardToken: {
      title: 'CardToken',
      component: CardToken,
      options: [
        {
          title: 'asd',
        },
      ],
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('CardToken ', () => {
      return (
        <Story>
          <CardTokenForm />
        </Story>
      );
    });
