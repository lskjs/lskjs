import styled from '@emotion/styled';

export default styled('div')`
  font-size: 11px;
  letter-spacing: -0.1px;
  text-align: left;
  color: #${p => p.theme.colors.main};
  font-family: ${p => p.theme.fontFamily};
`;
