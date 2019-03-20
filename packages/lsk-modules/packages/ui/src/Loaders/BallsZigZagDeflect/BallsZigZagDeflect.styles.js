import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const zig = keyframes`
  17% {
    transform: translate(-15px, -30px);
  }
  34% {
    transform: translate(15px, -30px);
  }
  50% {
    transform: translate(0, 0);
  }
  67% {
    transform: translate(15px, -30px);
  }
  84% {
    transform: translate(-15px, -30px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const zag = keyframes`
  17% {
    transform: translate(15px, 30px);
  }
  34% {
    transform: translate(-15px, 30px);
  }
  50% {
    transform: translate(0, 0);
  }
  67% {
    transform: translate(-15px, 30px);
  }
  84% {
    transform: translate(15px, 30px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

export const ZigZagDeflect = styled('div')`
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  position: absolute;
  margin-left: 15px;
  top: 4px;
  left: -7px;
  &:first-child {
    animation: ${zig} 1.5s 0s infinite linear;
  }

  &:last-child {
    animation: ${zag} 1.5s 0s infinite linear;
  }
`;


export const Wrapper = styled('div')`
  position: relative;
  transform: translate(-15px, -15px);
`;
