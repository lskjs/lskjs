import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

const pulseSync = keyframes`
  33% {
    transform: translateY(10px);
  }
  66% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;


function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 4, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation: ${pulseSync} 0.6s ${delay(0.07, n, i)}s infinite ease-in-out;
      }
  `);
  return css(list.join('\n'));
}

export default styled('div')`
  ${count()}
  display: inline-block;
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
`;
