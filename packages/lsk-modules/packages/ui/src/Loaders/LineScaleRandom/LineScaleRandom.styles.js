import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import range from 'lodash/range';

const scaleRandom = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

function count(n = 5, start = 1) { // eslint-disable-line consistent-return
  const list = range(start, n).map(i => `
      &:nth-child(${i}) {
        animation-delay: ${((Math.random(100) / 100) - 0.2)}s;
        animation-duration: ${((Math.random(100) / 100) + 0.3)}s;
      }
  `);
  return css(list.join('\n'));
}

export default styled('div')`
  ${count()};
  display: inline-block;
  animation-name: ${scaleRandom};
  animation-iteration-count: infinite;
  animation-delay: 0;
  background-color: ${p => p.color};
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  animation-fill-mode: both;
`;
