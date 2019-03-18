import styled from '@emotion/styled';

import { FormGroup } from 'react-bootstrap';

export const InlineGroup = styled(FormGroup)`
  flex: 1;
  margin-bottom: 24px;
  /* &:first-child {
    margin-right: 12px;
  }
  &:last-child {
    margin-left: 12px;
  } */
  @media screen and (max-width: 470px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;

export const InlineBlock = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const InputsBlock = styled('div')`
  display: flex;
  width: 100%;
  @media screen and (max-width: 470px) {
    flex-direction: column;
  }
`;

export const ComissionBlock = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${p => (p.small && `
    font-size: 11px;
    letter-spacing: -0.1px;
    text-align: left;
    color: #9b9b9b;
    margin-top: 8px;
  `)}
`;
