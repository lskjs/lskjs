import React from 'react';
import { Form, Field } from 'formik';

import Story from '../../../Story';

import createForm from '../../createForm';
// import FormDebug from '../../FormDebug';

import Input from '../../controls/Input';
import Select from '../../controls/Select';
import Textarea from '../../controls/Textarea';
import PhoneInput from '../../controls/PhoneInput';

const FormExample3View = (props) => {
  // console.log('props.controls.input', props.controls.input);
  return (
    <Form>
      <Field {...props.controls.email} />
      <Field {...props.controls.password} />
      <Field {...props.controls.name} />
      <Field {...props.controls.role} />
      <Field {...props.controls['info.phone']} />
      <Field {...props.controls['info.comment']} />
      <Field {...props.controls['info.referrer']} />
    </Form>
  );
};

export const FormExample3 = createForm({
  view: FormExample3View,
  controls: {
    email: {
      component: Input,
      title: 'field.email',
      required: true,
      type: 'email',
    },
    password: {
      component: Input,
      title: 'authPage.passwordField',
      required: true,
      type: 'password',
    },
    name: {
      component: Input,
      title: 'authPage.nameField',
      required: true,
      placeholder: 'authPage.namePlaceholder',
    },
    role: {
      component: Select,
      title: 'authPage.roleField',
      options: ['owner', 'professional', 'other'].map(value => ({
        value,
        title: `roles.${value}`,
      })),
      required: true,
      placeholder: 'event.eventsPageFilter',
    },
    'info.phone': {
      component: PhoneInput,
      title: 'authPage.phoneField',
      required: true,
    },
    'info.comment': {
      component: Textarea,
      title: 'authPage.commentField',
      placeholder: 'authPage.commentPlaceholder',
      minRows: 6,
    },
    'info.referrer': {
      component: Textarea,
      title: 'authPage.referrerField',
      minRows: 6,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/examples', module)
    .add('FormExample3', () => {
      return (
        <Story>
          <FormExample3 />
        </Story>
      );
    });
