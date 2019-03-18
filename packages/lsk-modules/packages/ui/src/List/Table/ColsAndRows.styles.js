import styled from '@emotion/styled';
import { css } from 'emotion';
import createDynamicTag from '../../utils/createDynamicTag';
import removeProps from '../../utils/removeProps';

// const tag = removeProps(createDynamicTag('div'), []);
const tag = 'div';

export const cursorPointer = css`
  cursor: pointer;
`;

export const fullStyle = css`
  height: 100%;
  align-items: center;
`;


export const clickableStyle = p => css`
  ${cursorPointer}
  &:hover {
    background-color: ${p.theme.colors.lighterPrimary};
  }
`;
export const HeaderRowWrapper = styled(tag)`
  font-family: ${p => p.theme.fontFamily};
  font-size: 12px;
  height: 48px;
  ${p => (p.clickable && clickableStyle)}
`;

export const HeaderColWrapper = styled(tag)`
  ${p => (p.clickable && cursorPointer)}
  ${p => (p.full && fullStyle)}
`;

export const ItemRowWrapper = styled(tag)`
  padding: 0 12px;
  height: 56px;
  align-items: center;
  font-family: ${p => p.theme.fontFamily};
  background-color: ${p => p.theme.colors.white};
  transition: background-color .2s ease-out;
  will-change: background-color;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${p => (p.clickable && clickableStyle)}
`;

export const ItemColWrapper = styled(tag)`
  ${p => (p.clickable && cursorPointer)}
  ${p => (p.full && fullStyle)}
`;

