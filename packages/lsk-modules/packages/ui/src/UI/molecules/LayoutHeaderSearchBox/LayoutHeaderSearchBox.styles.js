import styled from '@emotion/styled';
import { css } from '@emotion/core';
import removeProps from '../../../utils/removeProps';
/*

.search-box {
  max-width: 180px;
  height: $l_header_height;
  line-height: 24px;

  &.list-inline-item {
    padding: 10px 0;
  }

  // based on Bootstarp .input-group
  .search-box-inner {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    // align-items: stretch;
  }

  input {
    position: relative;
    flex: 1 1 auto;
    padding: 7px 10px 5px;
    width: 1%;
    margin-bottom: 0;
    border: none;
    background: transparent;
    &:focus {
      outline: none;
    }
  }

  .search-box-icon {
    // display: flex;
    // align-items: center;
    padding: 8px 0 4px 10px;

    .anticon {
      padding: 0;
    }
  }

  //
  .input-bar {
    position: absolute;
    display: block;
    width: 90%;
    bottom: 0;
    left: 5%;
  }
  .input-bar:before,
  .input-bar:after {
    position: absolute;
    content: '';
    height: 1px;
    width: 0;
    bottom: 1px;
    background: $body-color;
    transition: all .25s;
  }
  .input-bar:before {
    left: 50%;
  }
  .input-bar:after {
    right: 50%;
  }
  input {
    &:focus ~ .input-bar:before,
    &:focus ~ .input-bar:after {
      width: 50%;
    }
  }
}
 */
export const Inner = styled('div')`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  font-family: ${p => p.theme.fontFamily};
`;

const filteredIconWrapper = removeProps('div', ['right']);
export const IconWrapper = styled(filteredIconWrapper)`
  padding: 8px 0 4px 10px;
  
  .anticon {
    padding: 0;
  }
  
  ${p => (p.right && css`
    position: relative;
    top: 2px;
  `)}
`;

export const Bar = styled('span')`
  position: absolute;
  display: block;
  width: 90%;
  bottom: 0;
  left: 5%;
  font-family: ${p => p.theme.fontFamily};
  
  &:before,
  &:after {
    position: absolute;
    content: '';
    height: 1px;
    width: 0;
    bottom: 1px;
    background: ${p => p.theme.colors.darkGray};
    transition: all .25s;
  }
  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
`;

const filteredInput = removeProps('input', ['right']);
export const Input = styled(filteredInput)`
  position: relative;
  font-family: ${p => p.theme.fontFamily};
  flex: 1 1 auto;
  padding: ${p => (p.right ? '9px 10px 3px' : '7px 10px 5px')};
  width: 1%;
  margin-bottom: 0;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
  
  &:focus ~ ${Bar}:before,
  &:focus ~ ${Bar}:after {
    width: 50%;
  }
`;


export const searchStyle = css`
  max-width: 180px;
  height: 60px;
  line-height: 24px;
  padding: 10px 0;
  
  .anticon {
    line-height: normal !important;
  }
`;
