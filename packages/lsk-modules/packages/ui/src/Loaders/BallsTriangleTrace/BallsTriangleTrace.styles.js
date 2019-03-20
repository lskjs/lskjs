import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const pathOne = keyframes`
  33% {
    transform: translate(25px, -50px);
  }
  66% {
    transform: translate(50px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;

const pathTwo = keyframes`
  33% {
    transform: translate(25px, 50px);
  }
  66% {
    transform: translate(-25px, 50px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;

const pathThree = keyframes`
  33% {
    transform: translate(-50px, 0px);
  }
  66% {
    transform: translate(-25px, -50px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;

export const Wrapper = styled('div')`
  position: relative;
  transform: translate(-30px, -37px);
`;

export const TriangleTrace = styled('div')`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 1px solid ${p => p.color};

  &:nth-of-type(1) {
    top: 50px;
    animation-name: ${pathOne};
  }

  &:nth-of-type(2) {
    left: 25px;
    animation-name: ${pathTwo};
  }

  &:nth-of-type(3) {
    top: 50px;
    left: 50px;
    animation-name: ${pathThree};
  }
  &:nth-of-type(1),:nth-of-type(2),:nth-of-type(3){
    animation-delay: 0;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
`;
