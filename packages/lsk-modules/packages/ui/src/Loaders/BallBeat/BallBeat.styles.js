import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const beat = keyframes`
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export default styled('div')`
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  display: inline-block;
  animation: ${beat} 0.7s 0s infinite linear;
  &:nth-child(2n-1) {
    animation-delay: -0.35s !important;
  }
`;
