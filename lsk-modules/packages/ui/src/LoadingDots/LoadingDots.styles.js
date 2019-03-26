import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`;

export const Spinner = styled('div')`
  width: 60px;
  display: flex;
  justify-content: space-around;

  > div {
    width: 8px;
    height: 8px;
    background-color: ${p => p.color};

    border-radius: 100%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  }
`;

export const BounceOne = styled('div')`
  animation-delay: -0.32s !important;
`;

export const BounceTwo = styled('div')`
  animation-delay: -0.16s !important;
`;

export const BounceThree = styled('div')`
  animation-delay: 0 !important;
`;
