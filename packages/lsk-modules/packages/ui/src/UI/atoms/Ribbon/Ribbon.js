import styled from '@emotion/styled';
import { css } from '@emotion/core';

const topLeft = css`
  top: 25px;
  left: -50px;
  transform: rotate(-45deg);
`;

const topRight = css`
  top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
`;

const bottomLeft = css`
  top: auto;
  bottom: 25px;
  left: -50px;
  transform: rotate(45deg);
`;

const bottomRight = css`
  top: auto;
  right: -50px;
  bottom: 25px;
  left: auto;
  transform: rotate(-45deg);
`;

export default styled('div')`
  width: 200px;
  position: ${p => (p.sticky ? 'fixed' : 'absolute')};
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: ${p => p.theme.colors.white};
  background-color: ${p => (p.color || p.theme.colors.darkGray)};
  
  ${(p) => {
    switch (p.position) {
      case 'top-right': return topRight;
      case 'bottom-left': return bottomLeft;
      case 'bottom-right': return bottomRight;
      default: return topLeft;
    }
  }}
`;
