import styled from '@emotion/styled';
import { css } from 'emotion';

export const modalStyle = css`
  margin: 60px auto;
  @media screen and (max-width: 576px){
    margin-top: 0;
  }
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

export const hocFooter = css`
  .ant-form-item {
    width: auto !important;
    margin-bottom: 0 !important;
  }
`;
