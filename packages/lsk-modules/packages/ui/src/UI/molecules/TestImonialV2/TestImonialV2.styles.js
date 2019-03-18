import styled from '@emotion/styled';
import { css } from 'emotion';
import Avatar from '../../../Avatar';

export const Wrapper = styled('div')`
  position: relative;
  font-family: ${p => p.theme.fontFamily};
  padding: 48px 16px 54px;
  text-align: center;
  border-radius: ${p => p.theme.borderRadius};
  margin-bottom: 34px;
  ${(p) => {
    switch (p.paint) {
      case 'light':
        return css`
          background-color: ${p.theme.colors.secondary};
          color: ${p.theme.colors.main};`;
      case 'dark':
        return css`
          background-color: ${p.theme.colors.black};
          color: ${p.theme.colors.white};`;
      case 'primary':
        return css`
          background-color: ${p.theme.colors.primary};
          color: ${p.theme.colors.white};`;
      case 'info':
        return css`
          background-color: ${p.theme.colors.info};
          color: ${p.theme.colors.white};`;
      case 'success':
        return css`
          background-color: ${p.theme.colors.success};
          color: ${p.theme.colors.white};`;
      case 'warning':
        return css`
          background-color: ${p.theme.colors.warning};
          color: ${p.theme.colors.main};`;
      case 'danger':
        return css`
          background-color: ${p.theme.colors.danger};
          color: ${p.theme.colors.white};`;
      default:
        return css`
          background-color: ${p.theme.colors.white};
          color: ${p.theme.colors.main}; `;
    }
  }}
`;

export const Content = styled('div')`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 12px;
  &:before {
    content: '';
    display: block;
    font-size: 54px;
    line-height: .2;
  }
  font-family: ${p => p.theme.fontFamily};
`;

export const Citate = styled('cite')`
  opacity: .7;
  font-family: ${p => p.theme.fontFamily};
`;

export const AuthorImg = styled('div')`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 68px;
  height: 68px;
  margin-bottom: -34px;
  padding: 4px;
  background-color: #f5f5f5;
  border-radius: ${p => p.theme.borderCircle};
  font-family: ${p => p.theme.fontFamily};
`;

export const AvatarItem = styled(Avatar)`
  max-width: 100%;
  border-radius: ${p => p.theme.borderCircle};
  width: 30px;
  font-family: ${p => p.theme.fontFamily};
  height: auto;
`;
