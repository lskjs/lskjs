import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const riseEven = keyframes`
  0% {
    transform: scale(1.1);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: scale(0.4);
  }
  75% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
    transform: scale(1.0);
  }
`;

const riseOdd = keyframes`
  0% {
    transform: scale(0.4);
  }
  25% {
    transform: translateY(30px);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
    transform: scale(0.75);
  }
`;

export default styled('div')`
  display: inline-block;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(.15,.46,.9,.6);
  animation-iteration-count: infinite;
  animation-delay: 0;
  animation-fill-mode: both;
  &:nth-child(2n) {
    animation-name: ${riseEven};
  }

  &:nth-child(2n-1) {
    animation-name: ${riseOdd};
  }
`;
