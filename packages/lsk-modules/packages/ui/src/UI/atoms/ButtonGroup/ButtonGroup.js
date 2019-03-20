import styled from '@emotion/styled';

export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  > .ant-btn:not(:last-child) {
   margin-right: 8px;
  }
`;
