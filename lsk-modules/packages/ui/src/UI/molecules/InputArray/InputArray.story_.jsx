import InputArray from './InputArray';

module.exports = function ({ storiesOf }) {
  return storiesOf('InputArray', module)
    .addHtml(<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;subset=cyrillic" rel="stylesheet" />) //eslint-disable-line
    .addHtml(<link href="https://npmcdn.com/antd/dist/antd.css" rel="stylesheet" />)
    .add('empty', () => (
      <InputArray />
    ))
    .add('defaultValue', () => (
      <InputArray defaultValue={['val1', 'val2']} />
    ));
};
