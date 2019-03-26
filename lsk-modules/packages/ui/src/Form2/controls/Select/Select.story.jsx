import React from 'react';
import { Form, Field } from 'formik';
// import { ValueContainer as DefaultValueContainer } from 'react-select/lib/components/containers';
import CheckBlank from 'react-icons2/mdi/checkbox-blank-outline';
import CheckMarked from 'react-icons2/mdi/checkbox-marked';
import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import RadioSelected from 'react-icons2/mdi/checkbox-marked-circle';
import range from 'lodash/range';
import keys from 'lodash/keys';

import Modal, { Title, Content } from '../../../Modal2';
import Story from '../../../Story';
import createForm from '../../createForm';
import FormDebug from '../../FormDebug';
import Performance from '../../../DEV/Performance';
import Select from './Select';
import FlagIcon from '../../../UI/organisms/FlagIcon';
import countriesList from '../../../UI/organisms/FlagIcon/countriesList';
import createFormWithI18 from '../../createFormWithI18';

const SelectFormView = (props) => {
  return (
    <Form>
      <h1>Обычные селекты</h1>
      <Field {...props.controls.select} />
      <Field {...props.controls.select2} />
      <Field {...props.controls.select3} />
      <Field {...props.controls.select4} />
      <Field {...props.controls.select5} />
      <Field {...props.controls.radio} />
      <Field {...props.controls.get('info.initialValue')} />
      <Performance name="countries">
        <Field {...props.controls.countries} />
      </Performance>
      <Performance name="countries2">
        <Field {...props.controls.countries} />
      </Performance>
      <Performance name="countries3">
        <Field {...props.controls.countries} />
      </Performance>
      <Performance name="countries4">
        <Field {...props.controls.countries} />
      </Performance>
      <Performance name="countries5">
        <Field {...props.controls.countries} />
      </Performance>
      {/* <hr />
      <h1>Мультиселекты</h1>
      <Field {...props.controls.multiselect} />
      <Field {...props.controls.multiselect2} />
      <Field {...props.controls.multiselect3} />
      <Field {...props.controls.checkboxes} />
      <hr />
      <h1>Асинхронные селекты</h1>
      <Field {...props.controls.asyncSelect} />
      <Field {...props.controls.asyncSelect2} />
      <Field {...props.controls.asyncMultiSelect} />
      <hr />
      <h1>Кастомный дизайн</h1>
      <Field {...props.controls.games} />
      <Field {...props.controls.games2} />
      <Field {...props.controls.flag} />
      <Field {...props.controls.countries} />
      <Field {...props.controls.userSelect} />
      <hr />
      <h1>initialValue - баг</h1>
      <Field {...props.controls.get('info.bug1')} />
      <hr />
      <hr />
      <select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <FormDebug {...props} /> */}
    </Form>
  );
};



// const ValueContainer = ({ children, selectProps, ...props }) => {
//   const chl = [children[0][0] || children[0], children[1]];
//   return (
//     <DefaultValueContainer {...props}>{chl}</DefaultValueContainer>
//   );
// };

