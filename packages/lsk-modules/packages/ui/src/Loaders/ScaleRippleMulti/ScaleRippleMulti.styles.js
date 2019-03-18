import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

const rippleMulti = keyframes`
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

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 4, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation-delay: ${delay(0.2, n, i - 1)}s;
      }
  `);
  return css(list.join('\n'));
}

export const RippleScale = styled('div')`
  ${count()}
  position: absolute;
  top: -2px;
  left: -26px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid ${p => p.color};
  animation: ${rippleMulti} 1.25s 0s infinite cubic-bezier(.21,.53,.56,.8);
`;

export const Wrapper = styled('div')`
  position: relative;
  transform: translateY(-25px);
`;
