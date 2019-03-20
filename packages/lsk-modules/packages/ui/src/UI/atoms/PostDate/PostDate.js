import styled from '@emotion/styled';

export default styled('div')`
  background: ${p => p.theme.colors.white};
  position: absolute;
  top: 0;
  font-family: ${p => p.theme.fontFamily};
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 80%;
`;
