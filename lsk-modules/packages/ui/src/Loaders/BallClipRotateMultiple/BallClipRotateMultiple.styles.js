import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.6);
  }
  100% {
   transform: rotate(360deg) scale(1);
 }
`;

export const Wrapper = styled('div')`
  position: relative;
`;

export const External = styled('div')`
  animation-fill-mode: both;
  position: absolute;
  left: -20px;
  top: -20px;
  border: 2px solid ${p => p.color};
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  animation: ${rotate} 1s 0s ease-in-out infinite;
`;

export const Internal = styled('div')`
  display: inline-block;
  animation-fill-mode: both;
  position: absolute;
  border-radius: 100%;
  top: -10px;
  left: -10px;
  width: 15px;
  height: 15px;
  animation: ${rotate} 0.5s 0s ease-in-out infinite reverse;
  border: 2px solid;
  border-color: ${p => p.color} transparent ${p => p.color} transparent;
`;
