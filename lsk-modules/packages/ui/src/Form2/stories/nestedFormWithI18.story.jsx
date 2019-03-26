import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../Story';
import createFormWithI18 from '../createFormWithI18';
import FormDebug from '../FormDebug';

import Input from '../controls/Input';
import Select from '../controls/Select';
import ArrayOf from '../controls/ArrayOf';
import createNestedFormControl from '../createNestedFormControl';


const EntityFormView = (props) => {
  return (
    <Form>
      <h3>EntityForm:</h3>
      <Field {...props.controls.name} />
      <Field {...props.controls.money} />
      <Field {...props.controls.gender} />
    </Form>
  );
};

const EntityForm = createFormWithI18(() => ({
  view: EntityFormView,
  controls: {
    name: {
      title: 'Name',
      component: Input,
    },
    money: {
      title: 'Money',
      component: Input,
      type: 'number',
    },
    gender: {
      title: 'Gender',
      component: Select,
      options: ['male', 'female'],
    },
  },
}));


const ComplexFormView = (props) => {
  return (
    <Form>
      <h3>ArrayOfEntityForm:</h3>
      <Field {...props.controls.title} />
      <Field {...props.controls.director} />
      <Field {...props.controls.users} />
      <FormDebug {...props} />
    </Form>
  );
};

const ComplexForm = createFormWithI18(() => ({
  view: ComplexFormView,
  controls: {
    title: {
      title: 'Номер группы',
      component: Input,
    },
    director: {
      title: 'Директор',
      // component: Input,
      component: createNestedFormControl(EntityForm),
    },
    users: {
      title: 'Ученики',
      component: ArrayOf,
      itemComponent: createNestedFormControl(EntityForm),
      showAddButton: true,
    },
  },
}));

export default ({ storiesOf }) =>
  storiesOf('Form2/nestedForm', module)
    .add('EntityForm i18', () => {
      return (
        <Story devtools>
          <EntityForm />
        </Story>
      );
    })
    .add('ComplexForm i18', () => {
      return (
        <Story devtools>
          <ComplexForm />
        </Story>
      );
    });

