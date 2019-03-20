import React from 'react'; //eslint-disable-line
import Checkbox from './Checkbox';

module.exports = function ({ storiesOf, action, knob }) {
  return storiesOf('Checkbox', module)
    .addHtml((
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;subset=cyrillic"
        rel="stylesheet"
      />
    ))
    .addHtml(<link href="https://npmcdn.com/antd/dist/antd.css" rel="stylesheet" />)
    .addStyle(`
      .ant-checkbox-inner {
        border: 2px solid #4A4A4A !important;
      }
      .ant-checkbox-checked .ant-checkbox-inner,
      .ant-checkbox-indeterminate .ant-checkbox-inner {
          background-color: #3FC9F2 !important;
          border-color: #3FC9F2 !important;
      }
      .ant-checkbox-wrapper:hover .ant-checkbox-inner,
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input:focus + .ant-checkbox-inner {
          border-color: #3FC9F2 !important;
      }
      .ant-checkbox-wrapper {
        font-weight: 400;
      }
      .ant-checkbox-checked .ant-checkbox-inner:after {
        top: 0 !important;
        left: 3px !important;
      }
    `)
    .add('Default', () => (
      <Checkbox
        onChange={action('onChange')}
        disabled={knob.boolean('Disabled')}
      >
        Checkbox
      </Checkbox>
    ));
};
