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

const scale = keyframes`
  30% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
`;


export const Wrapper = styled('div')`
  position: relative;
  transform: translateY(-15px);
`;

export const Ball = styled('div')`
  animation-fill-mode: both;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 100%;
  background: ${p => p.color};
  height: 16px;
  width: 16px;
  top: 7px;
  left: -7px;
  animation: ${scale} 1s 0s cubic-bezier(.09,.57,.49,.9) infinite;
`;

export const BorderRotate = styled('div')`
  animation-fill-mode: both;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 100%;
  position: absolute;
  border: 2px solid ${p => p.color};
  width: 30px;
  height: 30px;  
  left: -16px;
  top: -2px;
  background: transparent;
  border: 2px solid;
  border-color: ${p => p.color} transparent ${p => p.color} transparent;
  animation: ${rotate} 1s 0s cubic-bezier(.09,.57,.49,.9) infinite;
  animation-duration: 1s;
`;
