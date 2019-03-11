import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Image from './Image';
import FormDebug from '../../FormDebug';

const ImageFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.image} />
      <FormDebug {...props} />
    </Form>
  );
};

const ImageForm = createForm({
  view: ImageFormView,
  controls: {
    image: {
      title: 'Image',
      component: Image,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Image ', () => {
      return (
        <Story>
          <ImageForm />
        </Story>
      );
    });
