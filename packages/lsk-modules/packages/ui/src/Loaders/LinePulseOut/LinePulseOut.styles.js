import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

const pulseOut = keyframes`
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

const pulseOutRapid = keyframes`
  0% {
    transform: scaley(1.0);
  }
  80% {
    transform: scaley(0.3);
  }
  90% {
    transform: scaley(1.0);
  }
`;

function delay(interval, c, index) {
  return ((index * interval) - (interval * c));
}

export default styled('div')`
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  display: inline-block;
  ${(p) => {
    switch (p.type) {
      case 'rapid':
        return css`
          vertical-align: middle;
          animation: ${pulseOutRapid} 0.9s -0.5s infinite cubic-bezier(.11,.49,.38,.78);
          &:nth-child(2), &:nth-child(4) {
            animation-delay: -0.25s !important;
          }
          &:nth-child(1), &:nth-child(5) {
              animation-delay: 0s !important;
          }`;
      default:
        return css`
          animation: ${pulseOut} 0.9s ${delay(0.2, 3, 0)}s infinite cubic-bezier(.85,.25,.37,.85);
          &:nth-child(2), &:nth-child(4) {
            animation-delay: ${delay(0.2, 3, 1)}s !important;
          }
          &:nth-child(1), &:nth-child(5) {
            animation-delay: ${delay(0.2, 3, 2)}s !important;
          }`;
    }
  }}
`;
