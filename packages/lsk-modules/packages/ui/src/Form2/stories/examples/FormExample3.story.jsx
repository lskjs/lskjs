import React from 'react';
import { Form, Field } from 'formik';

import Story from '../../../Story';
import createForm from '../../createForm';
import Input from '../../controls/Input';
import Select from '../../controls/Select';
import Textarea from '../../controls/Textarea';
import PhoneInput from '../../controls/PhoneInput';
import FormDebug from '../../FormDebug';

const FormExample3View = props => (
  <Form>
    <Field {...props.controls.get('email')} />
    <Field {...props.controls.get('password')} />
    <Field {...props.controls.get('name')} />
    <Field {...props.controls.get('role')} />
    <Field {...props.controls.get('info.phone')} />
    <Field {...props.controls.get('info.comment')} />
    <Field {...props.controls.get('info.referrer')} />
    <FormDebug {...props} />
  </Form>
);

export const FormExample3 = createForm({
  view: FormExample3View,
  controls: {
    email: {
      component: Input,
      title: 'Email',
      required: true,
      type: 'email',
      placeholder: 'Your email',
    },
    password: {
      component: Input,
      title: 'Password',
      required: true,
      type: 'password',
      placeholder: '8 chars minimum',
    },
    name: {
      component: Input,
      title: 'Name',
      required: true,
      placeholder: 'Name',
    },
    role: {
      component: Select,
      title: 'Role',
      options: ['customer', 'executor'],
      required: true,
      placeholder: 'Choose your role',
    },
    'info.phone': {
      component: PhoneInput,
      title: 'Phone',
      required: true,
    },
    'info.comment': {
      component: Textarea,
      title: 'Comment',
      placeholder: 'Write something about you',
      minRows: 6,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/examples', module)
    .add('FormExample3', () => {
      return (
        <Story>
          <FormExample3 onSubmit={console.log} />
        </Story>
      );
    });
