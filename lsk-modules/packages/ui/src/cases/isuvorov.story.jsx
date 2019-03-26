import React from 'react';
import styled from '@emotion/styled';

import Story from '../Story';
import createDynamicTag from '../utils/createDynamicTag';
import removeProps from '../utils/removeProps';

import Input from '../Input';

const dynamicTag = createDynamicTag('button');
const filteredTag = removeProps(dynamicTag, [
  'new',
  'iconDirection',
  'paint',
  'view',
  'size',
  'block',
  'auto',
  'onlyIcon',
  'twoIcons',
  'bordered',
]);


const Btn = styled(filteredTag)`
  background-color: #a0a0a0;
  border: none;
  outline: none;
  border-radius: ${p => p.theme.borderSmall};
  overflow: hidden;
  position: relative;
  text-align: center;
  justify-content: center;
  pointer-events: auto;
  -webkit-appearance: none !important;
`;


export default ({ storiesOf }) => (
  storiesOf('example', module)
    .add('isuvorov', () => (
      <Story>
        <Btn
          componentClass="button"
          // componentClass={Button}
          some="some"
          fullWidth

        >
          isuvorov
        </Btn>
        <Input
          componentClass="input"
        />
      </Story>
    ))
);
