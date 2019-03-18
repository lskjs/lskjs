import styled from '@emotion/styled';
import { css } from 'emotion';

export const popperDisabledStyle = css`
  pointer-events: none;
`;

export const contentStyle = css`
  overflow: hidden;
`;

export const Content = styled('div')`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
  background-color: ${p => p.theme.colors.white};
  z-index: 1;
  height: ${p => p.height}px;
`;

export const Icon = styled('div')`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 13px;
  font-size: 24px;
  line-height: 43px;
  color: hsl(0,0%,80%);
  transition: color .1s ease-out;
  
  &:hover {
    color: hsl(0,0%,60%);
  }
`;


export const Trigger = styled('button')`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-size: 13px;
  text-align: left;
  letter-spacing: -0.1px;
  font-family: ${p => p.theme.fontFamily};
  background-color: ${p => p.theme.colors.white};
  border: 1px solid ${p => (p.open ? `${p.theme.colors.primary} !important` : p.theme.colors.border)};
  padding: 0;
  outline: none;
  position: relative;
  transition: border-color .1s ease-out;
  
  > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      &:not(:last-child) {
        line-height: 46px;
      }
      &:last-child {
        top: -2px;
      }
  }
  
  ${p => (p.disabled && css`
    opacity: .5;
    pointer-events: none;
    cursor: not-allowed;
  `)}
  
  ${p => (p.open && css`
    ${Icon} {
      color: hsl(0,0%,40%);
    }
  `)}
  
  &:hover {
    border-color: hsl(0,0%,70%);
  }
`;
