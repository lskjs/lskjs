import styled from '@emotion/styled';

export const Additional = styled('div')`
  background-color: ${p => p.theme.colors.mainBackground};
  border: solid 1px #e3e3e3;
  border-top: none;
  border-radius: 0 0 3px 3px;
  position: relative;
  
  transform: translate3d(0, -100%, 0);
  padding: 0 44px;
  opacity: 0;
  height: 0;

  transition: transform .2s ease, padding .2s ease, opacity .2s ease, height .2s ease;
  will-change: transform, padding, opacity, height;
  
  overflow: hidden;
  z-index: 1;
`;

export const General = styled('div')`
  z-index: 2;
  position: relative;
  > * {
    transition: border-radius .2s ease;
    will-change: border-radius;
  }
`;

export const Block = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  ${p => ((p.checked && p.hasChildren) && `
    ${General} {
      > * {
        margin-bottom: 0 !important;
        border-radius: 3px 3px 0 0;
      }
    }
    ${Additional} {
      transform: translate3d(0, 0, 0);
      padding: 16px 44px;
      opacity: 1;
      height: auto;
    }
  `)}
  ${p => (p.disabled && `
    ${Additional} {
      transform: translate3d(0, -100%, 0);
      padding: 0 44px;
      opacity: 0;
      height: 0;
    }
  `)}
`;

export const Icon = styled('div')`
  font-size: 24px;
  display: flex;
  flex-shrink: 0;
  color: ${p => p.theme.colors.primary};
  margin-right: 12px;
  > svg {
    display: flex;
  }
`;

export const Item = styled('button')`
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 1px #e3e3e3;
  padding: 10px 8px 12px;
  outline: none;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 8px;
  &:hover {
    background-color: #eff4fa;
  }
  ${p => (p.disabled && `
    cursor: not-allowed;
    & * {
      color: #e3e3e3;
    }
    &:hover {
      background-color: #ffffff;
      border: solid 1px #e3e3e3;
    }
  `)}
  ${p => (p.block && `
    display: block;
    width: 100%;
    &:not(:last-child) {
      margin-right: 0;
    }
  `)}
  ${p => (!p.block && `
    &:not(:last-child) {
      margin-right: 8px;
    }
  `)}
  ${p => (p.error && `
    border-color: #da4c5a;
    ${Icon} {
      color: #da4c5a;
    }
  `)}
`;

export const Header = styled('div')`
  display: flex;
  align-items: center;
`;

export const Label = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: #4a4a4a;
`;

export const Footer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 4px 0 0 36px;
`;

export const Info = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: #9b9b9b;
  white-space: pre-line;
  min-height: 40px;
`;

