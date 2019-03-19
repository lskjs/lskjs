import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import range from 'lodash/range';

const scale = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  45% {
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    transform: scale(1);
    opacity: 1;
  }
`;

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

function count(n = 4, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation: ${scale} 0.75s ${delay(0.12, n, i)}s infinite cubic-bezier(.2,.68,.18,1.08);
      }
  `);
  return css(list.join('\n'));
}

export default styled('div')`
  ${count()};
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    background-color: ${p => p.color};
    animation-fill-mode: both;
    display: inline-block;
`;
