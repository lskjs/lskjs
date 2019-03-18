import styled from '@emotion/styled';
import { css } from 'emotion';

export const zoneStyle = css`
  width: 100%;
  height: auto;
  border: none !important;
  border-radius: 0 !important;
  @media screen and (max-width: 330px) {
    width: 100%;
  }
`;

export const Drop = styled('div')`
  width: 100%;
  height: 132px;
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 3px ${p => p.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 330px) {
    width: 100%;
  }
`;

export const DropText = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 20px;
  text-align: center;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 18px;
  width: 70%;
`;

export const DropIcon = styled('div')`
  color: ${p => p.theme.colors.primary};
  font-size: 64px;
  > svg {
    display: flex;
  }
`;

export const Overlay = styled('div')`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const RemoveButton = styled('button')`
  background: none;
  border: none;
  outline: none;
  opacity: 0.7;
  color: #ffffff;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  margin: 0;
  font-size: 50px;
  display: flex;
  z-index: 2;
`;

export const PlaceholderFooter = styled('div')`
  opacity: 0.5;
  font-family: ${p => p.theme.fontFamily};
  font-size: 11px;
  letter-spacing: -0.1px;
  text-align: center;
  color: ${p => p.theme.colors.primary};
`;

export const IconFooter = styled('div')`
  color: ${p => p.theme.colors.primary};
  opacity: 0.5;
  font-size: 64px;
  margin-bottom: 24px;
  display: flex;
  > svg {
    display: flex;
  }
`;

export const Footer = styled('div')`
  height: 200px;
  width: 100%;
  background-color: ${p => p.theme.colors.lighterPrimary};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-radius: 0 0 3px 3px;
`;

export const Button = styled('button')`
  padding: 12px 20px;
  border-radius: 3px;
  background-color: rgba(155, 155, 155, 0.12);
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1;
  text-align: center;
  color: ${p => p.theme.colors.primary};
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(155, 155, 155, 0.24);
  }
  &:active {
    background-color: rgba(155, 155, 155, 0.36);
  }
`;

export const Actions = styled('div')`
  display: flex;
  justify-content: center;
`;

export const Info = styled('div')`
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: #4a4a4a;
  font-family: ${p => p.theme.fontFamily};
  margin-bottom: 32px;
`;

export const Header = styled('div')`
padding: 12px 16px;
  background-color: #ffffff;
  flex: 1;
  border-radius: 3px 3px 0 0;
`;

export const Block = styled('div')`
  width: 100%;
  padding: 0;
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 1px #e3e3e3;
  display: flex;
  flex-direction: column;
  ${p => (p.validationState === 'error' && `
    border-color: #da4c5a;
  `)}
  ${p => (p.avatar && `
    height: 384px;
    ${Header} {
      order: 1;
    }
    ${IconFooter} {
      opacity: 1;
      margin-bottom: 16px;
    }
  `)}
  @media screen and (max-width: 330px) {
    width: 100%;
  }
`;
