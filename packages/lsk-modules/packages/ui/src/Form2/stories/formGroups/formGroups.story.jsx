import React, { Component } from 'react';
import { Form, Field } from 'formik';
import AntForm from 'antd/lib/form';
import Button from 'antd/lib/button';

import Story from '../../../Story';
import DEV from '../../../DEV';
import createForm from '../../createForm';
import FormGroup from '../../FormGroup';
import SimpleFormGroup from '../../SimpleFormGroup';
import Input from '../../controls/Input';
import SimpleInput from './SimpleInput';

const ctrls = {
  input: {
    title: 'input',
    component: Input,
    placeholder: 'offer.placeholders.title',
  },
  input2: {
    title: 'input2',
    required: true,
    component: Input,
    placeholder: 'offer.placeholders.title',
  },
  input3: {
    title: 'input3',
    help: 'help',
    component: SimpleInput,
    placeholder: 'offer.placeholders.title',
  },
};

const FormExampleView = (props) => {
  const {
    handleSubmit,
    controls,
    values,
  } = props;
  return (
    <Form className="ant-form ant-form-horizontal">
      <Field {...controls.input} />
      <Field {...controls.input2} />
      <Field {...controls.input3} />
      <AntForm.Item>
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </AntForm.Item>
      <DEV json={values} />
    </Form>
  );
};

class DebugFormExampleView extends Component {
  state = {
    i: 1,
  };
  render() {
    const {
      handleSubmit,
      controls,
      values,
    } = this.props;
    return (
      <Form>
        <AntForm layout="vertical">
          <Field {...controls.input} />
          <Field {...controls.input2} />
          <Field {...controls.input3} />
          <AntForm.Item>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          </AntForm.Item>
          <hr />
          <DEV json={Math.random()} />
          <button onClick={() => this.setState({ i: this.state.i + 1 })}>{this.state.i}++</button>
          <DEV json={values} />
        </AntForm>
      </Form>
    );
  }
}

const EmptyFormGroupForm = createForm({
  view: DebugFormExampleView,
  controls: ctrls,
  onSubmit: console.log,
});

const FormGroupForm = createForm({
  view: DebugFormExampleView,
  FormGroup,
  controls: ctrls,
  onSubmit: console.log,
});
const FormGroupForm2 = createForm({
  view: FormExampleView,
  FormGroup,
  controls: ctrls,
  onSubmit: console.log,
});

const SimpleFormGroupForm = createForm({
  view: DebugFormExampleView,
  FormGroup: SimpleFormGroup,
  controls: ctrls,
  onSubmit: console.log,
});

export default ({ storiesOf }) =>
  storiesOf('Form2/formGroups', module)
    .add('EmptyFormGroup', () => {
      return (
        <Story>
          <EmptyFormGroupForm />
        </Story>
      );
    })
    .add('FormGroup', () => {
      return (
        <Story>
          <FormGroupForm />
        </Story>
      );
    })
    .add('FormGroupForm2', () => {
      return (
        <Story>
          <FormGroupForm2 />
        </Story>
      );
    })
    .add('SimpleFormGroupForm', () => {
      return (
        <Story>
          <SimpleFormGroupForm />
        </Story>
      );
    })
    .add('form and buttons', () => {
      return (
        <Story>
          <form onSubmit={(e) => { console.log('submit'); e.preventDefault(); }} >
            <button>
              default
            </button>
            <button type="submit">
              submit
            </button>
            <button type="button">
              button
            </button>
          </form>
        </Story>
      );
    });

