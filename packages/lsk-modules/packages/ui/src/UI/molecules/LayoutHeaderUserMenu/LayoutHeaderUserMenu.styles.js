import styled from '@emotion/styled'

export const DropdownLink = styled('a')`
  display: flex !important;
  align-items: center !important;
  text-decoration: none !important;
  height: 100%;
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.darkGray} !important;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none !important;
    color: ${p => p.theme.colors.darkGray} !important;
  }
`;

export const AvatarText = styled('span')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${p => p.theme.fontFamily};
  margin-left: .5rem;
`;
