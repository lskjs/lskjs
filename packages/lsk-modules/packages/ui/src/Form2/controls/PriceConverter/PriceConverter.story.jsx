import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import PriceConverter from './PriceConverter';
import FormDebug from '../../FormDebug';

const PriceConverterFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.priceConverter} />
      <FormDebug {...props} />
    </Form>
  );
};

const PriceConverterForm = createForm({
  view: PriceConverterFormView,
  controls: {
    priceConverter: {
      title: 'PriceConverter',
      component: PriceConverter,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('PriceConverter ', () => {
      return (
        <Story>
          <PriceConverterForm />
        </Story>
      );
    });
