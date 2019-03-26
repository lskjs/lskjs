import styled from '@emotion/styled';
import { css } from '@emotion/core';


export default (component = 'input') => (
  styled(component)`
    border-radius: ${p => p.theme.borderSmall};
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.44); */
    border: solid 1px #e3e3e3;
    color: #4a4a4a;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    min-height: 48px;
    padding: ${(p) => {
    if (p.iconLeft && p.iconRight) {
      return '13px 40px';
    }
    if (p.iconLeft) {
      return '13px 12px 13px 40px';
    }
    if (p.iconRight) {
      return '13px 40px 14px 12px';
    }
    return '13px 12px';
  }};
    outline: none;
    box-sizing: border-box;
    margin: 0;
    display: block;
    resize: none;

    ${p => (p.disabled && `
      background-color: rgba(155, 155, 155, 0.03) !important;
      color: rgba(74, 74, 74, 0.5) !important;
      border-color: #e3e3e3 !important;
    `)}

    &:focus,
    &:active {
      border-color: ${p => p.theme?.colors?.primary};
    }

    &::-webkit-input-placeholder {
      opacity: 0.5 !important;
      color: #9b9b9b !important;
      font-family: ${p => p.theme.fontFamily};
      font-size: 13px !important;
      line-height: 1.43 !important;
    }

    &::-moz-placeholder {
      opacity: 0.5 !important;
      color: #9b9b9b !important;
      font-family: ${p => p.theme.fontFamily};
      font-size: 13px !important;
      line-height: 1.43 !important;
    }

    &:-moz-placeholder {
      opacity: 0.5 !important;
      color: #9b9b9b !important;
      font-family: ${p => p.theme.fontFamily};
      font-size: 13px !important;
      line-height: 1.43 !important;
    }

    &:-ms-input-placeholder {
      opacity: 0.5 !important;
      color: #9b9b9b !important;
      font-family: ${p => p.theme.fontFamily};
      font-size: 13px !important;
      line-height: 1.43 !important;
    }

    ${(p) => {
    switch (p.validationState) {
      case 'error': return 'border-color: #da4c5a !important;';
      case 'success': return 'border-color: #4DB36D !important;';
      case 'warning': return 'border-color: #fbc545 !important;';
      default: return '';
    }
  }}

    ${p => (p.block && 'width: 100%;')}
  `
);

// export const InputBox = styled('div')`
//   position: relative;
//   display: flex;
//   align-items: center;
//   ${p => (p.leftIcon !== null && `
//     > input {
//       padding-left: 40px;
//     }
//     > svg {
//       position: absolute;
//       margin-left: 8px;
//       left: 0;
//     }
//   `)}
//    ${p => (p.rightIcon !== null && `
//     > input {
//       padding-right: 40px;
//     }
//     > svg {
//       position: absolute;
//       margin-right: 8px;
//       right: 0;
//     }
//   `)}
// `;

// export const Block = styled('input')`
//    ${p => p.theme.borderSmall};
//     width: 100%;
//     background-color: rgba(255, 255, 255, 0.44);
//     border: solid 1px #e3e3e3;
//     color: #4a4a4a;
//     font-family: ${p => p.theme.fontFamily};
//     font-size: 13px;
//     line-height: 1.43;
//     text-align: left;
//     min-height: 48px;
//     padding: 13px 12px;
//     outline: none;
//     box-sizing: border-box;
//     margin: 0;
//     display: block;
//     resize: none;

//     ${p => (p.disabled && `
//       background-color: rgba(155, 155, 155, 0.03) !important;
//       color: rgba(74, 74, 74, 0.5) !important;
//       border-color: #e3e3e3 !important;
//     `)}

//     &:focus,
//     &:active {
//       border-color: ${p => p.theme?.colors?.primary};
//     }

//     &::-webkit-input-placeholder {
//       opacity: 0.5 !important;
//       color: #9b9b9b !important;
//       font-family: ${p => p.theme.fontFamily};
//       font-size: 14px !important;
//       line-height: 1.43 !important;
//     }

//     &::-moz-placeholder {
//       opacity: 0.5 !important;
//       color: #9b9b9b !important;
//       font-family: ${p => p.theme.fontFamily};
//       font-size: 14px !important;
//       line-height: 1.43 !important;
//     }

//     &:-moz-placeholder {
//       opacity: 0.5 !important;
//       color: #9b9b9b !important;
//       font-family: ${p => p.theme.fontFamily};
//       font-size: 14px !important;
//       line-height: 1.43 !important;
//     }

//     &:-ms-input-placeholder {
//       opacity: 0.5 !important;
//       color: #9b9b9b !important;
//       font-family: ${p => p.theme.fontFamily};
//       font-size: 14px !important;
//       line-height: 1.43 !important;
//     }

//     ${(p) => {
//     switch (p.validationState) {
//       case 'error': return 'border-color: #da4c5a !important;';
//       case 'success': return 'border-color: #4DB36D !important;';
//       case 'warning': return 'border-color: #fbc545 !important;';
//       default: return '';
//     }
//   }}

//     ${p => (p.block && 'width: 100%;')}
//   `;
