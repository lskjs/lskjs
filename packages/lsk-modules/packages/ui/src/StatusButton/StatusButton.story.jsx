// import React from 'react'; //eslint-disable-line
// import StatusButton from './StatusButton';
// import TestPromise from './test/TestPromise';

// export default ({ storiesOf, action, knob }) => {
//   return storiesOf('StatusButton', module)
//     .addHtml(<link rel="stylesheet" type="text/css" href="https://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />)
//     .add('--API', () => (
//       <StatusButton
//         onClick={action('onClick')}
//         bsStyle="info"
//         status={knob.text('status=null|loading|success|error', null)}
//         children={knob.text('children', 'Sample content')}
//       />
//     ))
//     .add('Default', () => (
//       <StatusButton onClick={action('onClick')}>Status Button</StatusButton>
//     ))
//     .add('Loading', () => (
//       <StatusButton onClick={action('onClick')} status="loading">Click me!</StatusButton>
//     ))
//     .add('Success', () => (
//       <StatusButton onClick={action('onClick')} status="success">Click me!</StatusButton>
//     ))
//     .add('Error', () => (
//       <StatusButton onClick={action('onClick')} status="error">Click me!</StatusButton>
//     ))
//     .add('Promise success', () => (
//       <TestPromise
//         promiseTimeout={knob.number('promiseTimeout', 1000)}
//         timeout={knob.number('timeout', 2000)}
//       >
//         Click me!
//       </TestPromise>
//     ))
//     .add('Promise error', () => (
//       <TestPromise
//         error
//         promiseTimeout={knob.number('promiseTimeout', 1000)}
//         timeout={knob.number('timeout', 2000)}
//       >
//         Click me!
//       </TestPromise>
//     ))
//     .add('Bootstrap styles', () => (
//       <StatusButton
//         onClick={action('onClick')}
//         bsStyle={knob.text('bsStyle', 'info')}
//         bsSize={knob.text('bsSize', 'large')}
//       >
//         {knob.text('children', 'Bootstrap styled button')}
//       </StatusButton>
//     ))
//     .add('Change tag=button', () => (
//       <StatusButton tag={knob.text('tag', 'button')} status="error">Click me!</StatusButton>
//     ));
//     .add('Random behaviour', () => {
//       return (<StatusButton bsSize="large" promise2={1}>
//         Рандомно ведущая себя кнопка
//       </StatusButton>);
//     });
// };
