import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { DebounceInput } from 'react-debounce-input';

import { createDynamicTag } from '../../../utils';

const dynamicTag = createDynamicTag(DebounceInput);

export const Block = styled('div')`
  display: flex;
  position: relative;
`;

export const Button = styled('button')`
  display: flex;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  left: ${p => p.theme.tablePadding}px;
  bottom: 0;
  margin: auto 0;
  > svg {
    display: flex;
    color: ${p => p.theme.colors.primary};
    font-size: 24px;
  }
`;

export const Count = styled('div')`
  display: flex;
  padding: 0 16px;
  margin: auto 0 auto auto;
  align-items: center;
  flex-shrink: 0;

  opacity: 0.5;
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.0;
  text-align: right;
  color: #9b9b9b;
`;

const placeholderStyle = p => css`
  font-family: ${p.theme.fontFamily};
  font-size: 13px;
  font-weight: 500;
  line-height: 56px;
  text-align: left;
  color: ${p.theme.colors.secondary};
`;

export const Input = styled(dynamicTag)`
  width: 100%;
  height: 56px;
  padding: 0 0 0 ${p => `calc(${p.theme.tablePadding || 0}px + 34px)`};
  border: none;
  outline: none;
  background: none;

  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  text-align: left;
  font-weight: 500;
  color: ${p => p.theme.colors.main};
  &::-webkit-input-placeholder {
    ${placeholderStyle}
  }
  &::-moz-placeholder {
    ${placeholderStyle}
  }
  &:-ms-input-placeholder {
    ${placeholderStyle}
  }
  &:-moz-placeholder {
    ${placeholderStyle}
  }
`;

export const Actions = styled('div')`
  margin-left: auto;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

export const Action = styled('div')`
  margin-right: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  ${p => (p.additional && css`
    padding-left: 12px;
    border-left: 1px solid ${p.theme.colors.border};
    
    > *:not(:last-child) {
      margin-right: 6px;
    }
  `)}
`;
