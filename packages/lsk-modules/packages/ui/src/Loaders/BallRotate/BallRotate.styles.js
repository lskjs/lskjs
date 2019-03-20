import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled('div')`
  position: relative;
`;

export const RotateBall = styled('div')`
  animation-fill-mode: both;
  background-color: ${p => p.color};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  animation: ${rotate} 1s 0s cubic-bezier(.7,-.13,.22,.86) infinite;
  &:before, &:after {
    background-color: ${p => p.color};
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    content: "";
    position: absolute;
    opacity: 0.8;
  }
  &:before {
    top: 0px;
    left: -28px;
  }
  &:after {
    top: 0px;
    left: 25px;
  }
`;