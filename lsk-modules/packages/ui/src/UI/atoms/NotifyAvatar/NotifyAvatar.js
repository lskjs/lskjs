import styled from '@emotion/styled';

export default styled('div')`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => (p.type === 'error' && 'padding: 1px 3px 4px 3px')};
`;
