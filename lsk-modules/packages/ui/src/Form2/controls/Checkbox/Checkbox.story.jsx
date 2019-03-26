import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Checkbox from './Checkbox';
import FormDebug from '../../FormDebug';

import T from '../../../T';
import Account from 'react-icons2/mdi/account-box-outline';
import Desktop from 'react-icons2/mdi/desktop-mac';
import Camera from 'react-icons2/mdi/camcorder';


const CheckboxFormView = (props) => {
  return (
    <Form>
      <Checkbox label="test" />
      <Checkbox checked />
      <Checkbox checked={false} />
      <Checkbox value />
      <Checkbox value={false} />
      <Checkbox onChange={value => console.log({ value })} />
      <hr />
      <Field {...props.controls.get('blue')} />
      <Field {...props.controls.get('black')} />
      <Field {...props.controls.get('black')} />
      <hr />
      <Field {...props.controls.get('screen')} />
      <FormDebug {...props} />
    </Form>
  );
};

const CheckboxForm = createForm({
  view: CheckboxFormView,
  controls: {
    blue: {
      component: Checkbox,
      title: 'first value',
      label: '1',
      help: 'help 1',
      tooltip: 'tooltip 1',
    },
    black: {
      component: Checkbox,
      title: 'second value',
      label: '2',
      help: 'help 2',
      tooltip: 'tooltip 2',
    },
    screen: {
      component: Checkbox,
      title: 'videoTypes.screencast',
      label: <span><Desktop /> <T name="videoTypes.screencast" /></span>,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Checkbox ', () => {
      return (
        <Story>
          <CheckboxForm />
        </Story>
      );
    });
