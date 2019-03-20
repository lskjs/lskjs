import styled from '@emotion/styled';
import { css } from '@emotion/core';

import removeProps from '../../../utils/removeProps';

const filteredTag = removeProps('section', ['padded', 'paint']);

export default styled(filteredTag)`
  line-height: 2.15em;
  font-weight: 600;
  font-family: ${p => p.theme.fontFamily};
  ${p => (p.padded && css`
    padding: 12px 20px;
    font-size: 16px;
    border-bottom: 1px solid transparent;
    font-weight: 500;
  `)}
  ${(p) => {
    switch (p.paint) {
      case 'light':
        return css` 
          background-color: ${p.theme.colors.lightGray}; 
          color: ${p.theme.colors.main};`;
      case 'dark':
        return css` 
          background-color: ${p.theme.colors.black}; 
          color: ${p.theme.colors.white};`;
      case 'primary':
        return css` 
          background-color: ${p.theme.colors.primary}; 
          color: ${p.theme.colors.white};`;
      case 'info':
        return css` 
          background-color: ${p.theme.colors.info}; 
          color: ${p.theme.colors.white};`;
      case 'success':
        return css` 
          background-color: ${p.theme.colors.success}; 
          color: ${p.theme.colors.white};`;
      case 'warning':
        return css` 
          background-color: ${p.theme.colors.warning}; 
          color: ${p.theme.colors.main};`;
      case 'danger':
        return css` 
          background-color: ${p.theme.colors.danger}; 
          color: ${p.theme.colors.white};`;
      default:
        return '';
    }
  }}
`;
