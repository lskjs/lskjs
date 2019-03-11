import React from 'react';
import { Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import Story from '../../../Story';
import createForm from '../../createForm';
import Textarea from './Textarea';
import FormDebug from '../../FormDebug';

const TextareaFormView = (props) => {
  return (
    <Form>
      <Field {...props.controls.textarea} />
      <FormDebug {...props} />
      <Button onClick={props.handleSubmit}>Submit</Button>
    </Form>
  );
};

const TextareaForm = createForm({
  view: TextareaFormView,
  controls: {
    textarea: {
      title: 'textarea',
      component: Textarea,
      type: 'textarea',
      minRows: 5,
      placeholder: 'TextArea',
      required: true,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Textarea ', () => {
      return (
        <Story>
          <TextareaForm />
        </Story>
      );
    });
