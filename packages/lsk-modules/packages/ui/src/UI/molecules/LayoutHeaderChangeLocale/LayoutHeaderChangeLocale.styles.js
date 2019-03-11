import styled from '@emotion/styled'

export default styled('a')`
  display: flex !important;
  align-items: center !important;
  text-decoration: none !important;
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.darkGray} !important;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none !important;
    color: ${p => p.theme.colors.darkGray} !important;
  }
`;
