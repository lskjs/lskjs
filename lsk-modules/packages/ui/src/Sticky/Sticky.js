import styled from '@emotion/styled';

export default styled('div')`
  position: sticky;
  top: ${p => (p.offset || 0)}px;
  z-index: 10;
`;
