import React, { Component } from 'react';
import { Form, Field } from 'formik';
import autobind from 'core-decorators/lib/autobind';

import Story from '../../Story';
import createForm from '../createForm';
import Input from '../controls/Input';
import Select from '../controls/Select';
import Tags from '../controls/Tags';
import PhoneInput from '../controls/PhoneInput';
import NewPhoneInput from '../controls/NewPhoneInput';
import FormDebug from '../FormDebug';
import PercentSlider from '../controls/PercentSlider/PercentSlider';
import Files from '../controls/Files';

const InputFormView = (props) => {
  return (
    <Form>
      {/* <Field {...props.controls.input} />
      <Field {...props.controls.input2} /> */}
      <Field {...props.controls.select} />
      <Field {...props.controls.tags} />
      <Field {...props.controls.slider} />
      <Field {...props.controls.phone} />
      <Field {...props.controls.newphone} />
      <Field {...props.controls.files} />
      <FormDebug {...props} />
    </Form>
  );
};


const controls = {
  input: {
    title: 'Input',
    component: Input,
  },
  input2: {
    title: 'Input2',
    component: Input,
  },
  select: {
    title: 'Select',
    component: Select,
    options: ['a', 'b', 'c'],
  },
  tags: {
    title: 'Tags',
    component: Tags,
    flat: true,
    options: ['a', 'b', 'c'],
  },
  slider: {
    title: 'PercentSlider',
    component: PercentSlider,
  },
  sliderlol: {
    title: 'PercenssstSlider',
    component: PercentSlider,
  },
  phone: {
    title: 'PhoneInput',
    component: PhoneInput,
  },
  newphone: {
    title: 'NewPhoneInput',
    component: NewPhoneInput,
  },
  files: {
    title: 'Files',
    component: Files,
  },
};
const SampleForm = createForm({
  view: InputFormView,
  controls,
});

class Container extends Component {
  state = {
    input: 'demo',  // eslint-disable-line
  }
  @autobind
  handleChange(values) {
    this.setState(values);
  }
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <SampleForm
                  enableReinitialize
                  initialValues={this.state}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <SampleForm
                  enableReinitialize
                  initialValues={this.state}
                  onChange={this.handleChange}
                />
              </td>
              <td style={{ verticalAlign: 'top' }}>
                {Object.keys(controls).map((name) => {
                  return (
                    <div>
                      {name} =
                      <button onClick={() => this.setState({ [name]: 0 })}>
                        0
                      </button>
                      <button onClick={() => this.setState({ [name]: 123 })}>
                        123
                      </button>
                      <button onClick={() => this.setState({ [name]: 'asd' })}>
                        asd
                      </button>
                      <button onClick={() => this.setState({ [name]: { asd: 123 } })}>
                        asd: 123
                      </button>
                      <button onClick={() => this.setState({ [name]: ['a', 'b', 'c'] })}>
                        [a, b, c]
                      </button>
                      <button onClick={() => this.setState({ [name]: null })}>
                        null
                      </button>
                      <button onClick={() => this.setState({ [name]: undefined })}>
                        undefined
                      </button>
                      <button onClick={() => { delete this.state[name]; this.setState({ q: 1 }); }}>
                        delete {name}
                      </button>
                      <button onClick={() => this.setState({
                        [name]: [
                        'https://dw.uptodown.com/dwn/Z_SQIHFlzpsI8-OR79LJ_cMbnSKFXC0Amh8WtjryRN0rzoa7YLLXLPiL-UGXAPhtcbp1QZ1m2KrTP4AYtlu-32mI1k0FruO2hVoqO0hjCzHS99b_YeSL0f1xAONfxXWP/g3RDlmmSrc1_UgH-cibZO9tKeALDjytov3wGTjIS_eAzGa5BXEegBikMy_1e3gh9JjDBRBf0mgeVNBHnoQgIgFBtyz4lrCYRKD3YF6hbEseh77Nh7Pw0hA3QjGIomYuS/Ee2E4BJxbyRPM3u9KV2eGpRR2nnXJL890Yn-EFTDgFP9hXquDT0JUBunPJtmtQVT3vxrV3Cxnra8HqHXBXq3GA==/',
                        'https://www.softportal.com/getsoft-24836-instagram-1.html',
                        'https://www.image.ie/images/no-image.png'],
                        })}
                      >
                        files
                      </button>
                    </div>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


export default ({ storiesOf }) =>
  storiesOf('Form2', module)
    .add('reinitialize', () => {
      return (
        <Story>
          <Container />
        </Story>
      );
    });

