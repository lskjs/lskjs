import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 4, start = 2) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation-delay:${delay(0.2, n, i - 1)}s;
      }
  `);
  return css(list.join('\n'));
}

const multiScale = keyframes`
  0% {
    transform: scale(0.0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  100% {
    transform: scale(1.0);
    opacity: 0;
  }
`;

export const Wrapper = styled('div')`
  position: relative;
  transform: translateY(-30px);
`;

export const MultiBall = styled('div')`
  ${count()}
  position: absolute;
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  left: -30px;
  top: 0px;
  opacity: 0;
  margin: 0;
  width: 60px;
  height: 60px;
  animation: ${multiScale} 1s 0s linear infinite;
`;
