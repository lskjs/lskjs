import React from 'react';
import { Form, Field } from 'formik';
// import { ValueContainer as DefaultValueContainer } from 'react-select/lib/components/containers';
import CheckBlank from 'react-icons2/mdi/checkbox-blank-outline';
import CheckMarked from 'react-icons2/mdi/checkbox-marked';
import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import RadioSelected from 'react-icons2/mdi/checkbox-marked-circle';
import range from 'lodash/range';
import keys from 'lodash/keys';

import Story from '../../../Story';
import createForm from '../../createForm';
import FormDebug from '../../FormDebug';
import Select from './Select';
import FlagIcon from '../../../UI/organisms/FlagIcon';
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
      <hr />
      <h1>Мультиселекты</h1>
      <Field {...props.controls.multiselect} />
      <Field {...props.controls.multiselect2} />
      <Field {...props.controls.multiselect3} />
      <Field {...props.controls.checkboxes} />
      <hr />
      <h1>Асинхронные селекты</h1>
      <Field {...props.controls.asyncSelect} />
      <Field {...props.controls.asyncSelect2} />
      <hr />
      <h1>Кастомный дизайн</h1>
      <Field {...props.controls.games} />
      <Field {...props.controls.games2} />
      <Field {...props.controls.flag} />
      <Field {...props.controls.countries} />
      <Field {...props.controls.userSelect} />
      <hr />
      <hr />
      <hr />
      <select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <FormDebug {...props} />
    </Form>
  );
};

