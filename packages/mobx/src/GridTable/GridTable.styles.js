import styled, { css } from 'react-emotion';
import createDynamicTag from '@lskjs/utils/createDynamicTag';

export const Header = styled('div')`
  display: grid;
  /* background-color: ${p => getTheme(p.theme, 'colors.white')};
  
  > * {
    border-bottom: 1px solid ${p => getTheme(p.theme, 'colors.border')};
  }
  
  ${p => (p.sticky && css`
    position: sticky;
    top: ${p.offset || 0}px;
    z-index: 10;
  `)} */
`;

const dynamicThTag = createDynamicTag('div');
export const Th = styled(dynamicThTag)`
  /* font-family: ${p => getTheme(p.theme, 'fontFamily')};
  font-size: 11px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.27;
  overflow: hidden;
  letter-spacing: -0.1px;
  color: ${p => getTheme(p.theme, 'colors.main')};
  display: flex;
  align-items: center;
  outline: none;
  background: none;
  border: none;
  padding: 0; */
  grid-column: ${p => (p.column || 1)};
  grid-row: ${p => (p.row || 1)};
`;

export const Body = styled('div')`
  display: grid;
`;

export const Tr = styled('div')`
  display: grid;
  grid-column-gap: ${p => p.gap}px;
  grid-auto-rows: ${p => p.height}px;
  grid-template-columns: ${(p) => {
    if (p.auto) {
      return `repeat(${p.columns.length} 1fr)`;
    }
    const str = p.columns.join(' ');
    return str;
  }};
  
  /* align-items: center; */
`;

export const Td = styled('div')`
  /* display: flex;
  align-items: center;
  overflow: hidden; */
  
  grid-column: ${p => (p.column || 1)};
  grid-row: ${p => (p.row || 1)};
  
  /* font-family: ${p => getTheme(p.theme, 'fontFamily')};
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: -0.1px;
  color: ${p => getTheme(p.theme, 'colors.main')}; */
  justify-content: ${(p) => {
    switch (p.align) {
      case 'right': return 'flex-end';
      case 'center': return 'center';
      default: return 'flex-start';
    }
  }};
`;

export const ArrowWrapper = styled('div')`
  /* display: flex;
  font-size: 13px;
  height: 14px;
  margin: 0 4px;
  color: ${p => getTheme(p.theme, 'colors.primary')};

  transition: transform .2s ease, opacity .2s ease;
  will-change: transform, opacity;

  opacity: 0;
  > svg {
    display: flex;
  }
  ${p => (p.visible && `
    opacity: 1 !important;
  `)}
  ${p => (p.inverse && `
    transform: rotate(180deg);
  `)} */
`;
