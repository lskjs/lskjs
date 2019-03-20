import styled from '@emotion/styled';
import { css } from '@emotion/core';
import createDynamicTag from '../../../utils/createDynamicTag';
import removeProps from '../../../utils/removeProps';

const dynamicTag = createDynamicTag('button');
const filteredTag = removeProps(dynamicTag, [
  'small',
  'transparent',
  'child',
  'inverse',
]);

export default styled(filteredTag)`
  width: ${p => (p.small ? 22 : 24)}px;
  height: ${p => (p.small ? 22 : 24)}px;
  border-radius: 100px;
  background-color: ${p => p.theme.colors.lighterPrimary};
  color: ${p => p.theme.colors.primary};
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, box-shadow .2s ease;
  will-change: background-color, color, box-shadow;

  margin: ${p => (p.small ? 0 : 8)}px;
  box-shadow: 0 0 0 8px transparent;

  &:hover {
    ${p => (!p.small && css`
      box-shadow: 0 0 0 8px ${p.theme.colors.lightPrimary};
    `)}
  }

  ${p => (p.active && css`
    background-color: ${p.theme.colors.primary};
    color: white;
  `)}

  &:hover {
    background-color: ${p => p.theme.colors.primary};
    color: white;
  }

  > svg {
    display: flex;
  }

  ${p => (p.inverse && css`
    background-color: ${p.theme.colors.primary};
    color: white;

    ${p.active && css`
      background-color: ${p.theme.colors.primary};
      color: white;
    `}

    &:hover {
      background-color: ${p.theme.colors.primary};
      color: white;
    }

    ${p.disabled && css`
      background-color: #e3e3e3;
      cursor: not-allowed;
      color: #fff;

      &:hover {
        background-color: #e3e3e3;
        color: #fff;
      }
    `}
  `)}

  ${p => (p.transparent && css`
    background-color: transparent;
    color: rgba(74, 74, 74, 0.28);
    font-size: 15px;

    ${p.active && css`
      background-color: transparent;
      color: rgba(74, 74, 74, 0.6);
    `}

    &:hover {
      background-color: transparent;
      color: rgba(74, 74, 74, 0.6);
    }
  `)}

  ${p => (p.disabled && css`
    background-color: #f9f9f9;
    cursor: not-allowed;
    color: #3e3e3e;

    &:hover {
      background-color: #f9f9f9;
      color: #3e3e3e;
    }
  `)}
`;
