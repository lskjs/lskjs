import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const spin = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`;

export default styled('div')`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  height: ${props => (props.full ? '87vh' : 'auto')};
  
  > svg {
    animation-name: ${spin};
    animation-duration: 600ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    font-size: 1.2em;
  }
  
  > span {
    padding-left: 5px;
  }
`;
