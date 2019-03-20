import styled from '@emotion/styled';
import { css } from '@emotion/core';
import AntButton from 'antd/lib/button';

export default styled(AntButton)`
  border: none !important;
  box-shadow: none !important;
  ${p => (p.transparent && css`
    background: transparent !important;
  `)}
  i {
    font-size: 18px !important;
  }
`;
