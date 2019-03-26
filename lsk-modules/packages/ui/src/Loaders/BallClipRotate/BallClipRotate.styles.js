import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.6);
  }
  100% {
   transform: rotate(360deg) scale(1);
 }
`;

export default styled('div')`
    animation-fill-mode: both;
    background-color: ${p => p.color};
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    border: 2px solid ${p => p.color};
    border-bottom-color: transparent;
    height: 25px;
    width: 25px;
    background: transparent !important;
    display: inline-block;
    animation: ${rotate} 0.75s 0s linear infinite;
`;