const countriesList = {
  AU: 'Австралия',
  AT: 'Австрия',
  AZ: 'Азербайджан',
  AX: 'Аландские острова',
  AL: 'Албания',
  DZ: 'Алжир',
  VI: 'Виргинские Острова (США)',
  AS: 'Американское Самоа',
  AI: 'Ангилья',
  AO: 'Ангола',
  AD: 'Андорра',
  AQ: 'Антарктида',
  AG: 'Антигуа и Барбуда',
  AR: 'Аргентина',
  AM: 'Армения',
  AW: 'Аруба',
  AF: 'Афганистан',
  BS: 'Багамы',
  BD: 'Бангладеш',
  BB: 'Барбадос',
  BH: 'Бахрейн',
  BZ: 'Белиз',
  BY: 'Беларусь',
  BE: 'Бельгия',
  BJ: 'Бенин',
  BM: 'Бермуды',
  BG: 'Болгария',
  BO: 'Боливия',
  BQ: 'Бонэйр, Синт-Эстатиус и Саба',
  BA: 'Босния и Герцеговина',
  BW: 'Ботсвана',
  BR: 'Бразилия',
  IO: 'Британская территория в Индийском океане',
  VG: 'Виргинские Острова (Великобритания)',
  BN: 'Бруней',
  BF: 'Буркина-Фасо',
  BI: 'Бурунди',
  BT: 'Бутан',
  VU: 'Вануату',
  VA: 'Ватикан',
  GB: 'Великобритания',
  HU: 'Венгрия',
  VE: 'Венесуэла',
  UM: 'Внешние малые острова (США)',
  TL: 'Восточный Тимор',
  VN: 'Вьетнам',
  GA: 'Габон',
  HT: 'Гаити',
  GY: 'Гайана',
  GM: 'Гамбия',
  GH: 'Гана',
  GP: 'Гваделупа',
  GT: 'Гватемала',
  GF: 'Гвиана',
  GN: 'Гвинея',
  GW: 'Гвинея-Бисау',
  DE: 'Германия',
  GG: 'Гернси',
  GI: 'Гибралтар',
  HN: 'Гондурас',
  HK: 'Гонконг',
  GD: 'Гренада',
  GL: 'Гренландия',
  GR: 'Греция',
  GE: 'Грузия',
  GU: 'Гуам',
  DK: 'Дания',
  JE: 'Джерси',
  DJ: 'Джибути',
  DM: 'Доминика',
  DO: 'Доминиканская Республика',
  CD: 'Демократическая Республика Конго',
  EG: 'Египет',
  ZM: 'Замбия',
  EH: 'САДР',
  ZW: 'Зимбабве',
  IL: 'Израиль',
  IN: 'Индия',
  ID: 'Индонезия',
  JO: 'Иордания',
  IQ: 'Ирак',
  IR: 'Иран',
  IE: 'Ирландия',
  IS: 'Исландия',
  ES: 'Испания',
  IT: 'Италия',
  YE: 'Йемен',
  CV: 'Кабо-Верде',
  KZ: 'Казахстан',
  KY: 'Острова Кайман',
  KH: 'Камбоджа',
  CM: 'Камерун',
  CA: 'Канада',
  QA: 'Катар',
  KE: 'Кения',
  CY: 'Кипр',
  KG: 'Киргизия',
  KI: 'Кирибати',
  TW: 'Китайская Республика',
  KP: 'КНДР (Корейская Народно-Демократическая Республика)',
  CN: 'КНР (Китайская Народная Республика)',
  CC: 'Кокосовые острова',
  CO: 'Колумбия',
  KM: 'Коморы',
  CR: 'Коста-Рика',
  CI: 'Кот-д’Ивуар',
  CU: 'Куба',
  KW: 'Кувейт',
  CW: 'Кюрасао',
  LA: 'Лаос',
  LV: 'Латвия',
  LS: 'Лесото',
  LR: 'Либерия',
  LB: 'Ливан',
  LY: 'Ливия',
  LT: 'Литва',
  LI: 'Лихтенштейн',
  LU: 'Люксембург',
  MU: 'Маврикий',
  MR: 'Мавритания',
  MG: 'Мадагаскар',
  YT: 'Майотта',
  MO: 'Макао',
  MK: 'Македония',
  MW: 'Малави',
  MY: 'Малайзия',
  ML: 'Мали',
  MV: 'Мальдивы',
  MT: 'Мальта',
  MA: 'Марокко',
  MQ: 'Мартиника',
  MH: 'Маршалловы Острова',
  MX: 'Мексика',
  FM: 'Микронезия',
  MZ: 'Мозамбик',
  MD: 'Молдавия',
  MC: 'Монако',
  MN: 'Монголия',
  MS: 'Монтсеррат',
  MM: 'Мьянма',
  NA: 'Намибия',
  NR: 'Науру',
  NP: 'Непал',
  NE: 'Нигер',
  NG: 'Нигерия',
  NL: 'Нидерланды',
  NI: 'Никарагуа',
  NU: 'Ниуэ',
  NZ: 'Новая Зеландия',
  NC: 'Новая Каледония',
  NO: 'Норвегия',
  AE: 'ОАЭ',
  OM: 'Оман',
  BV: 'Остров Буве',
  IM: 'Остров Мэн',
  CK: 'Острова Кука',
  NF: 'Остров Норфолк',
  CX: 'Остров Рождества',
  PN: 'Острова Питкэрн',
  SH: 'Острова Святой Елены, Вознесения и Тристан-да-Кунья',
  PK: 'Пакистан',
  PW: 'Палау',
  PS: 'Государство Палестина',
  PA: 'Панама',
  PG: 'Папуа — Новая Гвинея',
  PY: 'Парагвай',
  PE: 'Перу',
  PL: 'Польша',
  PT: 'Португалия',
  PR: 'Пуэрто-Рико',
  CG: 'Республика Конго',
  KR: 'Республика Корея',
  RE: 'Реюньон',
  RU: 'Россия',
  RW: 'Руанда',
  RO: 'Румыния',
  SV: 'Сальвадор',
  WS: 'Самоа',
  SM: 'Сан-Марино',
  ST: 'Сан-Томе и Принсипи',
  SA: 'Саудовская Аравия',
  SZ: 'Свазиленд',
  MP: 'Северные Марианские Острова',
  SC: 'Сейшельские Острова',
  BL: 'Сен-Бартелеми',
  MF: 'Сен-Мартен',
  PM: 'Сен-Пьер и Микелон',
  SN: 'Сенегал',
  VC: 'Сент-Винсент и Гренадины',
  KN: 'Сент-Китс и Невис',
  LC: 'Сент-Люсия',
  RS: 'Сербия',
  SG: 'Сингапур',
  SX: 'Синт-Мартен',
  SY: 'Сирия',
  SK: 'Словакия',
  SI: 'Словения',
  SB: 'Соломоновы Острова',
  SO: 'Сомали',
  SD: 'Судан',
  SR: 'Суринам',
  US: 'США',
  SL: 'Сьерра-Леоне',
  TJ: 'Таджикистан',
  TH: 'Таиланд',
  TZ: 'Танзания',
  TC: 'Теркс и Кайкос',
  TG: 'Того',
  TK: 'Токелау',
  TO: 'Тонга',
  TT: 'Тринидад и Тобаго',
  TV: 'Тувалу',
  TN: 'Тунис',
  TM: 'Туркмения',
  TR: 'Турция',
  UG: 'Уганда',
  UZ: 'Узбекистан',
  UA: 'Украина',
  WF: 'Уоллис и Футуна',
  UY: 'Уругвай',
  FO: 'Фареры',
  FJ: 'Фиджи',
  PH: 'Филиппины',
  FI: 'Финляндия',
  FK: 'Фолклендские острова',
  FR: 'Франция',
  PF: 'Французская Полинезия',
  TF: 'Французские Южные и Антарктические Территории',
  HM: 'Херд и Макдональд',
  HR: 'Хорватия',
  CF: 'ЦАР',
  TD: 'Чад',
  ME: 'Черногория',
  CZ: 'Чехия',
  CL: 'Чили',
  CH: 'Швейцария',
  SE: 'Швеция',
  SJ: 'Шпицберген и Ян-Майен',
  LK: 'Шри-Ланка',
  EC: 'Эквадор',
  GQ: 'Экваториальная Гвинея',
  ER: 'Эритрея',
  EE: 'Эстония',
  ET: 'Эфиопия',
  ZA: 'ЮАР',
  GS: 'Южная Георгия и Южные Сандвичевы Острова',
  SS: 'Южный Судан',
  JM: 'Ямайка',
  JP: 'Япония',
  XK: 'Косово',
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
      menuIsOpen: true,
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
      // return range(start, start + 10).map(value => ({
      //   value,
      //   id: value,
      //   image: `https://picsum.photos/40/40/?image=${value}`,
      //   title: `User ${value}`,
      // }));
      // },
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
      menuIsOpen: true,
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
            }}
          />
        </Story>
      );
    });