const SelectForm = createForm({
  view: SelectFormView,
  controls: {
    select: {
      title: 'The Select',
      placeholder: 'test',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        title: `The ${id}`,
      })),
      // menuIsOpen: true,
    },
    select2: {
      title: 'The Select2: without title',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
      })),
    },
    select3: {
      title: 'The Select3: options as stings',
      component: Select,
      options: ['one', 'two'],
    },
    select4: {
      title: 'The Select4',
      component: Select,
      options: ['one', 'two'],
    },
    select5: {
      title: 'The Large select5',
      component: Select,
      options: range(1, 300),
    },
    // ///
    multiselect: {
      title: 'multiselect: isMulti',
      component: Select,
      isMulti: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
      hideSelectedOptions: false,
      blurInputOnSelect: false,
    },
    multiselect2: {
      title: 'multiselect2: isMulti & hideSelectedOptions',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
    },
    multiselect3: {
      title: 'multiselect3: isMulti & collapsed',
      component: Select,
      isMulti: true,
      collapsed: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
    },
    checkboxes: {
      title: 'checkboxes: isMulti & hideSelectedOptions & collapsed & customView',
      component: Select,
      isMulti: true,
      collapsed: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
      // hideSelectedOptions: false,
    },
    // ///
    radio: {
      title: 'Radio',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
      optionProps: {
        icon: <RadioBlank />,
        iconActive: <RadioSelected />,
        iconColor: '#1890ff',
      },
    },
    userSelect: {
      title: 'The userSelect',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=${id}`,
        title: `User ${id}`,
      })),
    },
    games: {
      title: 'Games',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      blurInputOnSelect: false,
      collapsed: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=1${id}`,
        title: `Game ${id}`,
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
    },
    games2: {
      title: 'Games2: hideSelectedOptions',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=1${id}`,
        title: `Game ${id}`,
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
    },
    flag: {
      title: 'Flag',
      component: Select,
      options: [
        {
          title: 'Russia',
          value: 'one',
          icon: <FlagIcon code="ru" />,
        },
        {
          title: 'Britain',
          value: 'two',
          icon: <FlagIcon code="gb" />,
        },
      ],
    },
    countries: {
      title: 'Countries',
      component: Select,
      options: keys(countriesList).map((value) => {
        return (
          {
            title: value,
            value,
            icon: <FlagIcon code={value} />,
          }
        );
      }),
    },
    // /////
    asyncSelect: {
      title: 'The asyncSelect',
      component: Select,
      async: true,
      loadOption: async value => ({
        value,
        id: value,
        image: `https://picsum.photos/40/40/?image=${value}`,
        title: `User ${value}`,
      }),
      loadOptions: async (searchValue = '') => {
        const start = searchValue.length;
        return new Promise((resolve) => {
          setTimeout(() => resolve(range(start, start + 10).map(value => ({
            value,
            id: value,
            image: `https://picsum.photos/40/40/?image=${value}`,
            title: `User ${value}`,
          }))), 50);
        });
      },
    },
    asyncMultiSelect: {
      title: 'The asyncMultiSelect',
      component: Select,
      async: true,
      isMulti: true,
      loadOption: async (values) => {
        if (Array.isArray(values)) {
          return values.map((value) => {
            return {
              value,
              id: value,
              image: `https://picsum.photos/40/40/?image=${value}`,
              label: `User ${value}`,
            };
          });
        }
        return [];
      },
      loadOptions: async (searchValue = '') => {
        const start = searchValue.length;
        return new Promise((resolve) => {
          setTimeout(() => resolve(range(start, start + 10).map(value => ({
            value,
            id: value,
            image: `https://picsum.photos/40/40/?image=${value}`,
            title: `User ${value}`,
          }))), 50);
        });
      },
    },
    asyncSelect2: {
      title: 'The asyncSelect2',
      component: Select,
      async: true,
      loadOption: async value => ({
        value,
        id: value,
        image: `https://picsum.photos/40/40/?image=${value}`,
        title: `User ${value}`,
      }),
      loadOptions: async (searchValue = '') => {
        const start = searchValue.length;
        return new Promise((resolve) => {
          setTimeout(() => resolve(range(start, start + 10).map(value => ({
            value,
            id: value,
            image: `https://picsum.photos/40/40/?image=${value}`,
            title: `User ${value}`,
          }))), 2000);
        });
      },
    },
    'info.bug1': {
      title: 'offerEdit.type.title',
      component: Select,
      initialValue: 'fixed',
      options: [
        {
          value: 'fixed',
          label: 'offerEdit.type.fixed',
          info: 'offerEdit.type.fixedInfo',
          help: 'offerEdit.type.fixedHelp',
        },
        {
          value: 'cpm',
          label: 'offerEdit.type.cpm',
          info: 'offerEdit.type.cpmInfo',
          help: 'offerEdit.type.cpmHelp',
        },
      ],
    },
    'info.initialValue': {
      component: Select,
      title: 'offerEdit.visibility',
      placeholder: 'offer.placeholders.title',
      format: Boolean,
      initialValue: true,
      options: [
        {
          // icon: <AccountMulti />,
          title: 'offer.type.public',
          description: 'offer.type.publicInfo',
          value: true,
        },
        {
          // icon: <Account />,
          title: 'offer.type.private',
          description: 'offer.type.privateInfo',
          value: false,
        },
      ],
    },
  },
});

