import { css } from 'emotion'
import { Row } from '../../../Grid';

export const containerStyle = css`
  padding: 12px;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  display: block;
  transition: background-color .2s ease-out;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }

  ${Row} {
    align-items: center;
  }
`;

export const typeStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const urlStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
