import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { removeProps } from '../../../utils';

export const Wrapper = styled('div')`
  padding: 12px;
`;

export const Values = styled('div')`
  margin: 12px -13px;
`;

export const ValueItem = styled(removeProps('button', ['align']))`
  border: none;
  outline: none;
  padding: 0 12px;
  color: ${p => (p.disabled ? p.theme.colors.secondary : p.theme.colors.main)};
  background-color: ${p => p.theme.colors.white};
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${p => p.align};
  text-align: left;
  font-family: ${p => p.theme.fontFamily};
  height: 48px;
  
  font-size: 13px;
  letter-spacing: -0.1px;
  
  ${p => (!p.disabled && css`
    transition: color .2s ease, background-color .2s ease;
    will-change: color, background-color;
    &:hover {
      color: ${p.theme.colors.primary};
      background-color: ${p.theme.colors.lighterPrimary};
    }
  `)}
`;