const SelectFormWithI18 = createFormWithI18(({ i18 }) => ({
  view: SelectFormView,
  controls: {
    select: {
      title: 'The Select',
      placeholder: 'test',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        title: i18.t(`select.${id}`),
      })),
      // menuIsOpen: true,
    },
    select2: {
      title: 'The Select2: without title',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
      })),
      placeholder: 'placeholder 2',
    },
    select3: {
      title: 'The Select3: options as stings',
      component: Select,
      options: ['one', 'two'],
    },
    select4: {
      title: 'The Select4',
      component: Select,
      options: ['one', 'two'],
      placeholder: 'placeholder',
    },
    // ///
    multiselect: {
      title: 'multiselect: isMulti',
      component: Select,
      isMulti: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
    },
    multiselect2: {
      title: 'multiselect2: isMulti & hideSelectedOptions',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
    },
    multiselect3: {
      title: 'multiselect3: isMulti & collapsed',
      component: Select,
      isMulti: true,
      collapsed: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: i18.t(`User ${id}`),
      })),
    },
    checkboxes: {
      title: 'checkboxes: isMulti & hideSelectedOptions & collapsed & customView',
      component: Select,
      isMulti: true,
      collapsed: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: i18.t(`User ${id}`),
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
      // hideSelectedOptions: false,
    },
    // ///
    radio: {
      title: 'Radio',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        title: `User ${id}`,
      })),
      optionProps: {
        icon: <RadioBlank />,
        iconActive: <RadioSelected />,
        iconColor: '#1890ff',
      },
    },
    userSelect: {
      title: 'The userSelect',
      component: Select,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=${id}`,
        title: `User ${id}`,
      })),
    },
    games: {
      title: 'Games',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      collapsed: true,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=1${id}`,
        title: `Game ${id}`,
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
    },
    games2: {
      title: 'Games2: hideSelectedOptions',
      component: Select,
      isMulti: true,
      hideSelectedOptions: false,
      options: range(1, 11).map(id => ({
        value: id,
        id,
        image: `https://picsum.photos/40/40/?image=1${id}`,
        title: `Game ${id}`,
      })),
      optionProps: {
        icon: <CheckBlank />,
        iconActive: <CheckMarked />,
        iconColor: '#1890ff',
      },
    },
    flag: {
      title: 'Flag',
      component: Select,
      options: [
        {
          title: 'Russia',
          value: 'one',
          icon: <FlagIcon code="ru" />,
        },
        {
          title: 'Britain',
          value: 'two',
          icon: <FlagIcon code="gb" />,
        },
      ],
    },
    // /////
    asyncSelect: {
      title: 'The asyncSelect',
      component: Select,
      async: true,
      loadOption: async value => ({
        value,
        id: value,
        image: `https://picsum.photos/40/40/?image=${value}`,
        title: `User ${value}`,
      }),
      loadOptions: async (searchValue = '') => {
        const start = searchValue.length;
        return new Promise((resolve) => {
          setTimeout(() => resolve(range(start, start + 10).map(value => ({
            value,
            id: value,
            image: `https://picsum.photos/40/40/?image=${value}`,
            title: `User ${value}`,
          }))), 50);
        });
      },
      // return range(start, start + 10).map(value => ({
      //   value,
      //   id: value,
      //   image: `https://picsum.photos/40/40/?image=${value}`,
      //   title: `User ${value}`,
      // }));
      // },
    },
    countries: {
      title: 'Countries',
      component: Select,
      options: keys(countriesList).map((value) => {
        return (
          {
            title: value,
            // title: i18.t(`countries.${value}`),
            value,
            // icon: () => '@', // <FlagIcon code={value} />,
            Icon: () => <FlagIcon code={value} />,
          }
        );
      }),
    },
    asyncSelect2: {
      title: 'The asyncSelect2',
      component: Select,
      async: true,
      loadOption: async value => ({
        value,
        id: value,
        image: `https://picsum.photos/40/40/?image=${value}`,
        title: `User ${value}`,
      }),
      loadOptions: async (searchValue = '') => {
        const start = searchValue.length;
        return new Promise((resolve) => {
          setTimeout(() => resolve(range(start, start + 10).map(value => ({
            value,
            id: value,
            image: `https://picsum.photos/40/40/?image=${value}`,
            title: `User ${value}`,
          }))), 2000);
        });
      },
    },
  },
}));


export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Select ', () => {
      return (
        <Story devtools perf>
          <SelectForm
            initialValues={{
              select4: 'two',
              asyncSelect2: 99,
              asyncSelect: 1,
              asyncMultiSelect: [4],
            }}
          />
        </Story>
      );
    })
    .add('Select with i18', () => {
      return (
        <Story devtools perf>
          <SelectFormWithI18
            initialValues={{
              select4: 'two',
              asyncSelect2: 99,
              // info: {},
            }}
          />
        </Story>
      );
    })
    .add('Modal select', () => {
      return (
        <Story devtools perf>
          <Modal trigger={<div>asd</div>}>
            <Title>asd</Title>
            <Content>
              <SelectForm />
            </Content>
          </Modal>
        </Story>
      );
    });
