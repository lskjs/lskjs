import styled from '@emotion/styled';
import { css } from 'emotion';
import { removeProps } from '../../../../utils';

export const OptionItem = styled('button')`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  border: none;
  height: 48px;
  padding-left: 8px;
  z-index: 111111;

  font-family: ${p => p.theme.fontFamily};
  background-color: ${p => (p.focused ? '#F0F0FF' : p.theme.colors.white)};
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 3.6;
  letter-spacing: -0.1px;
  color: ${p => p.theme.colors.main};
  &:focus{
    background-color: #ffffff !important;
    color: ${p => p.theme.colors.main} !important;
  }
  &:hover {
    background-color: #F0F0FF !important;
    color: ${p => p.theme.colors.main} !important;
  }
  ${p => (p.selected && css`
    background-color: #ffffff !important;
    color: #7070FF !important;
  `)}
`;

export const Image = styled('img')`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  flex-shrink: 0;
`;


export const Title = styled('div')`
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const filteredTag = removeProps('div', ['color']);
export const IconWrapper = styled(filteredTag)`
  font-size: 24px;
  color: ${p => p.color};
  display: inline-flex;
  margin-left: 8px;
`;
