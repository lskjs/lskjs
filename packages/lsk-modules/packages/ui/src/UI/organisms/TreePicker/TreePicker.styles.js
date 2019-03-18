import styled from '@emotion/styled';
import { css } from 'emotion';

import { DebounceInput } from 'react-debounce-input';

import { Scrollbars } from 'react-custom-scrollbars';

export const Header = styled('div')`
  background-color: ${p => p.theme.colors.lighterPrimary};
  padding: 16px 16px 12px;
  border-radius: 3px 3px 0 0;
  position: relative;
`;

export const CloseButton = styled('button')`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  opacity: .5;
  color: #9b9b9b;
  padding: 5px;
  display: flex;
  background: transparent;
  border: none;
  outline: none;
  transition: opacity .2s ease-out;
  will-change: opacity;
  &:hover {
    opacity: 1;
  }
  > svg {
    display: flex;
  }
`;

export const Title = styled('h3')`
  font-family: ${p => p.theme.fontFamily};
  margin: 0 0 16px;
  font-size: 20px;
  line-height: 1.2;
  font-weight: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: #4a4a4a;
`;

export const Search = styled('div')`
  display: flex;
  border-radius: 3px;
  border: solid 1px ${p => p.theme.colors.primary};
  background-color: #fff;
  position: relative;
  height: 48px;
  overflow: hidden;
`;

export const SearchIcon = styled('div')`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 40px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${p => p.theme.colors.primary};
`;

export const SearchInput = styled(DebounceInput)`
  width: 100%;
  padding: 0 45px;
  border: none;
  outline: none;
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  text-align: left;
  color: #4a4a4a;
  &::-webkit-input-placeholder {
    opacity: 0.5;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    color: #9b9b9b;
  }
  &::-moz-placeholder {
    opacity: 0.5;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    color: #9b9b9b;
  }
  &:-ms-input-placeholder {
    opacity: 0.5;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    color: #9b9b9b;
  }
  &:-moz-placeholder {
    opacity: 0.5;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    color: #9b9b9b;
  }
`;

export const SearchClear = styled('button')`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 45px;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.primary};
`;

export const Meta = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 2px;
  > button {
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.8;
    letter-spacing: -0.1px;
    cursor: pointer;
    color: ${p => p.theme.colors.primary} !important;
  }
`;

export const Selected = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  opacity: 0.5;
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => p.theme.colors.primary};
  height: 32px;
  display: flex;
  align-items: center;
`;

export const clearBtnStyles = css`
  margin-left: auto;
  height: 32px;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ScrollContent = styled(Scrollbars)`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const ContentInner = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Footer = styled('div')`
  margin-top: auto;
  display: flex;
  border-radius: 0 0 3px 3px;
  overflow: hidden;
`;

export const Block = styled('div')`
  padding: 16px !important;
  position: relative;
  > svg {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 24px;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: ${p => p.theme.colors.primary};
    margin-left: 24px;
    z-index: 1;
  }
  input {
    width: 100%;
    padding: 0 40px;
    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;
    line-height: 1.43;
    text-align: left;
    color: #4a4a4a;
  }
`;

export const InnerBlock = styled('div')`
  display: flex;
  min-height: 37px;

`;
