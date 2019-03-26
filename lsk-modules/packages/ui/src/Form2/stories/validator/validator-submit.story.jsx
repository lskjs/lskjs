import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Input from '../../controls/Input';
import FormDebug from '../../FormDebug';

const ValidationView = (props) => {
  const {
    status,
    controls,
  } = props;
  return (
    <Form>
      <Field {...controls.email} disabled={!!status} />
      <Field {...controls.password} disabled={!!status} />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <FormDebug {...props} />
    </Form>
  );
};

const ValidationAsync = createForm({
  view: ValidationView,
  controls: {
    email: {
      title: 'email',
      component: Input,
      help: 'email help',
      placeholder: 'email async placeholder',
    },
    password: {
      title: 'password',
      component: Input,
      placeholder: 'password placeholder',
      type: 'password',
      help: 'password help',
      required: true,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/validator', module)
    .add('validator and submit', () => {
      return (
        <Story>
          <ValidationAsync
            onSubmit={async (values) => {
              throw new Error('Емейл уже есть в базе')
              await Promise.delay(3000);
              if (Math.random() < 0.5) {
                throw 'Емейл уже есть в базе'
              }
            }}
          />
        </Story>
      );
    });
