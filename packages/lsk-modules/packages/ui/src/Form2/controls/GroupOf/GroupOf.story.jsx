import React from 'react';
import { Form, Field, FastField } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import GroupOf from './GroupOf';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import Checkblock from '../CheckBlock';
import FormDebug from '../../FormDebug';
import T from '../../../T';
import Account from 'react-icons2/mdi/account-box-outline';
import Desktop from 'react-icons2/mdi/desktop-mac';
import Camera from 'react-icons2/mdi/camcorder';

// import Switcher from '../../../Switcher/Switcher';
// import getOptions from '../../../getOptions';

const RadioFormView = (props) => {
  const colorsControl = props.controls.get('colors');
  // const colorsOptions = getOptions(colorsControl);
  return (
    <Form>
      <Field {...props.controls.get('color')} />
      <Field {...props.controls.get('adtype')} />
      <Field {...props.controls.get('dealType')} />
      <hr />
      <Field {...props.controls.get('colors')} />
      <Field {...props.controls.get('colors2')} />
      <Field
        {...colorsControl}
        render2={({ options }) => (
          <div style={{ border: '1px black solid' }}>
            {options.map(({ Component, option }) => (
              <div style={{ border: `1px ${option.value} dotted` }}><Component /></div>
            ))}
          </div>
        )}
      />
      <hr />
      <Field {...props.controls.get('videoTypes')} itemProps={{ style: { display: 'block' } }} />
      <FormDebug {...props} />
    </Form>
  );
};

const RadioForm = createForm({
  view: RadioFormView,
  controls: {
    // confirm: {
    //   component: Bool,
    //   view: Checkbox,
    //   title: 'Privacy policy',
    // },
    // notification: {
    //   component: Bool,
    //   view: Switcher,
    //   title: 'Enable notifications',
    // },
    // cpm: {
    //   component: Bool,
    //   view: Checkblock,
    //   title: 'Is CPM offer',
    // },
    color: {
      component: GroupOf,
      itemComponent: Radio,
      title: 'Выбор одного элемента',
      required: true,
      options: ['One', 'Two', 'Three'],
    },
    colors: {
      component: GroupOf,
      itemComponent: Checkbox,
      isMulti: true,
      title: 'Выбор цветов',
      required: true,
      options: [
        {
          value: '#ff0000',
          title: 'Red',
          label: 'Red',
        },
        {
          value: '#00ff00',
          title: 'Green',
          label: 'Green',
        },
        {
          value: '#0000ff',
          title: 'Blue',
          label: 'Blue',
        },
      ],
    },
    colors2: {
      key: 'colors',
      component: GroupOf,
      itemComponent: Radio,
      isMulti: true,
      title: 'Очень странный одноразовый выборный',
      required: true,
      options: [
        {
          value: '#ff0000',
          title: 'Red',
          label: 'Red',
        },
        {
          value: '#00ff00',
          title: 'Green',
          label: 'Green',
        },
        {
          value: '#0000ff',
          title: 'Blue',
          label: 'Blue',
        },
      ],
    },
    videoTypes: {
      component: GroupOf,
      isMulti: true,
      title: 'Виды съемки',
      required: true,
      // itemComponent: Checkblock,
      itemComponent: Checkbox,
      options: [
        {
          value: 'screen',
          title: 'videoTypes.screencast',
          label: <span><Desktop /> <T name="videoTypes.screencast" /></span>,
        },
        {
          value: 'camera',
          title: 'videoTypes.camera',
          label: <span><Camera /> <T name="videoTypes.camera" /></span>,

        },
        {
          value: 'webcam',
          title: 'videoTypes.webcamera',
          label: <span><Account /> <T name="videoTypes.webcamera" /></span>,
        },
      ],
    },
    dealType: {
      component: GroupOf,
      itemComponent: Checkblock,
      itemProps: {
        view: 'radio',
        block: true,
      },
      options: [{
        value: 'cpm',
        label: 'CPM',
        info: 'this is info',
      }, {
        value: 'fix',
        label: 'Fix price',
        info: 'this is info',
      }],
    },
    adtype: {
      component: GroupOf,
      itemComponent: Radio,
      options: [
        {
          value: 'screen',
          title: 'videoTypes.screencast',
          label: <span><Desktop /> <T name="videoTypes.screencast" /></span>,
        },
        {
          value: 'camera',
          title: 'videoTypes.camera',
          label: <span><Camera /> <T name="videoTypes.camera" /></span>,

        },
        {
          value: 'webcam',
          title: 'videoTypes.webcamera',
          label: <span><Account /> <T name="videoTypes.webcamera" /></span>,
        },
      ],
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('GroupOf ', () => {
      return (
        <Story>
          <RadioForm />
        </Story>
      );
    });
