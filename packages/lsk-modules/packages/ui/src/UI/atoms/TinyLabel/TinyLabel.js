import styled from '@emotion/styled';
import { css } from '@emotion/core';
import removeProps from '../../../utils/removeProps';

const filter = removeProps('div', ['sticky', 'pullRight']);
export default styled(filter)`
  min-width: 12px;
  height: 14px;
  border-radius: 4px;
  background-color: ${p => p.theme.colors.danger};
  font-family: ${p => p.theme.fontFamily};
  font-size: 10px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  padding: 0 4px;
  color: ${p => p.theme.colors.white};
  
  ${p => (p.sticky && css`
    position: absolute;
    top: 4px;
    right: 0;
    box-shadow: 0 0 0 2px #3a3a44;
  `)}
  
  ${p => (p.pullRight && css`
    margin-left: auto;
  `)}
`;
