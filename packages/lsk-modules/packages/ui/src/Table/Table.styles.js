import styled from '@emotion/styled'

export const HeaderRowWrapper = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 12px;
  height: 48px;
  ${p => (p.clickable && `
    cursor: pointer;
  `)}
`;

export const HeaderColWrapper = styled('div')`
  ${p => (p.clickable && `
    cursor: pointer;
  `)}
`;

export const ItemRowWrapper = styled('div')`
  padding: 0 12px;
  height: 56px;
  align-items: center;
  font-family: ${p => p.theme.fontFamily};
  background-color: ${p => p.theme.colors.white};
  transition: background-color .2s ease-out;
  will-change: background-color;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:hover {
    background-color: ${p => p.theme.colors.lighterPrimary};
  }
  ${p => (p.clickable && `
    cursor: pointer;
  `)}
  
`;

export const ItemColWrapper = styled('div')`
  ${p => (p.clickable && `
    cursor: pointer;
  `)}
`;

