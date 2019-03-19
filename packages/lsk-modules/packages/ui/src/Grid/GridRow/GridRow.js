import styled from '@emotion/styled';
import { css } from '@emotion/core';
import GridCol from '../GridCol';
import removeProps from '../../utils/removeProps';

const filter = removeProps('div', ['vertical', 'gap']);
export default styled(filter)`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-right: -${p => (p.gap || p.theme.gridGap)}px;
  margin-left: -${p => (p.gap || p.theme.gridGap)}px;

  ${p => (p.vertical && css`
    margin-top: -${p.gap || p.theme.gridGap}px;
    margin-bottom: -${p.gap || p.theme.gridGap}px;
    > ${GridCol} {
      padding-top: ${p.gap || p.theme.gridGap}px;
      padding-bottom: ${p.gap || p.theme.gridGap}px;
      ${p.gap && css`
        padding-left: ${p.gap || p.theme.gridGap}px;
        padding-right: ${p.gap || p.theme.gridGap}px;
      `}
    }
  `)}
`;
