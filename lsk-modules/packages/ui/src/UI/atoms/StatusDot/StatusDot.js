import styled from '@emotion/styled';

export default styled('div')`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin: 4px;
  background-color: ${p => (p.color || 'transparent')};
  ${p => (!p.color && 'box-shadow: inset 0 0 0 1px #a7adba;')}
`;
