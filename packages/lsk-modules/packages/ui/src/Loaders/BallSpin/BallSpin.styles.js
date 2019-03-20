import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import range from 'lodash/range';

const spin = keyframes`
  50% {
    opacity: 0.3;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 9, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation: ${spin} 1s ${delay(0.12, n, i - 1)}s infinite linear;
      }
  `);
  return css(list.join('\n'));
}


export const Wrapper = styled('div')`
  position: relative;
  top: -10px;
  left: -10px;
`;

export const SpinBall = styled('div')`
  ${count()}
  animation-fill-mode: both;
  position: absolute;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  &:nth-child(1) {
    top: 25px;
    left: 0;
  }
  &:nth-child(2) {
    top: 17px;
    left: 17px;
  }
  &:nth-child(3) {
    top: 0;
    left: 25px;
  }
  &:nth-child(4) {
    top: -17px;
    left: 17px;
  }
  &:nth-child(5) {
    top: -25px;
    left: 0;
  }
  &:nth-child(6) {
    top: -17px;
    left: -17px;
  }
  &:nth-child(7) {
    top: 0;
    left: -25px;
  }
  &:nth-child(8) {
    top: 17px;
    left: -17px;
  }
`;