import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import PercentSlider from './PercentSlider';
import FormDebug from '../../FormDebug';

const PercentSliderFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.slider} />
      <FormDebug {...props} />
    </Form>
  );
};

const PercentSliderForm = createForm({
  view: PercentSliderFormView,
  initialValues: {
    slider: 10,
  },
  controls: {
    slider: {
      title: 'PercentSlider',
      component: PercentSlider,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('PercentSlider', () => {
      return (
        <Story>
          <PercentSliderForm />
        </Story>
      );
    });

