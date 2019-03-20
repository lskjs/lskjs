import styled from '@emotion/styled';

export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-weight: 400;
  font-size: 16px;
  padding: 4px;
  color: #2b3032;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
