import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import InputComponent from '../Input';
import CheckBlock from './CheckBlock';
import FormDebug from '../../FormDebug';


const CheckBlockViewForm = (props) => {
  return (
    <Form>
      <Field {...props.controls.checkBlock} />
      <FormDebug {...props} />
    </Form>
  );
};

const CheckBlockForm = createForm({
  view: CheckBlockViewForm,
  controls: {
    checkBlock: {
      title: 'checkBlock',
      component: CheckBlock,
      label: 'test',
      info: 'this is info',
      children: 'This is children',
      block: true,
    },
    input: {
      title: 'Input',
      component: InputComponent,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('CheckBlock ', () => {
      return (
        <Story>
          <CheckBlockForm />
        </Story>
      );
    });
