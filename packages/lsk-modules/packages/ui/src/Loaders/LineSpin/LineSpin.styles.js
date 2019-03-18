import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

const spin = keyframes`
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 9, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation: ${spin} 1.2s ${delay(0.12, n, i)}s infinite ease-in-out;
      }
  `);
  return css(list.join('\n'));
}

export const SpinLine = styled('div')`
  ${count()}
  animation-fill-mode: both;
  position: absolute;
  background-color: ${p => p.color};
  position: absolute;
  width: 5px;
  height: 15px;
  border-radius: 2px;
  margin: 2px;
  &:nth-child(1) {
    top: 20px;
    left: 0;
  }
  &:nth-child(2) {
    top: 13.6px;
    left: 13.6px;
    transform: rotate(-45deg);
  }
  &:nth-child(3) {
    top: 0;
    left: 20px;
    transform: rotate(90deg);
  }
  &:nth-child(4) {
    top: -13.6px;
    left: 13.6px;
    transform: rotate(45deg);
  }
  &:nth-child(5) {
    top: -20px;
    left: 0;
  }
  &:nth-child(6) {
    top: -13.6px;
    left: -13.6px;
    transform: rotate(-45deg);
  }
  &:nth-child(7) {
    top: 0;
    left: -20px;
    transform: rotate(90deg);
  }
  &:nth-child(8) {
    top: 13.6px;
    left: -13.6px;
    transform: rotate(45deg);
  }
`;


export const Wrapper = styled('div')`
  position: relative;
  top: -10px;
  left: -4px;
`;
