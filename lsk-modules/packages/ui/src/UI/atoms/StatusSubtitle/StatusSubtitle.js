import styled from '@emotion/styled';

export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 11px;
  letter-spacing: -0.1px;
  text-align: right;
  color: #4a4a4a;
  color: #${p => p.theme.colors.main};
`;
