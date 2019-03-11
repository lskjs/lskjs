import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import range from 'lodash/range';

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

function count(n = 10, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      > div:nth-child(${i}) {
        animation-delay: ${((Math.random(100) / 100) - 0.2)}s;
        animation-duration: ${((Math.random(100) / 100) + 0.6)}s;
      }
  `);
  return css(list.join('\n'));
}


export default styled('div')`
  ${count()};
  width: 57px;
  > div {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    background-color: ${p => p.color};
    animation-fill-mode: both;
    float: left;
    animation-name: ${scale};
    display: inline-block;
    animation-iteration-count: infinite;
  }
`;
