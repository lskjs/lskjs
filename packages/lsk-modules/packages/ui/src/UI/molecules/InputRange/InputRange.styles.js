import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const elInput = css`
  width: 100%;
`;

export const Block = styled('div')`
  display: flex;
  align-items: center;
`;

export const El = styled('div')`
  position: relative;
  width: 50%;
  &:not(:last-child) {
    margin-right: 4px;
  }
  &:last-child {
    margin-left: 4px;
  }
  > span > input {
    padding: 10px 12px !important;
    font-size: 11px !important;
    border-radius: 4px !important;
    min-height: 36px !important;
    &:focus {
      border-color: ${p => p.theme.colors.primary} !important;
    }
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      font-size: 11px !important;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      font-size: 11px !important;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      font-size: 11px !important;
    }
    &:-moz-placeholder { /* Firefox 18- */
      font-size: 11px !important;
    }
  }
  > span > b {
    display: none;
  }
`;

export const ElPlace = styled('div')`
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  text-align: left;
  color: #9b9b9b;
`;
