import styled from '@emotion/styled';
import { css } from '@emotion/core';
import creacteDynamicTag from '../../../utils/createDynamicTag';
import removeProps from '../../../utils/removeProps';

const dynamicTag = creacteDynamicTag('div');
const filteredTag = removeProps(dynamicTag, ['padded', 'paint']);

const paintColors = (p) => {
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
    case 'nobackground':
      return css`
        background-color: transparent;
        color: ${p.theme.colors.main}; `;
    case 'transparent':
      return css`
      background-color: transparent;
      color: ${p.theme.colors.main};
      border: 1px solid transparent; `;
    default:
      return css` 
        background-color: ${p.theme.colors.white}; 
        color: ${p.theme.colors.main}; `;
  }
};

export default styled(filteredTag)`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: ${p => p.theme.fontFamily};
  border-radius: ${p => p.theme.borderRadius};
  border: 1px solid ${p => p.theme.colors.border}; 
  ${p => (p.padded && css`
    padding: 1.625rem;
    line-height: 1.85em;
    background-color: ${p.theme.colors.white};
  `)}
  ${paintColors}
  > section:first-child {
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
  }

  > section:last-child {
    border-radius: 0 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius};
  }
  ${p => (p.image && css`
    background-image: ${`url(${p.image})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: ${p.theme.borderRadius}
  `)}
`;

