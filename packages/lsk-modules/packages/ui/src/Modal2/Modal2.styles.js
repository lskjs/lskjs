import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const overlayStyle = css`
  /* background-color: rgba(0,0,0,.3);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 18px 12px; */

  /* &:before {
    content: '';
    flex: 1;
  }
  &:after {
    content: '';
    flex: 3;
  } */
`;

export const modalStyle = css`
  margin: auto;
  margin-top: 100px;
  margin-bottom: 200px;
  /* временно попробуем */
  outline: none;
  position: relative;
  width: 100%;
  
`;

export const modalSmall = css`
  @media screen and (min-width: 768px) {
    width: 428px;
  }
`;

export const modalNormal = css`
  @media screen and (min-width: 768px) {
    width: 576px;
  }
`;

export const modalLarge = css`
  @media screen and (min-width: 768px) {
    width: 872px;
  }
`;

export const InnerWrapper = styled('div')`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 18px rgba(0,0,0,.2);
  overflow: hidden;
`;

export const bodyModalStyle = css`
  overflow: hidden;
`;

export const closeButtonStyle = css`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px;
  z-index: 1;
`;
