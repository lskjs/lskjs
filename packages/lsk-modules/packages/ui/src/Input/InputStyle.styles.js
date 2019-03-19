import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const LeftWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const RightWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const InputBox = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  ${p => (p.leftIcon !== null && `
    > ${LeftWrapper} {
      position: absolute;
      margin-left: 8px;
      left: 0;
    }
  `)}
   ${p => (p.rightIcon !== null && `
    > ${RightWrapper} {
      position: absolute;
      margin-right: 8px !important;
      right: 0 !important;
    }
  `)}
`;

export const currencyInput = css`
  border-radius: 3px;
    width: 100%;
    border: solid 1px #e3e3e3;
    color: #4a4a4a;
    font-family: 'Chinese Quote',-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    min-height: 48px;
    padding: 13px 12px;
    outline: none;
    box-sizing: border-box;
    margin: 0;
    display: block;
    resize: none;
`;
