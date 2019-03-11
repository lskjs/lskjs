import styled from '@emotion/styled'

export default styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: ${p => p.theme.fontFamily};
  padding: 18px 0 0;
  margin-top: 18px;
  border-top: 1px solid ${p => p.theme.colors.border};
`;
