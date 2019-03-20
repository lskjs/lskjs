import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const scale = keyframes`
   0% {
    transform: scale(0.0);
  }
  100% {
    transform: scale(1.0);
    opacity: 0;
  }
`;

export const Wrapper = styled('div')`
  width: 37px;
  height: 40px;
`;

export const Ball = styled('div')`
  position: absolute;
  display: inline-block;
  background-color: ${p => p.color};
  animation-fill-mode: both;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  margin: 2px;
  animation: ${scale} 1s 0s ease-in-out infinite;
  &:nth-child(1) {
    margin-left: -7px;
    animation: ${scale} 1s 0.2s ease-in-out infinite;
  }

  &:nth-child(3) {
    margin-left: -2px;
    margin-top: 9px;
    animation: ${scale} 1s 0.5s ease-in-out infinite;
  }
`;
