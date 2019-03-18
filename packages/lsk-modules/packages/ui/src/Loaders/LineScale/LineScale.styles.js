import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

const lineScale = keyframes`
  0% {
    transform: scaley(1.0);
  }
  50% {
    transform: scaley(0.4);
  }
  100% {
    transform: scaley(1.0);
  }
`;

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 6, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation: ${lineScale} 1s ${delay(0.1, n, i)}s infinite cubic-bezier(.2,.68,.18,1.08);
      }
  `);
  return css(list.join('\n'));
}

export default styled('div')`
  ${count()}
  display: inline-block;
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
`;
