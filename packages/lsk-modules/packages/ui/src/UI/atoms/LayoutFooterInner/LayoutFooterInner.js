import styled from '@emotion/styled'

export default styled('div')`
  text-align: center;
  font-family: ${p => p.theme.fontFamily};
  @media screen and (min-width: 768px) {
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
`;
