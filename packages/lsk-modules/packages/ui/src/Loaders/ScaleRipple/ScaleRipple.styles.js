import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const ripple = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    opacity: 0.0;
  }
`;

export default styled('div')`
  animation-fill-mode: both;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid ${p => p.color};
  animation: ${ripple} 1s 0s infinite cubic-bezier(.21,.53,.56,.8);
`;
