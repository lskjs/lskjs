import styled from '@emotion/styled';

export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: right;
  color: #${p => p.theme.colors.main};
`;
