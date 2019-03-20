// import React from 'react';
// import { ThemeProvider } from 'emotion-theming';
// import CheckBlank from 'react-icons2/mdi/checkbox-blank-outline';
// import CheckMarked from 'react-icons2/mdi/checkbox-marked';
// import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
// import RadioSelected from 'react-icons2/mdi/checkbox-marked-circle';
// import theme from '~/Uapp/Root/theme';
// import CustomSelect from '~/Uapp/components/CustomSelect';
// import CustomImage from '~/icons/ic-telegram';
// import OptionSelect from './OptionSelect';
// import ValueSelect from '../ValueSelect';


// import '../../../Root/Storybook.g.css';


// export default ({ storiesOf }) => {
//   storiesOf('OptionSelect', module)
//     .add('Checkbox', () => (
//       <ThemeProvider theme={theme}>
//         <CustomSelect
//           searchable
//           value
// icon={<CheckBlank />}
// iconActive={<CheckMarked />}
//           iconColor={theme.colors.primary}
//           optionComponent={OptionSelect}
//           valueComponent={ValueSelect}
//           options={[
//             {
//               title: 'first',
//               key: '1',
//               image: 'https://cdn2.iconfinder.com/data/icons/adobe-icons-professional/512/Br.png',
//             },
//             {
//               title: 'second',
//               key: '2',
//             },
//             {
//               title: 'third',
//               key: '3',
//             },
//           ]}
//         />
//       </ThemeProvider>
//     ))
//     .add('Radio', () => (
//       <ThemeProvider theme={theme}>
//         <CustomSelect
//           searchable
//           icon={<RadioBlank />}
//           iconActive={<RadioSelected />}
//           valueComponent={ValueSelect}
//           optionComponent={OptionSelect}
//           options={[
//             {
//               title: 'first',
//               key: '1',
//               image: 'https://cdn2.iconfinder.com/data/icons/adobe-icons-professional/512/Br.png',
//             },
//             {
//               title: 'second',
//               key: '2',
//             },
//             {
//               title: 'third',
//               key: '3',
//             },
//           ]}
//         />
//       </ThemeProvider>
//     ))
//     .add('WithCustomImage', () => (
//       <ThemeProvider theme={theme}>
//         <CustomSelect
//           searchable
//           icon={<RadioBlank />}
//           iconActive={<RadioSelected />}
//           valueComponent={ValueSelect}
//           optionComponent={OptionSelect}
//           options={[
//             {
//               title: 'first',
//               key: '1',
//               image: 'https://cdn2.iconfinder.com/data/icons/adobe-icons-professional/512/Br.png',
//             },
//             {
//               title: 'second',
//               key: '2',
//               image: <CustomImage size={32} />,
//             },
//             {
//               title: 'third',
//               key: '3',
//             },
//           ]}
//         />
//       </ThemeProvider>
//     ))
//     .add('WithCounter', () => (
//       <ThemeProvider theme={theme}>
//         <CustomSelect
//           searchable
//           icon={<CheckBlank />}
//           iconActive={<CheckMarked />}
//           iconColor={theme.colors.primary}
//           optionComponent={OptionSelect}
//           valueComponent={ValueSelect}
//           options={[
//             {
//               title: 'first',
//               key: '1',
//               image: 'https://cdn2.iconfinder.com/data/icons/adobe-icons-professional/512/Br.png',
//             },
//             {
//               title: 'second',
//               key: '2',
//             },
//             {
//               title: 'third',
//               key: '3',
//             },
//           ]}
//         />
//       </ThemeProvider>
//     ))
//     .add('WithoutSearch', () => (
//       <ThemeProvider theme={theme}>
//         <CustomSelect
//           icon={<RadioBlank />}
//           iconActive={<RadioSelected />}
//           valueComponent={ValueSelect}
//           optionComponent={OptionSelect}
//           options={[
//             {
//               title: 'first',
//               key: '1',
//               image: 'https://cdn2.iconfinder.com/data/icons/adobe-icons-professional/512/Br.png',
//             },
//             {
//               title: 'second',
//               key: '2',
//               image: <CustomImage size={32} />,
//             },
//             {
//               title: 'third',
//               key: '3',
//             },
//           ]}
//         />
//       </ThemeProvider>
//     ));
// };
