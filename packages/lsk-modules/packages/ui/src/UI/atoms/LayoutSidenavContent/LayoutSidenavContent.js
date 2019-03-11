import styled from '@emotion/styled'

export default styled('div')`
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  overflow: auto;
  overflow-x: hidden;
  border-right: 1px solid rgba(0,0,0,.1);
  font-family: ${p => p.theme.fontFamily};
`;
