import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Tag } from 'antd/lib';
import removeProps from '../../../utils/removeProps';

export default styled(removeProps(Tag, ['isHref']))`
  pointer-events: none;
  ${p => (p.isHref && css`
    pointer-events: auto;
    cursor: pointer;
    > a {
      text-decoration: none;
    }
  `)}
  > i {
    pointer-events: auto;
  }
`;
